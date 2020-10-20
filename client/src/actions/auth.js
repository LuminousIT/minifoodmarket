import axios from 'axios';
import { returnErrors } from './messages';
import {
  ADMIN_LOADED,
  ADMIN_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './types';

// Check Token & Load Admin
export const loadAdmin = () => (dispatch, getState) => {
  // admin loading
  dispatch({ type: ADMIN_LOADING });

  axios
    .get('/api/admin', tokenConfig(getState().auth.token))
    .then((res) => {
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

// Login
export const login = (body) => (dispatch) => {
  axios
    .post('/api/admin/login', body, tokenConfig())
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

// Register
export const register = (email, password) => (dispatch) => {
  // Request Body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/admin/register', body, tokenConfig())
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

// logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

// Setup Config with token - helper function
export const tokenConfig = (token) => {
  // console.log('TOKEN');
  // console.log(token);
  //   Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //   if token add to header
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  // console.log('CONFIG');
  // console.log(config);
  return config;
};
