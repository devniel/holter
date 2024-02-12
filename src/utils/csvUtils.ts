import { WaveRecord } from '@/types';
import { parse } from 'csv-parse/sync';

export const parseCSV = (content: string): WaveRecord[] => {
  let idx = 1;
  const records: WaveRecord[] = parse(content, {
    columns: ['type', 'onset', 'offset', 'tags', 'id'],
    cast: (value, context) => {
      if (context.index >= 1 && context.index <= 2) {
        return parseInt(value);
      } else {
        return value;
      }
    },
    onRecord: (record, context) => {
      if (!record.tags) {
        record.tags = [];
      }
      record.id = idx++;
      return record;
    },
    skip_empty_lines: true,
    relax_column_count: true,
  });
  return records;
};
