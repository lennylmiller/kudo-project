import { handleResponse, handleError } from "./apiUtils";

const baseUrl = '/api/authors'; //process.env.API_URL + '/courses/';

export function getAuthors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
