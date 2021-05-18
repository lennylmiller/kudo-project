import * as types from './actionTypes';

export function loadUserSuccess(users) {
  return { type : types.LOAD_USERS_SUCCESS, users };
}

export function createUserSuccess(user) {
  return { type : types.CREATE_USER_SUCCESS, user };
}

export function updateUserSuccess(user) {
  return { type : types.UPDATE_USER_SUCCESS, user };
}

export function deleteUserOptimistic(user) {
  return { type : types.DELETE_USER_OPTIMISTIC, user };
}

