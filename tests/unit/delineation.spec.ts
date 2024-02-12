import { QRSRecord } from "@/types";
import { getMaxHeartRate, getMeanHeartRate, getMinHeartRate, getRRIntervals } from "@/utils/delineationUtils";

describe('Heart Rate Utils', () => {
  const records: QRSRecord[] = [
    { onset: 100, offset: 200, type: 'QRS', tags: [], id: "1" },
    { onset: 200, offset: 400, type: 'QRS', tags: [], id: "2" },
    { onset: 400, offset: 700, type: 'QRS', tags: [], id: "3" },
    { onset: 700, offset: 1100, type: 'QRS', tags: [], id: "4" },
    { onset: 1100, offset: 1600, type: 'QRS', tags: [], id: "5" },
  ];

  const rrIntervals = [
    { value: 100, from: records[0], to: records[1] },
    { value: 200, from: records[1], to: records[2] },
    { value: 300, from: records[2], to: records[3] },
    { value: 400, from: records[3], to: records[4] },
  ];

  it('should calculate RR intervals correctly', () => {
    expect(getRRIntervals(records)).toEqual(rrIntervals);
  });

  it('should calculate the minimum heart rate correctly', () => {
    const minHeartRate = getMinHeartRate(rrIntervals);
    expect(minHeartRate.value).toBe(60000/400);
    expect(minHeartRate.interval).toEqual(rrIntervals[3]);
  });

  it('should calculate the maximum heart rate correctly', () => {
    const maxHeartRate = getMaxHeartRate(rrIntervals);
    expect(maxHeartRate.value).toBe(60000/100);
    expect(maxHeartRate.interval).toEqual(rrIntervals[0]);
  });

  it('should calculate the mean heart rate correctly', () => {
    const meanHeartRate = getMeanHeartRate(rrIntervals);
    expect(meanHeartRate.value).toBe(60000/(1000/4));
  });
});