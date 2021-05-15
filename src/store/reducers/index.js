import { combineReducers } from "redux";
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import courses from "./courseReducer";
import authors from "./authorReducer";
import questions from './questionReducer';
import users from './userReducer';
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  courses,
  authors,
  questions,
  apiCallsInProgress
});

export default rootReducer;
