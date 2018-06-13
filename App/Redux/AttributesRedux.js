import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import { fetchAttributes } from '../Services/Api'

/* ------------- Types and Action Creators ------------- */

export const GET_ATTRIBUTES_SUCCESS = 'jobjy/user/GET_ATTRIBUTES';

const getAttributesListSuccess = (data) => ({type: GET_ATTRIBUTES_SUCCESS, data});

export const getAttributesList = (id) => async (dispatch) => {
  const response = await fetchAttributes(id);
  if (response.ok) {
    dispatch(getAttributesListSuccess(response.data.data))
  }
};
export const INITIAL_STATE = Immutable({
  attributes: null
});

/* ------------- Selectors ------------- */
const selectAttributesDomain = (state) => {
  return state.attributes
}

export const selectAttributesList = () => createSelector(selectAttributesDomain, subdomain => subdomain.attributes)

/* ------------- Reducers ------------- */

const success = (state, {data}) => {
  return state.merge({attributes: data})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_ATTRIBUTES_SUCCESS]: success,
})
