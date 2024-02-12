/**
 * A normal heartbeat produces three entities on the ECG — a P wave, a QRS complex, and a T wave.
 */
export type WaveRecord = {
  // Wave type: P, QRS, T, or INV (invalid)
  type: 'P' | 'QRS' | 'T' | 'INV';
  // Wave onset: Start of the wave in ms
  onset: number;
  // Wave offset: End of the wave in ms
  offset: number;
  // Optionally, a list of wave tags
  tags?: string[];
  // Row number in the CSV file
  id: string;
};

export type QRSRecord = WaveRecord & {
  type: 'QRS';
};

/**
 * A heart rate measurement with precision should be
 * based on RR-intervals
 */
export type HeartRate = {
  value: number;
  interval?: {
    from: QRSRecord;
    to: QRSRecord;
  };
};

/**
 * A RR-interval is the time elapsed between two successive
 * R-waves of the QRS signal of the ECG.
 */
export type RRInterval = {
  value: number;
  from: QRSRecord;
  to: QRSRecord;
};

/**
 * Result returned by /api/delineation
 */
export type DelineationResult = {
  data: {
    records: WaveRecord[];
    meanHeartRate: HeartRate;
    minHeartRate: HeartRate;
    maxHeartRate: HeartRate;
  };
};
