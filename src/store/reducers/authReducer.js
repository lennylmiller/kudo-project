import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
} from '../actions/actionTypes';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isSignedIn: true, user }
  : { isSignedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignedIn: false,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        isSignedIn: false,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: payload.user,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };
    case SIGNOUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
