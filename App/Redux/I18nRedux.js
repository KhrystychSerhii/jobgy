import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import { setLanguage, getLanguage } from '../Services/Api'
import I18n from '../I18n'

export const GET_LANGUAGE_SUCCESS = 'jobjy/language/GET_LANGUAGE_SUCCESS'
/* ------------- Types and Action Creators ------------- */
export const getCurrentLanguageSuccess = (data) => ({type: GET_LANGUAGE_SUCCESS, data})
export const getCurrentLanguage = () => async (dispatch) => {
  const language = await getLanguage();
  dispatch(getCurrentLanguageSuccess(language));
}

export const updateCurrentLanguage = (ln) => async (dispatch) => {
  console.log('ln', ln);
  const language = await setLanguage(ln);
  console.log('language response', language);
  I18n.locale = ln;
  dispatch(getCurrentLanguage())
};
export const INITIAL_STATE = Immutable({
  ln: 'en',
});

/* ------------- Selectors ------------- */

const selectLanguageDomain = (state) => state.language // todo: узнать откуда взялось это имя

export const selectLanguage = () => createSelector(selectLanguageDomain, subdomain => subdomain.ln)

/* ------------- Reducers ------------- */
// successful avatar lookup
const success = (state, {data}) => {
  return state.merge({ln: data})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_LANGUAGE_SUCCESS]: success,
})
