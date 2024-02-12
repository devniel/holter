import { NextRequest } from 'next/server';
import { QRSRecord } from '@/types';
import { parseCSV } from '@/utils/csvUtils';
import {
  getMaxHeartRate,
  getMeanHeartRate,
  getMinHeartRate,
  getRRIntervals,
} from '@/utils/delineationUtils';
import { handleError, handleJson } from '@/utils/responseUtils';

export const dynamic = 'force-dynamic'; // defaults to force-static

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData?.get('records') as File;
    if (!file) return handleError('Invalid records file', 400);
    const content = await file.text();
    const records = parseCSV(content);
    const qrsRecords = records.filter(
      (record): record is QRSRecord => record.type === 'QRS'
    );
    if (qrsRecords.length == 0) return handleError('No valid records', 400);
    const rrIntervals = getRRIntervals(qrsRecords);
    const meanHeartRate = getMeanHeartRate(rrIntervals);
    const minHeartRate = getMinHeartRate(rrIntervals);
    const maxHeartRate = getMaxHeartRate(rrIntervals);
    return handleJson({
      data: {
        records,
        meanHeartRate,
        minHeartRate,
        maxHeartRate,
      },
    });
  } catch (error) {
    return handleError('Unexpected error', 400);
  }
}
