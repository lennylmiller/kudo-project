import * as questionsAPI from '../../api/questionApi';
import * as statusActions  from './apiStatusActions';
import { updateQuestionSuccess, createQuestionSuccess } from './questionActionCreator';
import { saveQuestion } from './questionActions'
import { apiCallError } from './apiStatusActions';

jest.mock('../../api/questionAPI');
jest.mock('./apiStatusActions');

describe('store/actions/questionAction', () => {
  beforeEach(() => {
    //jest.resetAllMocks()
    // questionsAPI.saveQuestion = jest.fn().mockImplementation(() => );
  })

  it('updates questions', async () => {
    const question = {
      id: 'adfad'
    }
    const updateQuestionAction = updateQuestionSuccess(question);

    questionsAPI.saveQuestion = jest.fn().mockImplementation(() => {
      return Promise.resolve(question)
    })

    const reduxFn = saveQuestion(question)
    const dispatch = jest.fn()

    await reduxFn(dispatch, jest.fn());

    expect(statusActions.beginApiCall).toBeCalled();
    expect(questionsAPI.saveQuestion).toBeCalledWith(question);
    expect(dispatch).toBeCalledWith(updateQuestionAction)
  })

  it('saves questions ', async () => {
    const question = {
      id: undefined
    }
    const saveQuestionAction = createQuestionSuccess(question);

    questionsAPI.saveQuestion = jest.fn().mockImplementation(() => {
      return Promise.resolve(question)
    })

    const reduxFn = saveQuestion(question)
    const dispatch = jest.fn()

    await reduxFn(dispatch, jest.fn());

    expect(statusActions.beginApiCall).toBeCalled();
    expect(questionsAPI.saveQuestion).toBeCalledWith(question);
    expect(dispatch).toBeCalledWith(saveQuestionAction)
  })

  it('handles errors', async () => {
    //const error = ;

    questionsAPI.saveQuestion = jest.fn().mockImplementation(async () => {
      throw new Error("Something Bad Happened")
    })

    const dispatch = jest.fn()
    const reduxFn = saveQuestion(dispatch, jest.fn())

    await expect(() => reduxFn(dispatch, jest.fn()))
      .rejects
      .toThrow("Something Bad Happened")

    expect(dispatch).toBeCalledWith(apiCallError(new Error("Something Bad Happened")))
    //expect(apiCallError).toBeCalledWith(error);

  })
})
