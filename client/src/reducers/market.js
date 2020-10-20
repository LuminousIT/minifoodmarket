import {
  MARKET_ERROR,
  ADD_MARKET,
  UPDATE_MARKET,
  DELETE_MARKET,
  GET_MARKET,
  GET_MARKETS,
  GET_CATEGORIES,
} from '../actions/types';

const initialState = {
  markets: [],
  market: null,
  categories: [],
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_MARKET:
      return {
        ...state,
        markets: [...state.markets, payload.data],
        loading: false,
      };
    case GET_MARKET:
    case UPDATE_MARKET:
      return {
        ...state,
        market: payload.data,
        loading: false,
      };
    case GET_MARKETS:
      return {
        ...state,
        markets: payload.data,
        loading: false,
      };
    case GET_CATEGORIES:
      return { ...state, categories: payload.data, loading: false };
    case DELETE_MARKET:
      return {
        ...state,
        markets: state.markets.filter((market) => market._id !== payload),
      };

    default:
      return state;
  }
};
