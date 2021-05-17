import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { fetchQuestionsMiddleware } from './middleware/fetchQuestionsMiddleware';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk, fetchQuestionsMiddleware));
}
