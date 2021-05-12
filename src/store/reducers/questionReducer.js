import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function questionReducer(state = initialState.questions, action) {
  console.log(action);
  switch (action.type) {
    case types.CREATE_QUESTION_SUCCESS:
      return [...state, { ...action.question }];
    case types.UPDATE_QUESTION_SUCCESS:
      return state.map(question =>
        question.id === action.question.id ? action.question : question
      );
    case types.LOAD_QUESTIONS_SUCCESS:
      return action.questions;
    case types.DELETE_QUESTION_OPTIMISTIC:
      return state.filter(question => question.id !== action.question.id);
    default:
      return state;
  }
}
