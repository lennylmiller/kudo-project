import { handleResponse, handleError } from './apiUtils';

const baseUrl = '/api/questions/';

export function getQuestions() {
  return fetch(baseUrl, {
    // mode : 'no-cors'
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveQuestion(question) {
  return fetch(baseUrl + (question.id || ''), {
    method : question.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    // mode : 'no-cors',
    headers : { 'content-type' : 'application/json' },
    body : JSON.stringify(question)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteQuestion(questionId) {
  return fetch(baseUrl + questionId, {
    method : 'DELETE',
    // mode : 'no-cors'
  })
    .then(handleResponse)
    .catch(handleError);
}
