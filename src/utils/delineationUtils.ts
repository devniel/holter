import { HeartRate, QRSRecord, RRInterval } from '@/types';

/**
 * Return the RR-intervals of a given QRS records, a RR-interval is the time
 * elapsed between two successive R-waves of the QRS signal of the ECG.
 * @param records
 * @returns
 */
export const getRRIntervals = (records: QRSRecord[]): RRInterval[] => {
  if (records.length <= 1) throw new Error('Invalid QRS records');
  let rrIntervalsInMs: RRInterval[] = [];
  for (let i = 1; i < records.length; i++) {
    let interval = records[i].onset - records[i - 1].onset;
    rrIntervalsInMs.push({
      value: interval,
      from: records[i - 1],
      to: records[i],
    });
  }
  return rrIntervalsInMs;
};

/**
 * Calculates the minimum heart rate using RR-intervals,
 * the minimum heart rate corresponds to the longest time
 * between heartbeats (max interval).
 */
export const getMinHeartRate = (intervals: RRInterval[]): HeartRate => {
  if (intervals.length == 0) throw new Error('Invalid RR-intervals');
  let maxIntervalValue = Number.MIN_VALUE;
  let maxInterval = null;
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i].value >= maxIntervalValue) {
      maxIntervalValue = intervals[i].value;
      maxInterval = intervals[i];
    }
  }
  const TOTAL_MS_IN_1MIN = 60000;
  const minHeartRateInMinutes = TOTAL_MS_IN_1MIN / maxIntervalValue;
  return {
    value: minHeartRateInMinutes,
    interval: maxInterval!,
  };
};

/**
 * Calculates the maximum heart rate using RR-intervals,
 * the maximum heart rate corresponds to the shortest time
 * between heartbeats (min interval).
 */
export const getMaxHeartRate = (intervals: RRInterval[]): HeartRate => {
  if (intervals.length == 0) throw new Error('Invalid RR-intervals');
  let minIntervalValue = Number.MAX_VALUE;
  let minInterval = null;
  for (let i = 0; i < intervals.length; i++) {
    if (intervals[i].value <= minIntervalValue) {
      minIntervalValue = intervals[i].value;
      minInterval = intervals[i];
    }
  }
  const TOTAL_MS_IN_1MIN = 60000;
  const minHeartRateInMinutes = TOTAL_MS_IN_1MIN / minIntervalValue;
  return {
    value: minHeartRateInMinutes,
    interval: minInterval!,
  };
};

/**
 * Calculates the mean heart rate (frequency at which QRS complexes appear)
 * using the mean interval value
 */
export const getMeanHeartRate = (intervals: RRInterval[]): HeartRate => {
  if (intervals.length == 0) throw new Error('Invalid RR-intervals');
  const sumIntervalValues = intervals.reduce(
    (sum, interval) => sum + interval.value,
    0
  );
  const meanIntervalValues = sumIntervalValues / intervals.length;
  const TOTAL_MS_IN_1MIN = 60000;
  const meanHeartRateInMinutes = TOTAL_MS_IN_1MIN / meanIntervalValues;
  return {
    value: meanHeartRateInMinutes,
  };
};
