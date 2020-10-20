import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import market from './market';

export default combineReducers({
  errors,
  messages,
  auth,
  market,
});
