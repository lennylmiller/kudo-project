import { combineReducers } from "redux";
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import questions from './questionReducer';
import users from './userReducer';
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  questions,
  apiCallsInProgress
});

export default rootReducer;
