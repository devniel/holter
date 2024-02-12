'use client';

import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';
import ECGIcon from '../icons/ECGIcon';
import { ChangeEvent } from 'react';

export const InputFile = ({ onChange }: { onChange : (file: File) => void }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file)
    }
  };
  return (
    <div className="text-center">
      <ECGIcon />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">ECG Delineation</h3>
      <p className="mt-1 text-sm text-gray-500">Please upload a record file.</p>
      <div className="mt-6">
        <label
          htmlFor="philips--input-file"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArrowUpTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /><span>Upload CSV record</span>
          <input id="philips--input-file" className="hidden" type="file" accept=".csv" onChange={handleOnChange}/>
        </label>
      </div>
    </div>
  );
}
