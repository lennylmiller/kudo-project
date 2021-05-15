export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

export const CREATE_QUESTION = "CREATE_QUESTION";
export const LOAD_QUESTIONS_SUCCESS = "LOAD_QUESTION_SUCCESS";
export const CREATE_QUESTION_SUCCESS = "CREATE_QUESTION_SUCCESS";
export const UPDATE_QUESTION_SUCCESS = "UPDATE_QUESTION_SUCCESS";

export const CREATE_USERS = "CREATE_USERS";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";
export const DELETE_QUESTION_OPTIMISTIC = "DELETE_QUESTION_OPTIMISTIC";
export const DELETE_USER_OPTIMISTIC = "DELETE_USER_OPTIMISTIC";

export const SET_MODE = 'SET_MODE';
export const REMOVE_MODE = 'REMOVE_MODE';
