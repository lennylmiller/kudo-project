import * as questionApi from '../../api/questionApi';
import { beginApiCall, apiCallError } from './apiStatusActions';
import {
  createQuestionSuccess,
  deleteQuestionOptimistic,
  loadQuestionSuccess,
  updateQuestionSuccess
} from './questionActionCreator';
export const loadQuestionsV2 = async(dispatch) => {
  try {
    const questions = await questionApi.getQuestions()
    const values = JSON.parse(JSON.stringify(questions.payload));
    dispatch(loadQuestionSuccess(values));
  } catch(error) {
    dispatch(apiCallError(error));
    throw error;
  }
}
export function loadQuestions() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return questionApi
      .getQuestions()
      .then(questions => {
        const values = JSON.parse(JSON.stringify(questions.payload));
        dispatch(loadQuestionSuccess(values));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export const saveQuestionV2 = async(question, dispatch) => {
  //eslint-disable-next-line no-unused-vars
  try {
    dispatch(beginApiCall());
    const savedQuestion = await questionApi.saveQuestion(question);
console.log(question);
    question.id
      ? dispatch(updateQuestionSuccess(savedQuestion))
      : dispatch(createQuestionSuccess(savedQuestion));

  } catch(error) {
    dispatch(apiCallError(error));
    throw error;
  }
};

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
