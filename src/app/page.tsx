'use client';

import useThunkReducer from 'react-hook-thunk-reducer';
import { HeartRateStatistics } from '@/components/HeartRateStatistics';
import { InputFile } from '@/components/inputs/InputFile';
import { HeartRateMean } from '@/components/HeartRateMean';
import { HeartIcon } from '@heroicons/react/24/outline';
import { StateModel, initialState, reducer, sendDelineation } from './state';

export default function Home() {
  const [state, dispatch] = useThunkReducer<StateModel, any>(
    reducer,
    initialState
  );

  const handleFile = (file: File): void => {
    dispatch(sendDelineation(file));
  };

  const handleTimeChange = (e: any): void => {
    const value = e.target.value;
    dispatch({
      type: 'set_record_datetime',
      payload: value,
    });
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="overflow-hidden rounded-lg bg-white shadow text-black">
        <div className="px-4 py-5 sm:p-6">
          {state.status == 'loading' && (<div><HeartIcon/><span>Analysing record ...</span></div>)}
          {state.status == 'idle' && <InputFile onChange={handleFile} />}
          {state.status == 'results' && state.results && (
            <div>
              <HeartRateMean meanHeartRate={state.results.data.meanHeartRate} />
              <HeartRateStatistics
                maxHeartRate={state.results.data.maxHeartRate}
                minHeartRate={state.results.data.minHeartRate}
                recordDateTime={state.recordDateTime}
              />
              {/* SET TIME FORM */}
              <div className="flex flex-col mt-10">
                <span className="text-sm font-light text-slate-500">
                  SET TIME
                </span>
                <label
                  htmlFor="meeting-time"
                  className="text-sm text-slate-500"
                >
                  Setup the date and time of the recording
                </label>
                <input
                  type="datetime-local"
                  id="meeting-time"
                  name="meeting-time"
                  onChange={handleTimeChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
