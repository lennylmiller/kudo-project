import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function userReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return [...state, { ...action.user }];
    case types.UPDATE_USER_SUCCESS:
      return state.map(user =>
        user.id === action.user.id ? action.user : user
      );
    case types.LOAD_USERS_SUCCESS:
      return action.users.sort(sortUsers);
    case types.DELETE_USER_OPTIMISTIC:
      return state.filter(user => user.id !== action.user.id);
    default:
      return state;
  }
}

const getAnswerCount = (user) => {
  return Object.keys(user.answers).length;
};

const sortUsers = (a, b) => {
  const answerCountA = getAnswerCount(a);
  const answerCountB = getAnswerCount(b);
  const questionCountA = getAnswerCount(a);
  const questionCountB = getAnswerCount(b);

  const aCount = answerCountA + questionCountA;
  const bCount = answerCountB + questionCountB;

  return bCount - aCount;
};
