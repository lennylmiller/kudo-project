import * as userApi from '../../api/userApi';
import { beginApiCall, apiCallError } from './apiStatusActions';
import {
  loadUserSuccess,
  updateUserSuccess,
  createUserSuccess,
  deleteUserOptimistic
} from './userActionCreator';

export const loadUsersV2 = async(dispatch) => {
  try {
    const users = await userApi.getUsers();
    const values = JSON.parse(JSON.stringify(users.payload));
    dispatch(loadUserSuccess(values));

  } catch(error) {
    dispatch(apiCallError(error));
    throw error;
  }
};

export function loadUsers() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return userApi
      .getUsers()
      .then(users => {
        const values = JSON.parse(JSON.stringify(users.payload));
        dispatch(loadUserSuccess(values));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveUser(user) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return userApi
      .saveUser(user)
      .then(savedUser => {
        user.id
          ? dispatch(updateUserSuccess(savedUser))
          : dispatch(createUserSuccess(savedUser));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteUser(user) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteUserOptimistic(user));
    return userApi.deleteUser(user.id);
  };
}
