import { Check } from 'lucide-react';

const STEPS = ['Service', 'Date & Time', 'Your Details', 'Confirmation'];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="mx-auto mb-10 flex max-w-2xl items-center justify-between">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                  isDone
                    ? 'border-clinic-teal bg-clinic-teal text-white'
                    : isActive
                    ? 'border-clinic-teal text-clinic-teal'
                    : 'border-clinic-border text-clinic-ink/40'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : stepNum}
              </div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isActive || isDone ? 'text-clinic-navy' : 'text-clinic-ink/40'
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum !== STEPS.length && (
              <div className={`mx-2 h-0.5 flex-1 ${isDone ? 'bg-clinic-teal' : 'bg-clinic-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
