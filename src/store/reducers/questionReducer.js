import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function questionReducer(state = initialState.questions, action) {
  switch (action.type) {
    case types.CREATE_QUESTION_SUCCESS:
      return [...state, { ...action.question }];
    case types.UPDATE_QUESTION_SUCCESS:
      return state.map(question =>
        question.id === action.question.id ? action.question : question
      );
    case types.LOAD_QUESTIONS_SUCCESS:
      return action.questions.sort(sortQuestions);
    case types.DELETE_QUESTION_OPTIMISTIC:
      return state.filter(question => question.id !== action.question.id);
    case types.SET_MODE:
      return action.mode
    case types.REMOVE_MODE:
      return '';
    default:
      return state;
  }
}
const sortQuestions = (a, b) => {
 return b.timestamp - a.timestamp
}
