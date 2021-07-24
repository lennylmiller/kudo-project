import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
  SET_MESSAGE,
} from './actionTypes';

import authApi from '../../api/authAPI';

export const signup = (name, email, password) => (dispatch) => {
  return authApi.signup(name, email, password).then(
    (response) => {
      dispatch({
        type : SIGNUP_SUCCESS,
      });

      dispatch({
        type : SET_MESSAGE,
        payload : response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type : SIGNUP_FAIL,
      });

      dispatch({
        type : SET_MESSAGE,
        payload : message,
      });

      return Promise.reject();
    }
  );
};

export const signin = (email, password) => (dispatch) => {
  return authApi.signin(email, password).then(
    (data) => {
      dispatch({
        type : SIGNIN_SUCCESS,
        payload : { user : data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type : SIGNIN_FAIL,
      });

      dispatch({
        type : SET_MESSAGE,
        payload : message,
      });

      return Promise.reject();
    }
  );
};

export const signout = () => (dispatch) => {
  authApi.signout();

  dispatch({
    type : SIGNOUT,
  });

  return Promise.resolve();
};
