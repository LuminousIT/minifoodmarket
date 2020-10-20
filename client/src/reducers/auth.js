import {
  ADMIN_LOADED,
  ADMIN_LOADING,
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  admin: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: action.payload.data,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        ...action.payload.data,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        admin: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
