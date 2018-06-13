import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import { fetchCategories, toggleNotificationCategory, unsubscribeCategory } from '../Services/Api'

import lodash from 'lodash';

export const GET_CATEGORIES_LIST_SUCCESS = 'jobjy/categories/GET_CATEGORIES_LIST_SUCCESS'

/* ------------- Types and Action Creators ------------- */
export const getCategoriesListSuccess = (data) => ({type: GET_CATEGORIES_LIST_SUCCESS, data})
export const getCategoriesList = () => async (dispatch) => {
  const response = await fetchCategories()
  if (response.ok) {
    dispatch(getCategoriesListSuccess(response.data.data))
  }
}
export const toggleCategory = (categoryId) => async (dispatch) => {
  const response = await toggleNotificationCategory(categoryId);
  if (response.ok) {
    dispatch(getCategoriesList())
  }
}
export const unsubscribeCategoryById = (categoryId) => async (dispatch) => {
  const response = await unsubscribeCategory(categoryId);
  if (response.ok) {
    dispatch(getCategoriesList());
  }
}
export const INITIAL_STATE = Immutable({
  list: [],
})
/* ------------- Selectors ------------- */

const selectCategoriesDomain = (state) => state.categories

export const selectCategoriesList = () => createSelector(selectCategoriesDomain, subdomain => subdomain.list)

/* ------------- Reducers ------------- */
// successful avatar lookup
const success = (state, {data}) => {
  return state.merge({list: data})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_CATEGORIES_LIST_SUCCESS]: success,
})
