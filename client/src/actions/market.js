import axios from 'axios';
import {
  ADD_MARKET,
  DELETE_MARKET,
  GET_MARKET,
  GET_MARKETS,
  UPDATE_MARKET,
  GET_CATEGORIES,
} from './types';
import { tokenConfig } from './auth';
import { createMessage, returnErrors } from './messages';

// Get Categories
export const getCategories = () => (dispatch, getState) => {
  axios
    .get('/api/category', tokenConfig(getState().auth.token))
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Get Markets
export const getMarkets = () => (dispatch, getState) => {
  axios
    .get('/api/market', tokenConfig(getState().auth.token))
    .then((res) => {
      dispatch({
        type: GET_MARKETS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Get Market
export const getMarket = (marketId) => (dispatch, getState) => {
  axios
    .get(`/api/market/${marketId}`, tokenConfig(getState().auth.token))
    .then((res) => {
      dispatch({
        type: GET_MARKET,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Delete market
export const deleteMarket = (marketId) => (dispatch, getState) => {
  axios
    .put(
      `/api/market/delete/${marketId}`,
      {},
      tokenConfig(getState().auth.token)
    )
    .then((res) => {
      dispatch(createMessage({ deleteMarket: 'Market Deleted' }));
      dispatch({
        type: DELETE_MARKET,
        payload: marketId,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Update market
export const updateMarket = (marketId, data) => (dispatch, getState) => {
  axios
    .put(`/api/market/${marketId}`, data, tokenConfig(getState().auth.token))
    .then((res) => {
      dispatch(createMessage({ updateMarket: 'Market Updated' }));
      dispatch({
        type: UPDATE_MARKET,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Add market
export const addMarket = (data) => (dispatch, getState) => {
  axios
    .post(`/api/market`, data, tokenConfig(getState().auth.token))
    .then((res) => {
      dispatch(createMessage({ addMarket: 'Market Added' }));
      dispatch({
        type: ADD_MARKET,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const searchMarket = (data) => (dispatch, getState) => {
  axios
    .get(`api/market/search?q=${data}`, tokenConfig(getState().auth.token))
    .then((res) => {
      dispatch({
        type: GET_MARKETS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
