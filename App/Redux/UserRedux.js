import { createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'
import { combineReducers } from 'redux'
import FCM, { FCMEvent } from 'react-native-fcm'
import { fetchCurrentUser, updateCurrentUser, patchNotificationToken, fetchUserRating, updateCurrentAvatar } from '../Services/Api'

export const GET_CURRENT_USER_SUCCESS = 'jobjy/user/GET_CURRENT_USER_SUCCESS'
export const GET_USER_RATING_SUCCESS = 'jobjy/user/GET_USER_RATING_SUCCESS'
export const CLEAR_CURRENT_USER = 'jobjy/user/CLEAR_CURRENT_USER'
/* ------------- Types and Action Creators ------------- */
export const getCurrentUserSuccess = (data) => ({type: GET_CURRENT_USER_SUCCESS, data})
export const getUserRatingSuccess = (data) => ({type: GET_USER_RATING_SUCCESS, data})
export const clearCurrentUser = () => ({type: CLEAR_CURRENT_USER})
export const getCurrentUser = () => async (dispatch) => {
  const response = await fetchCurrentUser();
  if (response.ok) {
    dispatch(getCurrentUserSuccess(response.data.data))
  }
}
export const getUserRating = () => async (dispatch) => {
  const response = await fetchUserRating();
  if (response.ok) {
    dispatch(getUserRatingSuccess(response.data.data));
  }
}
export const updateUser = (user) => async (dispatch) => {
  const response = await updateCurrentUser(user);
  if (response.ok) {
    dispatch(getCurrentUser());
  }
}
export const updateNotificationToken = () => async (dispatch) => {
  const token = await FCM.getFCMToken();
  return patchNotificationToken(token);
}
export const unsubscribeNotifications = () => async (dispatch) => {
  const token = await FCM.getFCMToken();
  FCM.unsubscribeFromTopic(token);
  dispatch();
};
export const updateAvatar = (formData) => async (dispatch) => {
  const response = await updateCurrentAvatar(formData);
  if (response.ok) {
    dispatch(getCurrentUser());
  }
};

// todo: узнать заем Immutable
export const INITIAL_STATE = Immutable({
  info: null,
  rating: null
})

/**
 * selector для того что бы получать данные из state
 */
/* ------------- Selectors ------------- */

const selectUserDomain = (state) => state.user

export const selectUserInfo = () => createSelector(selectUserDomain, subdomain => subdomain.info)

export const selectUserRating = () => createSelector(selectUserDomain, subdomain => subdomain.rating);
/* ------------- Reducers ------------- */
// successful avatar lookup
const userSuccess = (state, {data}) => {
  return state.merge({info: data})
}

const ratingSuccess = (state, {data}) => {
  return state.merge({rating: data})
}

const clear = (state) => {
  return state.merge({info: null, rating: null})
}

// todo: узнать как работает reducer
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_CURRENT_USER_SUCCESS]: userSuccess,
  [GET_USER_RATING_SUCCESS]: ratingSuccess,
  [CLEAR_CURRENT_USER]: clear,
})


