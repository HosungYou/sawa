"use client";
import { useEffect, useState } from "react";

type Facet = "claim" | "evidence" | "reasoning" | "backing" | "qualifier" | "rebuttal";

const FACET_LABELS: Record<Facet, string> = {
  claim: "Claim",
  evidence: "Evidence",
  reasoning: "Reasoning",
  backing: "Backing",
  qualifier: "Qualifier",
  rebuttal: "Rebuttal"
};

const FACET_ORDER: Facet[] = ["claim", "evidence", "reasoning", "backing", "qualifier", "rebuttal"];

export default function CoachPage() {
  const [sessionId, setSessionId] = useState<string>("");
  const [facet, setFacet] = useState<Facet>("claim");
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [nudges, setNudges] = useState<string[]>([]);
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [exported, setExported] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [completedFacets, setCompletedFacets] = useState<Set<Facet>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/session/init", { method: "POST" });
      const data = await res.json();
      setSessionId(data.id);
      setFacet(data.next.facet);
      setQuestion(data.next.question);
      setDone(data.next.done);
      setCurrentIndex(FACET_ORDER.indexOf(data.next.facet));
      setIsInitialized(true);
    })();
  }, []);

  async function submit() {
    console.log('Submit clicked:', { sessionId, facet, answer: answer?.length });
    if (!sessionId || isSubmitting || !facet || !answer.trim()) {
      console.log('Submit blocked:', { sessionId: !!sessionId, isSubmitting, facet, hasAnswer: !!answer.trim() });
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Making API call...');
      const res = await fetch("/api/session/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sessionId, facet, answer })
      });
      console.log('API response status:', res.status);
      const data = await res.json();
      console.log('API response data:', data);
      if (data.evaluation) {
        setLevel(data.evaluation.level);
        if (!data.evaluation.passed) {
          setNudges(data.evaluation.nudges || []);
        } else {
          setNudges([]);
          setCompletedFacets(prev => new Set([...prev, facet]));
        }
      }
      setFacet(data.next.facet);
      setQuestion(data.next.question);
      setDone(data.next.done);
      setCurrentIndex(FACET_ORDER.indexOf(data.next.facet));
      if (data.evaluation?.passed) {
        setAnswer("");
        setLevel(null);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('오류가 발생했습니다: ' + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function exportPrep() {
    if (!sessionId) return;
    const res = await fetch("/api/session/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: sessionId }) });
    const data = await res.json();
    setExported(data.markdown || "");
  }

  const progressPercentage = ((currentIndex + (completedFacets.has(facet) ? 1 : 0)) / FACET_ORDER.length) * 100;

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing SAWA Coach...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">SAWA – Socratic Coach</h1>
          <p className="text-sm text-gray-600 mt-1">Socratic Writing Coach for Argument Structure Development</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
              <h2 className="font-semibold text-gray-900 mb-4">Progress</h2>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{width: `${progressPercentage}%`}}
                  />
                </div>
              </div>

              {/* Step List */}
              <div className="space-y-2">
                {FACET_ORDER.map((f, index) => {
                  const isCurrent = f === facet;
                  const isCompleted = completedFacets.has(f);
                  const isPast = index < currentIndex;

                  return (
                    <div
                      key={f}
                      className={`flex items-center p-2 rounded text-sm ${
                        isCurrent
                          ? 'bg-blue-50 border border-blue-200 text-blue-800'
                          : isCompleted || isPast
                          ? 'bg-green-50 text-green-800'
                          : 'bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mr-3 ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isCompleted || isPast
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {isCompleted || isPast ? '✓' : index + 1}
                      </div>
                      <span className="font-medium">{FACET_LABELS[f]}</span>
                      {isCurrent && <span className="ml-auto text-xs">Current</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {question && (
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {FACET_LABELS[facet]} Step
                    </h2>
                    <span className="text-sm text-gray-500">
                      {currentIndex + 1} / {FACET_ORDER.length}
                    </span>
                  </div>
                  <div className="text-gray-700 leading-relaxed">{question}</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Please provide your response
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-3 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                      value={answer}
                      onChange={e=>setAnswer(e.target.value)}
                      placeholder="Enter your response here..."
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Character count: {answer.length}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className={`px-6 py-2 rounded-md font-medium transition-colors ${
                        !answer.trim() || isSubmitting || !facet
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Button clicked - before submit call');
                        submit();
                      }}
                      disabled={!answer.trim() || isSubmitting || !facet}
                      type="button"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>

                    <button
                      className={`px-6 py-2 border rounded-md font-medium transition-colors ${
                        !done
                          ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                          : 'border-green-600 text-green-600 hover:bg-green-50'
                      }`}
                      onClick={exportPrep}
                      disabled={!done}
                    >
                      Export Prep Sheet
                    </button>
                  </div>
                </div>

                {level && (
                  <div className={`rounded-lg p-4 ${
                    level === 4 ? 'bg-green-50 border border-green-200' :
                    level === 3 ? 'bg-blue-50 border border-blue-200' :
                    level === 2 ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3 ${
                        level === 4 ? 'bg-green-600' :
                        level === 3 ? 'bg-blue-600' :
                        level === 2 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {level}
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${
                          level === 4 ? 'text-green-800' :
                          level === 3 ? 'text-blue-800' :
                          level === 2 ? 'text-yellow-800' :
                          'text-red-800'
                        }`}>
                          {level === 4 ? 'Advanced' : level === 3 ? 'Proficient' : level === 2 ? 'Developing' : 'Weak'}
                        </h3>
                        <p className={`text-xs ${
                          level === 4 ? 'text-green-700' :
                          level === 3 ? 'text-blue-700' :
                          level === 2 ? 'text-yellow-700' :
                          'text-red-700'
                        }`}>
                          {level === 4 ? 'Sophisticated, nuanced, and precisely targeted' :
                           level === 3 ? 'Clear, well-structured, and appropriately scoped' :
                           level === 2 ? 'Shows some understanding but needs development' :
                           'Needs significant improvement'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!!nudges.length && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-amber-800 mb-2">Feedback for Improvement</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {nudges.map((n, i) => (
                            <li key={i} className="text-sm text-amber-700">{n}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {done && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800 font-medium">
                    Congratulations! All steps completed. You can now export your prep sheet.
                  </span>
                </div>
              </div>
            )}

            {exported && (
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Prep Sheet</h3>
                  <p className="text-sm text-gray-600 mt-1">Copy the content below for your use</p>
                </div>
                <div className="bg-gray-50 rounded border p-4 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">{exported}</pre>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    onClick={() => navigator.clipboard.writeText(exported)}
                  >
                    Copy to Clipboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
