import { ClockIcon } from '@heroicons/react/24/outline';

export const HeartRateInfo = ({
  label,
  value,
  onset,
}: {
  label: string;
  value: number;
  onset: string;
}) => {
  return (
    <div className="flex flex-col text-start mb-5">
      <span className="text-sm font-light text-slate-500">{label}</span>
      <div className="-ml-2">
        <span className="text-6xl">{Math.floor(value)}</span>
        <span>bpm</span>
      </div>
      {onset && (
        <div className="flex gap-1">
          <ClockIcon width={16} />
          <span>{onset}</span>
        </div>
      )}
    </div>
  );
};
