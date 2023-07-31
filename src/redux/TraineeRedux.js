import {FitnessHub} from '@config';

const types = {
  ADD_FINDTRAINER_DATA: 'ADD_FINDTRAINER_DATA',
  ADD_PROGRESS: 'ADD_PROGRESS',

  FETCH_TRAINER_PENDING: 'FETCH_TRAINER_PENDING',
  FETCH_TRAINER_FAILURE: 'FETCH_TRAINER_FAILURE',
  FETCH_TRAINER_SUCCESS: 'FETCH_TRAINER_SUCCESS',

  FETCH_LOCATION_TRAINER_PENDING: 'FETCH_LOCATION_TRAINER_PENDING',
  FETCH_LOCATION_TRAINER_FAILURE: 'FETCH_LOCATION_TRAINER_FAILURE',
  FETCH_LOCATION_TRAINER_SUCCESS: 'FETCH_LOCATION_TRAINER_SUCCESS',

  SUBMIT_REPORT_PENDING: 'SUBMIT_REPORT_PENDING',
  SUBMIT_REPORT_FAILURE: 'SUBMIT_REPORT_FAILURE',
  SUBMIT_REPORT_SUCCESS: 'SUBMIT_REPORT_SUCCESS',

  SUBMIT_BOOKMARK_PENDING: 'SUBMIT_BOOKMARK_PENDING',
  SUBMIT_BOOKMARK_FAILURE: 'SUBMIT_BOOKMARK_FAILURE',
  SUBMIT_BOOKMARK_SUCCESS: 'SUBMIT_BOOKMARK_SUCCESS',

  SUBMIT_REVIEW_PENDING: 'SUBMIT_REVIEW_PENDING',
  SUBMIT_REVIEW_FAILURE: 'SUBMIT_REVIEW_FAILURE',
  SUBMIT_REVIEW_SUCCESS: 'SUBMIT_REVIEW_SUCCESS',

  FETCH_BOOKMARK_PENDING: 'FETCH_BOOKMARK_PENDING',
  FETCH_BOOKMARK_FAILURE: 'FETCH_BOOKMARK_FAILURE',
  FETCH_BOOKMARK_SUCCESS: 'FETCH_BOOKMARK_SUCCESS',

  FIND_TRAINER_PENDING: 'FIND_TRAINER_PENDING',
  FIND_TRAINER_FAILURE: 'FIND_TRAINER_FAILURE',
  FIND_TRAINER_SUCCESS: 'FIND_TRAINER_SUCCESS',

  CLEAR_MESSAGE: 'CLEAR_MESSAGE',
};
export const actions = {
  getTrainers: async (dispatch, data) => {
    dispatch({type: types.FETCH_TRAINER_PENDING});

    const json = await FitnessHub.getTrainers(data);
    if (json.status === 200) {
      dispatch({type: types.FETCH_TRAINER_SUCCESS, data: json.data});
    } else {
      //   dispatch({type: types.LOGIN_FAIL, data: json.data});
    }
  },

  getTrainerByLocation: async (dispatch, data) => {
    console.log('location', data);

    // dispatch({type: types.FETCH_LOCATION_TRAINER_PENDING});
    const json = await FitnessHub.getTrainersByLocation(data);
    console.log('location trainer', json.data);
  },

  getBookmarks: async (dispatch, data) => {
    dispatch({type: types.FETCH_BOOKMARK_PENDING});

    const json = await FitnessHub.getBookmarks(data);
    // console.log('fetch...', json.data);
    if (json.status === 201) {
      dispatch({type: types.FETCH_BOOKMARK_SUCCESS, data: json.data.data});
    } else {
      //   dispatch({type: types.FETCH_BOOKMARK_FAILURE, data: json.data});
    }
  },

  submitReport: async (dispatch, data) => {
    dispatch({type: types.SUBMIT_REPORT_PENDING});

    const json = await FitnessHub.submitReport(data);
    console.log(json);
    if (json.status === 201) {
      console.log('submitted', json.data);

      dispatch({type: types.SUBMIT_REPORT_SUCCESS, data: json.data});
      return true;
    } else {
      return false;
      // dispatch({type: types.SUBMIT_REPORT_FAILURE, data: json.data});
    }
  },

  submitBookmark: async (dispatch, data) => {
    console.log('ddd.....', data);
    dispatch({type: types.SUBMIT_BOOKMARK_PENDING});
    const json = await FitnessHub.submitBookmark(data);
    dispatch({type: types.SUBMIT_BOOKMARK_SUCCESS, data: data});
  },

  submitReview: async (dispatch, data) => {
    console.log('review submitted', data);
    dispatch({type: types.SUBMIT_REVIEW_PENDING});
    const json = await FitnessHub.submitReview(data);

    if (json.status === 201) {
      dispatch({type: types.SUBMIT_REVIEW_SUCCESS, data: json.data});
      return true;
    } else {
      return false;
      // dispatch({type: types.SUBMIT_REPORT_FAILURE, data: json.data});
    }
  },

  addFindTrainerData: data => ({
    type: types.ADD_FINDTRAINER_DATA,
    data,
  }),
  findTrainer: async (dispatch, data) => {
    console.log('submitted', data);
    dispatch({type: types.FIND_TRAINER_PENDING});
    const json = await FitnessHub.searchTrainer(data);
    console.log('trainers...', json.data);
    if (json.status === 201) {
      dispatch({type: types.FIND_TRAINER_SUCCESS, data: json.data.data});
      return true;
    } else {
      // dispatch({type: types.SUBMIT_REPORT_FAILURE, data: json.data});
      return false;
    }
  },
  addProgress: data => ({
    type: types.ADD_PROGRESS,
    data,
  }),
  clearMessage: dispatch => {
    dispatch({type: types.CLEAR_MESSAGE});
  },
};

const initialState = {
  isFetching: false,
  isProcessing: false,
  trainers: [],
  trainersOnNeed: [],
  findTrainerData: {},
  bookmarks: [],
  progress: {
    goal: 'Weight Loss',
    targetArea: 'Back',
    exercise: 'Deadlift (Barbell)',
  },
  message: '',
  status: null,
};

export const reducer = (state = initialState, action) => {
  const {type, data} = action;

  switch (type) {
    case types.FETCH_TRAINER_PENDING: {
      return {...state, isFetching: true};
    }
    case types.FETCH_TRAINER_SUCCESS: {
      return {...state, trainers: data, isFetching: false};
    }

    case types.SUBMIT_BOOKMARK_SUCCESS: {
      const index = state.bookmarks.findIndex(
        t => t.trainerId === data.trainerId,
      );

      var arr1 = [...state.bookmarks];

      let tprofile = [];

      tprofile.push(data.trainer);

      if (index > -1) {
        arr1.splice(index, 1);
        return {
          ...state,
          bookmarks: arr1,
        };
      } else {
        var obj = {
          trainerId: data.trainerId,
          trainerProfile: tprofile,
          userId: data.user._id,
        };
        var newData = [...arr1, obj]; // [1,2,3,4]
        return {
          ...state,
          bookmarks: newData,
        };
      }
    }
    case types.FETCH_BOOKMARK_SUCCESS: {
      return {...state, bookmarks: data, isFetching: false};
    }

    case types.FETCH_BOOKMARK_PENDING: {
      return {...state, isFetching: true};
    }
    case types.FETCH_BOOKMARK_SUCCESS: {
      return {...state, bookmarks: data, isFetching: false};
    }
    case types.ADD_FINDTRAINER_DATA: {
      return {...state, findTrainerData: data};
    }
    case types.ADD_PROGRESS: {
      return {...state, progress: data};
    }
    case types.SUBMIT_REPORT_PENDING: {
      return {...state, isProcessing: true};
    }
    case types.SUBMIT_REPORT_SUCCESS: {
      return {
        ...state,
        message: data.message,
        status: data.Status,
        isProcessing: false,
      };
    }

    case types.SUBMIT_REVIEW_PENDING: {
      return {...state, isProcessing: true};
    }
    case types.SUBMIT_REVIEW_SUCCESS: {
      return {
        ...state,
        message: data.message,
        status: data.Status,
        isProcessing: false,
      };
    }

    case types.FIND_TRAINER_PENDING: {
      return {...state, isProcessing: true};
    }
    case types.FIND_TRAINER_SUCCESS: {
      return {...state, trainersOnNeed: data, isProcessing: false};
    }

    case types.CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        status: null,
      };

    default:
      return state;
  }
};
