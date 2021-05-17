import * as types from "./actionTypes";
import * as questionApi from "../../api/questionApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadQuestionSuccess(questions) {
  return { type: types.LOAD_QUESTIONS_SUCCESS, questions };
}

export function setMode(mode) {
  return { type: types.SET_MODE, mode }
}

export function removeMode() {
  return { type: types.REMOVE_MODE }
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
