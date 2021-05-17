// [x] regular unit tests
// [] react component tests
// [x] e2e tests ( frontend integration tests ) => cypress

import { handleResponse, handleError } from './apiUtils';

const baseUrl = '/api/questions/';

export function getQuestions() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveQuestion(question) {
  return fetch(baseUrl + (question.id || ''), {
    method : question.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    headers : { 'content-type' : 'application/json' },
    body : JSON.stringify(question)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteQuestion(questionId) {
  return fetch(baseUrl + questionId, {
    method : 'DELETE',
  })
    .then(handleResponse)
    .catch(handleError);
}
