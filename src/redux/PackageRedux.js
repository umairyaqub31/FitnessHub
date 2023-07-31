import {FitnessHub} from '@config';

const types = {
  DELETE_SUCCESS: 'DELETE_SUCCESS',

  FETCH_PACKAGE_PENDING: 'FETCH_PACKAGE_PENDING',
  FETCH_PACKAGE_FAILURE: 'FETCH_PACKAGE_FAILURE',
  FETCH_PACKAGE_SUCCESS: 'FETCH_PACKAGE_SUCCESS',

  SUBMIT_PACKAGE_PENDING: 'SUBMIT_PACKAGE_PENDING',
  SUBMIT_PACKAGE_SUCCESS: 'SUBMIT_PACKAGE_SUCCESS',
  SUBMIT_PACKAGE_FAILURE: 'SUBMIT_PACKAGE_FAILURE',
};
export const actions = {
  getPackages: async (dispatch, data) => {
    dispatch({type: types.FETCH_PACKAGE_PENDING});

    const json = await FitnessHub.getPackages(data);
    if (json.status === 200) {
      dispatch({type: types.FETCH_PACKAGE_SUCCESS, data: json.data});
    } else {
      //   dispatch({type: types.LOGIN_FAIL, data: json.data});
    }
  },

  addPackage: async (dispatch, data) => {
    if (data.packageId && data.packageId !== null) {
      dispatch({type: types.SUBMIT_PACKAGE_PENDING});

      const json = await FitnessHub.updatePackage(data);
      if (json.status === 200) {
        dispatch({
          type: types.SUBMIT_PACKAGE_SUCCESS,
          data: data,
          event: 'update',
        });
        return true;
      } else {
        // dispatch({type: types.LOGIN_FAIL, data: json.data});
      }
    } else {
      dispatch({type: types.SUBMIT_PACKAGE_PENDING});

      const json = await FitnessHub.addPackage(data);
      if (json.status === 201) {
        dispatch({
          type: types.SUBMIT_PACKAGE_SUCCESS,
          data: json.data,
          event: 'create',
        });
        return true;
      } else {
        // dispatch({type: types.LOGIN_FAIL, data: json.data});
      }
    }
  },

  deletePackage: async (dispatch, data) => {
    console.log('action.....', data);
    const json = await FitnessHub.deletePackage(data);
    console.log('delRes....', json);
    if (json.status === 200) {
      dispatch({type: types.DELETE_SUCCESS, data: data});
      return true;
    } else {
      // dispatch({type: types.LOGIN_FAIL, data: json.data});
    }
  },
};

const initialState = {
  isFetching: false,
  isProcessing: false,
  packages: [],
};

export const reducer = (state = initialState, action) => {
  const {type, data, event} = action;

  switch (type) {
    case types.FETCH_PACKAGE_PENDING: {
      return {...state, isFetching: true};
    }
    case types.FETCH_PACKAGE_SUCCESS: {
      return {...state, packages: data, isFetching: false};
    }

    case types.SUBMIT_PACKAGE_PENDING: {
      return {...state, isProcessing: true};
    }
    case types.SUBMIT_PACKAGE_SUCCESS: {
      if (event === 'create') {
        return {
          ...state,
          packages: state.packages.concat(data),
          isProcessing: false,
        };
      } else {
        let index = state.packages.findIndex(p => p._id === data.packageId);

        let newDataArray = [...state.packages];

        if (index > -1) {
          newDataArray[index].multiplier = data.multiplier;
          newDataArray[index].timeMatter = data.timeMatter;
          newDataArray[index].price = data.price;
        }

        return Object.assign({}, state, {
          packages: newDataArray,
          isProcessing: false,
        });
      }
    }
    case types.DELETE_SUCCESS: {
      let index = state.packages.findIndex(p => p._id === data.packageId);

      let newDataArray = [...state.packages];

      if (index > -1) {
        newDataArray.splice(index, 1);
      }

      return Object.assign({}, state, {
        packages: newDataArray,
      });
    }

    default:
      return state;
  }
};
