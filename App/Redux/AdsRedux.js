import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { fetchAds, jumpAd, cancelAd, fetchAdRating } from '../Services/Api'

export const GET_ADS_LIST_SUCCESS = 'jobjy/ads/GET_ADS_LIST_SUCCESS';
export const GET_AD_RATING_SUCCESS = 'jobjy/ads/GET_AD_RATING_SUCCESS';

export const getAdsListSuccess = (data) => ({type: GET_ADS_LIST_SUCCESS, data});
export const getAdRatingSuccess = (data) => ({type: GET_AD_RATING_SUCCESS, data});

export const getAdsList = (type) => async (dispatch) => {
  const response = await fetchAds(type);
  if (response.ok) {
    dispatch(getAdsListSuccess(response.data.data));
  }
}
export const jumpActiveAd = (id) => async (dispatch) => {
  const response = await jumpAd(id);
  if (response.ok) {
    dispatch(getAdsList())
  }
}
export const cancelActiveAd = (id) => async (dispatch) => {
  const response = await cancelAd(id);
  if (response.ok) {
    dispatch(getAdsList());
  }
}

export const getAdRating = (id) => async (dispatch) => {
  const response = await fetchAdRating(id);
  if (response.ok) {
    dispatch(getAdRatingSuccess(response.data.data));
  }
}

export const INITIAL_LIST_STATE = Immutable({
  list: [],
})
export const INITIAL_RATING_STATE = Immutable({
  info: null,
})

/**
 * selector для того что бы получать данные из state
 */
/* ------------- Selectors ------------- */

const selectAdsDomain = (state) => state.ad

export const selectAdsList = () => createSelector(selectAdsDomain, subdomain => subdomain.ads.list)
export const selectAdRating = () => createSelector(selectAdsDomain, subdomain => subdomain.rating.info)

// successful avatar lookup
const listSuccess = (state, {data}) => {
  return state.merge({list: data})
}

const ratingSuccess = (state, {data}) => {
  return state.merge({info: data})
}

/* ------------- Hookup Reducers To Types ------------- */
export const listReducer = createReducer(INITIAL_LIST_STATE, {
  [GET_ADS_LIST_SUCCESS]: listSuccess,
});
export const ratingReducer = createReducer(INITIAL_RATING_STATE, {
  [GET_AD_RATING_SUCCESS]: ratingSuccess,
});
export const reducer = combineReducers({
  ads: listReducer,
  rating: ratingReducer,
})
