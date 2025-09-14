type Facet = "claim" | "evidence" | "reasoning" | "backing" | "qualifier" | "rebuttal";

interface StepIndicatorProps {
  steps: Facet[];
  currentStep: Facet;
  completedSteps: Set<Facet>;
  labels: Record<Facet, string>;
}

export default function StepIndicator({ steps, currentStep, completedSteps, labels }: StepIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const isCurrent = step === currentStep;
        const isCompleted = completedSteps.has(step);
        const isPast = index < currentIndex;

        return (
          <div
            key={step}
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
            <span className="font-medium">{labels[step]}</span>
            {isCurrent && <span className="ml-auto text-xs">Current</span>}
          </div>
        );
      })}
    </div>
  );
}