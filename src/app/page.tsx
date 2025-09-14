import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">SAWA – Socratic Coach</h1>
          <p className="text-sm text-gray-600 mt-1">Socratic Writing Coach for Argument Structure Development</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to SAWA
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            A Socratic methodology-based pre-writing coach that guides you through
            structured argument development without co-writing or generating content for you.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-3">6-Stage Process</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Claim Development</li>
                <li>• Evidence Planning</li>
                <li>• Reasoning Structure</li>
                <li>• Theoretical Backing</li>
                <li>• Qualifier Assessment</li>
                <li>• Rebuttal Strategy</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-3">Enhanced Features</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• 4-Level Assessment System</li>
                <li>• Real-time Feedback</li>
                <li>• Comprehensive Examples</li>
                <li>• Structured Prep Sheets</li>
              </ul>
            </div>
          </div>

          <Link
            href="/coach"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Start Writing Coach
          </Link>

          <div className="mt-8 pt-6 border-t text-xs text-gray-500">
            <p>SAWA v1.3.0 - Enhanced Evaluation Engine</p>
          </div>
        </div>
      </div>
    </div>
  );
}
