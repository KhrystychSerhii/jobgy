import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { fetchQuestions } from '../Services/Api'

export const GET_QUESTIONS_SUCCESS = 'jobjy/ads/GET_QUESTIONS_SUCCESS';

export const getQuestionsSuccess = (data) => ({type: GET_QUESTIONS_SUCCESS, data});

export const getQuestions = () => async (dispatch) => {
  const response = await fetchQuestions();


  console.log('get questions response', response)
  if (response.ok) {
    dispatch(getQuestionsSuccess(response.data.data));
  }
}

export const INITIAL_STATE = Immutable({
  info: [],
})

/**
 * selector для того что бы получать данные из state
 */
/* ------------- Selectors ------------- */

const selectQuestionsDomain = (state) => state.questions

export const selectQuestions = () => createSelector(selectQuestionsDomain, subdomain => subdomain.info)

// successful avatar lookup
const success = (state, {data}) => {
  return state.merge({info: data})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_QUESTIONS_SUCCESS]: success,
});
