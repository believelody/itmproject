import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adReducer from './adReducer';

export default combineReducers({
  user: userReducer,
  ad: adReducer
});
