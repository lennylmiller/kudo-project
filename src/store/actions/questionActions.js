import * as types from "./actionTypes";
import * as questionApi from "../../api/questionApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadQuestionSuccess(questions) {
  debugger
  return { type: types.LOAD_QUESTIONS_SUCCESS, questions };
}

export function createQuestionSuccess(question) {
  return { type: types.CREATE_QUESTION_SUCCESS, question };
}

export function updateQuestionSuccess(question) {
  return { type: types.UPDATE_QUESTION_SUCCESS, question };
}

export function deleteQuestionOptimistic(question) {
  return { type: types.DELETE_QUESTION_OPTIMISTIC, question };
}

export function loadQuestions() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return questionApi
      .getQuestions()
      .then(questions => {
        // debugger
        const values = JSON.parse(JSON.stringify(questions.payload));
        dispatch(loadQuestionSuccess(values));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveQuestion(question) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return questionApi
      .saveQuestion(question)
      .then(savedQuestion => {
        question.id
          ? dispatch(updateQuestionSuccess(savedQuestion))
          : dispatch(createQuestionSuccess(savedQuestion));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteQuestion(question) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteQuestionOptimistic(question));
    return questionApi.deleteQuestion(question.id);
  };
}
