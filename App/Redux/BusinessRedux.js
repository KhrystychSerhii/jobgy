import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import { fetchBusiness, fetchPremiumBusiness } from '../Services/Api'

/* ------------- Types and Action Creators ------------- */

export const GET_BUSINESS_SUCCESS = 'jobjy/business/GET_BUSINESS_SUCCESS'
export const GET_PREMIUM_BUSINESS_SUCCESS = 'jobjy/business/GET_PREMIUM_BUSINESS_SUCCESS'

const getBusinessListSuccess = (data) => ({type: GET_BUSINESS_SUCCESS, data});
const getPremiumBusinessListSuccess = (data) => ({type: GET_PREMIUM_BUSINESS_SUCCESS, data});

export const getBusinessList = (id) => async (dispatch) => {
  const response = await fetchBusiness(id);
  if (response.ok) {
    dispatch(getBusinessListSuccess(response.data.data))
  }
};
export const getPremiumBusinessList = () => async (dispatch) => {
  const response = await fetchPremiumBusiness();
  if (response.ok) {
    dispatch(getPremiumBusinessListSuccess(response.data.data));
  }
}
export const INITIAL_STATE = Immutable({
  acceptable: [],
  premium: []
});

/* ------------- Selectors ------------- */
const selectAttributesDomain = (state) => {
  return state.business
}

export const selectBusinessList = () => createSelector(selectAttributesDomain, subdomain => subdomain.acceptable);
export const selectPremiumBusinessList = () => createSelector(selectAttributesDomain, subdomain => subdomain.premium);

/* ------------- Reducers ------------- */

const success = (state, {data}) => {
  return state.merge({acceptable: data})
}

const successPremium = (state, {data}) => {
  return state.merge({premium: data})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_BUSINESS_SUCCESS]: success,
  [GET_PREMIUM_BUSINESS_SUCCESS]: successPremium,
})
