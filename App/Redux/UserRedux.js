import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import { fetchCurrentUser } from '../Services/Api'

export const GET_CURRENT_USER_SUCCESS = 'jobjy/user/GET_CURRENT_USER_SUCCESS'
export const CLEAR_CURRENT_USER = 'jobjy/user/CLEAR_CURRENT_USER'
/* ------------- Types and Action Creators ------------- */
export const getCurrentUserSuccess = (data) => ({type: GET_CURRENT_USER_SUCCESS, data})
export const clearCurrentUser = () => ({type: CLEAR_CURRENT_USER})
export const getCurrentUser = () => async (dispatch) => {
  const response = await fetchCurrentUser()
  console.log('response')
  console.log(response)
  if (response.ok) {
    dispatch(getCurrentUserSuccess(response.data.data))
  }
}
export const INITIAL_STATE = Immutable({
  info: null,
})

/* ------------- Selectors ------------- */

const selectUserDomain = (state) => state.user

export const selectUserInfo = () => createSelector(selectUserDomain, subdomain => subdomain.info)
/* ------------- Reducers ------------- */
// successful avatar lookup
const success = (state, {data}) => {
  return state.merge({info: data})
}

const clear = (state) => {
  return state.merge({info: null})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_CURRENT_USER_SUCCESS]: success,
  [CLEAR_CURRENT_USER]: clear,
})


