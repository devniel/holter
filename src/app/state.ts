import { Dispatch } from 'react';
import { ThunkDispatch } from 'react-hook-thunk-reducer';
import { DelineationResult } from '@/types';

export type StateModel = {
  status: string;
  results?: DelineationResult | null;
  recordDateTime?: Date | null;
};

export const initialState = {
  status: 'idle',
  results: null,
  recordDateTime: null,
};

export const reducer = (
  state: StateModel,
  action: { type: string; payload?: any }
) => {
  const { type, payload } = action;
  const updatedState = structuredClone(state);
  switch (type) {
    case 'set_status':
      return {
        status: payload,
      };
    case 'set_results':
      return {
        status: 'results',
        results: payload,
      };
    case 'restart':
      return {
        status: 'idle',
        results: null,
      };
    case 'set_record_datetime':{
        updatedState.recordDateTime = new Date(payload);
        return updatedState;
    };
    default:
      return updatedState;
  }
};

/**
 * Creates a FormData an interacts with `/api/delineation` endpoint
 */
export const sendDelineation = (file: File): ThunkDispatch<any, any> => {
  return async (dispatch: Dispatch<any>) => {
    dispatch({ type: 'set_status', payload: 'loading' });
    const formData = new FormData();
    formData.append('records', file);
    const response = await fetch('/api/delineation', {
      method: 'POST',
      body: formData,
    });
    const results: DelineationResult = await response.json();
    dispatch({ type: 'set_results', payload: results });
  };
};

