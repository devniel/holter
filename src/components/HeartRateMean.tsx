import { HeartRate } from '@/types';

export const HeartRateMean = ({
  meanHeartRate,
}: {
  meanHeartRate: HeartRate;
}) => {
  return (
    <div className="flex flex-col text-center mb-5">
      <span className="text-sm font-light text-slate-500">
        MEAN HEART RATE
      </span>
      <div className="-ml-2 flex flex-col">
        <span className="text-8xl">{Math.floor(meanHeartRate.value)}</span>
        <span className="-mt-3">bpm</span>
      </div>
    </div>
  );
};
