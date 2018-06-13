import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'

export const SET_FILTER_PARAMS = 'jobjy/filter/SET_FILTER_PARAMS'
export const CLEAR_FILTER_PARAMS = 'jobjy/filter/CLEAR_FILTER_PARAMS'
/* ------------- Types and Action Creators ------------- */
export const setFilterParams = (params) => ({type: SET_FILTER_PARAMS, params})
export const clearFilterParams = () => ({type: CLEAR_FILTER_PARAMS})
export const INITIAL_STATE = Immutable({
  params: {
    interest: '',
    work_period_from: '',
    work_period_to: '',
    regions_from: [],
    regions_to: [],
    location_from: [],
    location_to: [],
  },
})

/* ------------- Selectors ------------- */

const selectFilterDomain = (state) => {
  console.log('SELECT FILTER STATE', state);
  return state.filter;
}

export const selectFilters = () => createSelector(selectFilterDomain, subdomain => subdomain.params);
/* ------------- Reducers ------------- */
// successful avatar lookup
const success = (state, data) => {
  return state.merge({params: data.params})
}

const clear = (state) => {
  return state.merge({params: INITIAL_STATE.params})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [SET_FILTER_PARAMS]: success,
  [CLEAR_FILTER_PARAMS]: clear,
})


