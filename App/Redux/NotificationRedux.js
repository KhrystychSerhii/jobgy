import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';

import { fetchUnreadNotificationsAmount, fetchAllNotifications, deleteNotification } from '../Services/Api'

export const GET_UNREAD_NOTIFICATIONS_AMOUNT = 'jobjy/notifications/GET_UNREAD_NOTIFICATIONS_AMOUNT'
export const GET_ALL_NOTIFICATIONS = 'jobjy/notifications/GET_ALL_NOTIFICATIONS'

export const getUnreadNotificationsAmountSuccess = (data) => ({type: GET_UNREAD_NOTIFICATIONS_AMOUNT, data})
export const getAllNotificationsSuccess = (data) => ({type: GET_ALL_NOTIFICATIONS, data})

export const getUnreadNotificationsAmount = () => async (dispatch) => {
  const response = await fetchUnreadNotificationsAmount();
  if (response.ok) {
    dispatch(getUnreadNotificationsAmountSuccess(response.data.data.amount))
  }
}

export const getAllNotifications = () => async (dispatch) => {
  const response = await fetchAllNotifications();

  if (response.ok) {
    dispatch(getAllNotificationsSuccess(response.data.data))
  }
}

export const removeNotification = (id) => async (dispatch) => {
  const response = await deleteNotification(id);

  if (response.ok) {
    dispatch(getAllNotifications())
  }
}

export const INITIAL_STATE = Immutable({
  list: [],
  amount: 0,
})

/* ------------- Selectors ------------- */
const selectNotificationsDomain = (state) => state.notifications

export const selectUnreadNotificationsAmount = () => createSelector(selectNotificationsDomain, subdomain => {
  return subdomain.amount;
})

export const selectAllNotifications = () => createSelector(selectNotificationsDomain, subdomain => {
  return subdomain.list;
})

const amountSuccess = (state, {data}) => {
  return state.merge({amount: data})
}
const listSuccess = (state, {data}) => {
  return state.merge({list: data});
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [GET_ALL_NOTIFICATIONS]: listSuccess,
  [GET_UNREAD_NOTIFICATIONS_AMOUNT]: amountSuccess
})
