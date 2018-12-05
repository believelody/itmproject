import { combineReducers } from 'redux';
import userReducer from './userReducer';
import adReducer from './adReducer';
import authReducer from './authReducer';
import absenceReducer from './absenceReducer';

export default combineReducers({
  user: userReducer,
  ad: adReducer,
  auth: authReducer,
  abs: absenceReducer
});
