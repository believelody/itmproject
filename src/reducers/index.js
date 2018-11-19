import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adReducer from './adReducer';
import authReducer from './authReducer';

export default combineReducers({
  user: userReducer,
  ad: adReducer,
  auth: authReducer
});
