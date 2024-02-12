export const delineation = {
  data: {
    records: [
      {
        type: 'QRS',
        onset: 0,
        offset: 100,
        tags: [],
        id: 1,
      },
      {
        type: 'QRS',
        onset: 30000,
        offset: 30100,
        tags: [],
        id: 2,
      },
      {
        type: 'QRS',
        onset: 150000,
        offset: 150100,
        tags: [],
        id: 3,
      },
      {
        type: 'QRS',
        onset: 210000,
        offset: 210100,
        tags: [],
        id: 4,
      },
    ],
    meanHeartRate: {
      value: 0.8571428571428571,
    },
    minHeartRate: {
      value: 0.5,
      interval: {
        value: 120000,
        from: {
          type: 'QRS',
          onset: 30000,
          offset: 30100,
          tags: [],
          id: 2,
        },
        to: {
          type: 'QRS',
          onset: 150000,
          offset: 150100,
          tags: [],
          id: 3,
        },
      },
    },
    maxHeartRate: {
      value: 2,
      interval: {
        value: 30000,
        from: {
          type: 'QRS',
          onset: 0,
          offset: 100,
          tags: [],
          id: 1,
        },
        to: {
          type: 'QRS',
          onset: 30000,
          offset: 30100,
          tags: [],
          id: 2,
        },
      },
    },
  },
};
