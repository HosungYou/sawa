import { getItem, getSequence } from "./playbook";
import { Facet, FacetEvaluation, FacetState, SessionState } from "./types";
import { evaluateFacetAnswer } from "./rubric";

export async function initializeSession(id: string): Promise<SessionState> {
  const sequence = await getSequence();
  const now = new Date().toISOString();
  const facets: Record<Facet, FacetState> = {
    claim: { facet: "claim", questionIndex: 0, passed: false, level: 1, nudges: [] },
    evidence: { facet: "evidence", questionIndex: 0, passed: false, level: 1, nudges: [] },
    reasoning: { facet: "reasoning", questionIndex: 0, passed: false, level: 1, nudges: [] },
    backing: { facet: "backing", questionIndex: 0, passed: false, level: 1, nudges: [] },
    qualifier: { facet: "qualifier", questionIndex: 0, passed: false, level: 1, nudges: [] },
    rebuttal: { facet: "rebuttal", questionIndex: 0, passed: false, level: 1, nudges: [] }
  };
  return {
    id,
    createdAt: now,
    updatedAt: now,
    currentIndex: 0,
    sequence,
    facets,
    history: []
  };
}

export async function getCurrentFacet(state: SessionState): Promise<Facet> {
  return state.sequence[state.currentIndex];
}

export async function answerFacet(state: SessionState, facet: Facet, answer: string): Promise<{ state: SessionState; evaluation: FacetEvaluation; question: string; }> {
  const item = await getItem(facet);
  const evalResult = evaluateFacetAnswer(item, answer);

  const facetState = state.facets[facet];
  facetState.answer = answer;
  facetState.level = evalResult.level;
  facetState.passed = evalResult.passed;
  facetState.nudges = evalResult.nudges;

  const qIdx = facetState.questionIndex;
  const question = item.questions[Math.min(qIdx, item.questions.length - 1)] || "";

  state.history.push({
    facet,
    question,
    answer,
    passed: evalResult.passed,
    level: evalResult.level,
    nudges: evalResult.nudges,
    timestamp: new Date().toISOString()
  });

  if (evalResult.passed) {
    // advance to next facet
    state.currentIndex = Math.min(state.currentIndex + 1, state.sequence.length - 1);
  } else {
    // stay on facet, increment question index if more questions exist
    facetState.questionIndex = Math.min(facetState.questionIndex + 1, (item.questions.length - 1));
  }

  state.updatedAt = new Date().toISOString();
  return { state, evaluation: evalResult, question };
}

export async function getNextQuestion(state: SessionState): Promise<{ facet: Facet; question: string; done: boolean; }>{
  const facet = await getCurrentFacet(state);
  const item = await getItem(facet);
  const qIdx = state.facets[facet].questionIndex;
  const question = item.questions[Math.min(qIdx, item.questions.length - 1)] || "";
  const done = state.sequence.every(f => state.facets[f].passed);
  return { facet, question, done };
}

export function buildPrepSheet(state: SessionState): string {
  const lines: string[] = [];
  lines.push(`# SAWA Prep Sheet`);
  for (const facet of state.sequence) {
    const fs = state.facets[facet];
    const title = facet.charAt(0).toUpperCase() + facet.slice(1);
    lines.push(`\n## ${title}`);
    lines.push(fs.answer ? fs.answer : "(미작성)");
  }
  return lines.join("\n");
}
