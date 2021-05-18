import { combineReducers } from "redux";
import questions from './questionReducer';
import users from './userReducer';
import apiCallsInProgress from "./apiStatusReducer";
import message from './messageReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  auth,
  message,
  users,
  questions,
  apiCallsInProgress
});

export default rootReducer;
