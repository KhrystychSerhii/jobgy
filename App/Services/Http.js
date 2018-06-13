// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { AsyncStorage } from 'react-native'
import AppConfig from '../Config/AppConfig'
import { logout } from '../Redux/AuthRedux'

class Http {
  baseURL = AppConfig.apiUrl
  http
  token

  init (dispatch) {
    this.http = apisauce.create({
      // base URL is read from the "constructor"
      baseURL: this.baseURL,
      // here are some default headers
      headers: {
        'Cache-Control': 'no-cache',
      },
      // 10 second timeout...
      timeout: 10000,
    })
    this.http.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log('error')
        console.log(error)
        // Do something with response error
        if (error.response.status === 401) {
          dispatch(logout())
        }
        return Promise.reject(error.response)
      })
    this.updateHeaders().catch(console.error)
  }

  async setToken (token) {
    try {

      this.token = token
      await AsyncStorage.setItem('token', token)
      return this.updateHeaders()
    } catch (e) {
      console.log("e")
      console.log(e)
    }
  }

  async updateHeaders () {
    if (!this.token) {
      this.token = await AsyncStorage.getItem('token')
    }
    if (this.token) {
      this.http.setHeader('Authorization', `Bearer ${this.token}`)
    }
  }

  getToken () {
    return AsyncStorage.getItem('token')
  }

  async clearToken () {
    this.token = null
    await AsyncStorage.removeItem('token')
    return this.updateHeaders().catch(console.error)
  }

  get (endpoint, params) {
    return this.http.get(endpoint, {params})
  }

  post (endpoint, data, config) {
    return this.http.post(endpoint, data, config)
  }

  put (endpoint, data, config) {
    return this.http.put(endpoint, data, config)
  }

  delete (endpoint, params) {
    return this.http.delete(endpoint, {params});
  }

  patch (endpoint, data) {
    return this.http.patch(endpoint, data);
  }
}

const httpClient = new Http()
export default httpClient

