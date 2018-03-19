import httpClient from '../Services/Http'
import * as Api from '../Services/Api'
import { getCurrentUser } from './UserRedux'

export const LOGOUT_CURRENT = 'jobjy/auth/LOGOUT_CURRENT'
/* ------------- Types and Action Creators ------------- */

export const register = (payload) => async (dispatch) => {
  return Api.register(payload)
}
export const login = (data) => async (dispatch) => {
  return Api.login(data)
}

export const logout = () => async (dispatch) => {
  httpClient.clearToken(null)
    .then(() => dispatch({type: LOGOUT_CURRENT}))
}
