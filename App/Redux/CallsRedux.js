import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { fetchIncomingCalls, fetchIncomingCallsBy, phoneNumberPress } from '../Services/Api'

export const GET_INCOMING_CALLS_LIST_SUCCESS = 'jobjy/incomingCalls/GET_INCOMING_CALLS_LIST_SUCCESS';

export const getIncomingCallsListSuccess = (data) => ({type: GET_INCOMING_CALLS_LIST_SUCCESS, data});


export const getIncomingCallsList = () => async (dispatch) => {
  const response = await fetchIncomingCalls();
  if (response.ok) {
    dispatch(getIncomingCallsListSuccess(response.data.data));
  }
};

export const searchIncomingCallsList = (phone) => async (dispatch) => {
  const response = await fetchIncomingCallsBy(phone);
  if (response.ok) {
    dispatch(getIncomingCallsListSuccess(response.data.data));
  }
};

export const callButtonPress = (postId) => async (dispatch) => {
  const response = await phoneNumberPress(postId);
  if (response.ok) {
    dispatch();
  }
};

export const INITIAL_STATE = Immutable({
  list: []
});

/* ------------- Selectors ------------- */

const selectIncomingCallsDomain = (state) => state.calls;

export const selectIncomingCallsList = () => createSelector(selectIncomingCallsDomain, subdomain => subdomain.list)

const success = (state, {data}) => {
  return state.merge({list: data})
};

export const reducer = createReducer(INITIAL_STATE, {
  [GET_INCOMING_CALLS_LIST_SUCCESS]: success,
});

// todo: переписать на редуксе
// export const getIncomingCallsList = () => fetchIncomingCalls().then((response) => {
//   console.log(response);
//   if (response.ok) {
//     return response.data.data;
//   } else {
//     return null;
//   }
// });

