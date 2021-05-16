import { combineReducers } from "redux";
import { alert } from './alert.reducer';
import questions from './questionReducer';
import users from './userReducer';
import apiCallsInProgress from "./apiStatusReducer";
import message from './messageReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  auth,
  message,
  users,
  alert,
  questions,
  apiCallsInProgress
});

export default rootReducer;
