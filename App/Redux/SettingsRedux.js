// todo: непонятно ничего! узнать!
import { createReducer } from 'reduxsauce'
import { normalize, schema } from 'normalizr'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import { fetchLanguages, fetchCities, fetchRegions } from '../Services/Api'

export const CATEGORIES_LIST_SUCCESS = 'jobjy/settings/CATEGORIES_LIST_SUCCESS'
export const INTERESTS_LIST_SUCCESS = 'jobjy/settings/INTERESTS_LIST_SUCCESS'
export const LANGUAGES_LIST_SUCCESS = 'jobjy/settings/LANGUAGES_LIST_SUCCESS'
export const CITIES_LIST_SUCCESS = 'jobjy/settings/CITIES_LIST_SUCCESS'
export const REGIONS_LIST_SUCCESS = 'jobjy/settings/REGIONS_LIST_SUCCESS'
/* ------------- Types and Action Creators ------------- */

export const categoriesListSuccess = (entities, result) => ({type: CATEGORIES_LIST_SUCCESS, entities, result})
export const interestsListSuccess = (entities, result) => ({type: INTERESTS_LIST_SUCCESS, entities, result})
export const languagesListSuccess = (list) => ({type: LANGUAGES_LIST_SUCCESS, list})
export const citiesListSuccess = (entities, result) => ({type: CITIES_LIST_SUCCESS, entities, result})
export const regionsListSuccess = (entities, result) => ({type: REGIONS_LIST_SUCCESS, entities, result})

export const getRegionsList = () => (dispatch) => fetchRegions().then((response) => {
  if (response.ok) {
    const normalized = normalize(response.data.data, [new schema.Entity('regions')])
    dispatch(regionsListSuccess(normalized.entities, normalized.result))
  }
})

export const getCitiesList = () => (dispatch) => fetchCities().then((response) => {
  if (response.ok) {
    const normalized = normalize(response.data.data, [new schema.Entity('cities')])
    dispatch(citiesListSuccess(normalized.entities, normalized.result))
  }
})

export const getLanguagesList = () => (dispatch) => fetchLanguages().then((response) => {
  if (response.ok) {
    dispatch(languagesListSuccess(response.data.data))
  }
})

export const CATEGORIES_INITIAL_STATE = Immutable({
  list: {},
  byId: [],
  subcategoriesList: {},
})
export const INTERESTS_INITIAL_STATE = Immutable({
  list: {},
  byId: [],
})
export const REGIONS_INITIAL_STATE = Immutable({
  list: {},
  byId: [],
})
export const CITIES_INITIAL_STATE = Immutable({
  list: {},
  byId: [],
})
export const LANGUAGES_INITIAL_STATE = Immutable({
  list: [],
})

/* ------------- Selectors ------------- */

const selectCategoriesDomain = (state) => state.settings.categories

const selectInterestsDomain = (state) => state.settings.interests
const selectLanguagesDomain = (state) => state.settings.languages
const selectRegionsDomain = (state) => state.settings.regions
const selectCitiesDomain = (state) => state.settings.cities

export const selectCategories = () => createSelector(selectCategoriesDomain, subdomain => subdomain.byId.map(categoryId => subdomain.list[categoryId]))

export const selectInterests = () => createSelector(selectInterestsDomain, subdomain => subdomain.byId.map(id => subdomain.list[id]))
export const selectInterestsObj = () => createSelector(selectInterestsDomain, subdomain => {
  const obj = {}
  Object.keys(subdomain.list).forEach(i => obj[subdomain.list[i].id] = subdomain.list[i].title)
  return obj
})

export const selectRegionsList = () => createSelector(selectRegionsDomain, subdomain => subdomain.byId.map(id => subdomain.list[id]))
export const selectRegions = () => createSelector(selectRegionsDomain, subdomain => subdomain.list)
export const selectAllCities = () => createSelector(selectCitiesDomain, subdomain => subdomain.list)
export const selectLanguagesList = () => createSelector(selectLanguagesDomain, subdomain => subdomain.list)
/* ------------- Reducers ------------- */
// successful avatar lookup
const categoriesSuccess = (state, {entities, result}) => {
  return state.merge({
    list: Immutable(entities.categories),
    byId: Immutable(result),
    subcategoriesList: Immutable(entities.subcategories),
  })
}

const normalizedSuccess = (entityName) => (state, {entities, result}) => state.merge({
  list: entities[entityName],
  byId: result,
})

const languagesSuccess = (state, {list}) => state.merge({
  list,
})

/* ------------- Hookup Reducers To Types ------------- */

export const categoriesReducer = createReducer(CATEGORIES_INITIAL_STATE, {
  [CATEGORIES_LIST_SUCCESS]: categoriesSuccess,
})
export const interestsReducer = createReducer(INTERESTS_INITIAL_STATE, {
  [INTERESTS_LIST_SUCCESS]: normalizedSuccess('interests'),
})
export const languagesReducer = createReducer(LANGUAGES_INITIAL_STATE, {
  [LANGUAGES_LIST_SUCCESS]: languagesSuccess,
})
export const regionsReducer = createReducer(REGIONS_INITIAL_STATE, {
  [REGIONS_LIST_SUCCESS]: normalizedSuccess('regions'),
})
export const citiesReducer = createReducer(CITIES_INITIAL_STATE, {
  [CITIES_LIST_SUCCESS]: normalizedSuccess('cities'),
})

export const reducer = combineReducers({
  categories: categoriesReducer,
  interests: interestsReducer,
  languages: languagesReducer,
  regions: regionsReducer,
  cities: citiesReducer,
})

