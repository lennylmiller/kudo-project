import { loadQuestionsV2 } from '../actions/questionActions';

export const fetchQuestionsMiddleware = storeAPI => next => async action => {
  // Do something in here, when each action is dispatched
  if (action.type === 'CREATE_QUESTION_SUCCESS' || action.type === 'UPDATE_QUESTION_SUCCESS' ) {
    await loadQuestionsV2(storeAPI.dispatch)
  }
  return next(action)
}


