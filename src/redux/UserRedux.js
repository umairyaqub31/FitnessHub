import {FitnessHub} from '@config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const types = {
  LOGOUT: 'LOGOUT',
  LOGOUT_RESETSTATE: 'LOGOUT_RESETSTATE',
  LOGIN_LOADING: 'LOGIN_LOADING',
  LOGIN: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  UPDATE_USER_DATA: 'UPDATE_USER_DATA',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  UPDATE_PASSWORD_FAIL: 'UPDATE_PASSWORD_FAIL',
  ADD_USER_FORM: 'ADD_USER_FORM',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  ADD_ROLE: 'ADD_ROLE',
};
export const actions = {
  login: async (dispatch, data) => {
    dispatch({type: types.LOGIN_LOADING});

    if (data.type && data.type === 'trainee') {
      const json = await FitnessHub.login(data);
      if (json.status === 200) {
        dispatch({type: types.LOGIN, user: json.data});
        // await AsyncStorage.setItem('usertoken', json.data.token);
      } else {
        dispatch({type: types.LOGIN_FAIL, data: json.data});
      }
    } else if (data.type && data.type === 'trainer') {
      const json = await FitnessHub.trainerLogin(data);
      if (json.status === 200) {
        dispatch({type: types.LOGIN, user: json.data});
        // await AsyncStorage.setItem('usertoken', json.data.token);
      } else {
        dispatch({type: types.LOGIN_FAIL, data: json.data});
      }
    }
  },

  register: async (dispatch, data, type) => {
    console.log("\n\n ==> action Data", data)
    dispatch({type: types.LOGIN_LOADING});

    if (type === 'trainee') {
      console.log("==>trainee")
      const json = await FitnessHub.register(data);
      console.log('res....', json);

      if (json.status === 201) {
        dispatch({type: types.LOGIN, user: json.data});
        return true;
      } else {
        dispatch({type: types.LOGIN_FAIL, data: json.data});
        return false;
      }
    } else if (type === 'trainer') {
      console.log("==>trainer")
      const json = await FitnessHub.trainerRegister(data);
      console.log('res....', json);

      if (json.status === 201) {
        dispatch({type: types.LOGIN, user: json.data});
        return true;
      } else {
        dispatch({type: types.LOGIN_FAIL, data: json.data});
        return false;
      }
    }
  },

  socialLogin: async (dispatch, data) => {
    console.log('called......', data);

    if (data.type === 'trainee') {
      const json = await FitnessHub.socialLogin(data);
      console.log('res....', json);

      if (json.status === 201) {
        dispatch({type: types.LOGIN, user: json.data});
        return true;
      } else {
        dispatch({type: types.LOGIN_FAIL, data: json.data});
        return false;
      }
    } else if (data.type === 'trainer') {
      console.log('trainer social login....');
      const json = await FitnessHub.trainerSocialLogin(data);
      console.log('res....', json);

      if (json.status === 201) {
        dispatch({type: types.LOGIN, user: json.data});
        return true;
      } else {
        dispatch({type: types.LOGIN_FAIL, data: json.data});
        return false;
      }
    }
  },

  resetPassword: async (dispatch, data) => {
    dispatch({type: types.LOGIN_LOADING});
    if (data.type === 'trainee') {
      const json = await FitnessHub.resetPassword(data);

      if (json.status === 201) {
        dispatch({type: types.UPDATE_PASSWORD, data: json.data});
        return true;
      } else {
        dispatch({type: types.UPDATE_PASSWORD_FAIL, data: json.data});
        return false;
      }
    } else if (data.type === 'trainer') {
      const json = await FitnessHub.trainerResetPassword(data);
      console.log('api res', json);

      if (json.status === 201) {
        dispatch({type: types.UPDATE_PASSWORD, data: json.data});
        return true;
      } else {
        dispatch({type: types.UPDATE_PASSWORD_FAIL, data: json.data});
        return false;
      }
    }
  },

  addUserForm: data => ({
    type: types.ADD_USER_FORM,
    data,
  }),
  addRole: data => ({
    type: types.ADD_ROLE,
    data,
  }),

  clearErrors: dispatch => {
    dispatch({type: types.CLEAR_ERRORS});
  },
  logout() {
    return {type: types.LOGOUT};
  },
};

const initialState = {
  isLoading: false,
  role: '',
  user: null,
  phoneValidateUser: null,
  token: null,
  form: {
    specialization:'Martial Art'
  },
  message: '',
  status: null,
  acknowledge: false,
};

export const reducer = (state = initialState, action) => {
  const {type, user, phoneValidateUser, token, data} = action;

  switch (type) {
    case types.ADD_USER_FORM: {
      return {...state, form: data};
    }
    case types.ADD_ROLE: {
      return {...state, role: data};
    }
    case types.LOGOUT:
      return Object.assign({}, initialState);
    case types.LOGIN_LOADING:
      return {...state, isLoading: true};
    case types.LOGIN:
      return {
        ...state,
        user,
        token,
        isLoading: false,
        message: '',
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isLoading: false,
        message: data.Error,
        status: data.Status,
      };
    case types.UPDATE_PASSWORD:
      return {
        ...state,
        acknowledge: data.acknowledged,
        isLoading: false,
      };
    case types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        message: data.Error,
        status: data.Status,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        message: '',
        status: null,
        isLoading: false,
        acknowledge: false,
      };

    default:
      return state;
  }
};
