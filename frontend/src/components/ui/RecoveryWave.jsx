// The clinic's signature visual: a single line that dips low (injury), then
// climbs in a controlled, rhythmic recovery curve — used as the logo mark,
// a section divider, and the hero's animated centerpiece.
export default function RecoveryWave({ className = '', animated = true, strokeWidth = 3 }) {
  return (
    <svg
      viewBox="0 0 400 60"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 40 C 40 40, 55 55, 90 50 C 130 44, 140 10, 180 10 C 220 10, 230 34, 270 30 C 310 26, 320 16, 400 18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={animated ? '8 6' : undefined}
        className={animated ? 'animate-wave' : ''}
      />
    </svg>
  );
}
