import test, { expect } from '@playwright/test';
import { readFileSync } from 'fs';
import path from 'path';
import { delineation } from 'tests/fixtures/delineation';

test('should fail and return message if invalid payload is provided', async ({
  request,
}) => {
  const delineation = await request.post(`/api/delineation`, {
    data: {
      test: 'test',
    },
  });
  const response = await delineation.json();
  expect(delineation.status()).toBe(400);
  expect(response).toMatchObject({
    error: {
      message: 'Unexpected error',
    },
  });
});

test('should parse csv file and return data', async ({ request }) => {
  const fileData = readFileSync(path.resolve('./tests/fixtures/record.min.csv'));
  const response = await request.post(`/api/delineation`, {
    multipart: {
      records: {
        name: 'records',
        mimeType: 'text/csv',
        buffer: fileData,
      },
    },
  });
  const result = await response.json();
  expect(response.status()).toBe(200);
  expect(result).toEqual(delineation);
});
