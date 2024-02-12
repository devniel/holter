import React from 'react';
import { HeartRateInfo } from './HeartRateInfo';
import { HeartRate } from '@/types';

export const HeartRateStatistics = ({
  minHeartRate,
  maxHeartRate,
  recordDateTime,
}: {
  minHeartRate: HeartRate;
  maxHeartRate: HeartRate;
  recordDateTime?: Date | null;
}) => {
  return (
    <div className="flex gap-5">
      <HeartRateInfo
        label="MINIMUM HEART RATE"
        value={minHeartRate.value}
        onset={
          recordDateTime
            ? new Date(
                recordDateTime.getTime() + minHeartRate.interval!.from.onset
              ).toLocaleString()
            : `${minHeartRate.interval!.from.onset}ms`
        }
      />
      <HeartRateInfo
        label="MAXIMUM HEART RATE"
        value={maxHeartRate.value}
        onset={
          recordDateTime
            ? new Date(
                recordDateTime.getTime() + maxHeartRate.interval!.from.onset
              ).toLocaleString()
            : `${maxHeartRate.interval?.from.onset}ms`
        }
      />
    </div>
  );
};
