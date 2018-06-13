import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { fetchSubscriptions } from '../Services/Api'

export const GET_SUBSCRIPTIONS_SUCCESS = 'jobjy/subscriptions/GET_SUBSCRIPTIONS_SUCCESS';

export const getSubscriptionsSuccess = (data) => ({type: GET_SUBSCRIPTIONS_SUCCESS, data});

export const getSubscriptionsList = () => async (dispatch) => {
  const response = await fetchSubscriptions();
  if (response.ok) {
    dispatch(getSubscriptionsSuccess(response.data.data));
  }
};

export const INITIAL_STATE = Immutable({
  list: []
});

/* ------------- Selectors ------------- */
const selectSubscriptionsDomain = (state) => state.subscriptions;

export const selectSubscriptionsList = () => createSelector(selectSubscriptionsDomain, subdomain => subdomain.list)

const success = (state, {data}) => {
  console.log('subscriptions success data', data)
  return state.merge({list: data})
};

export const reducer = createReducer(INITIAL_STATE, {
  [GET_SUBSCRIPTIONS_SUCCESS]: success,
});

// export const getSubscriptions = (id) => fetchSubscriptions().then((response) => {
//   if (response.ok) {
//     return response.data.data;
//   } else {
//     return [];
//   }
// });
