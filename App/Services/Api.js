import httpClient from './Http'

export const register = (credentials) => httpClient.post('/register', credentials)
export const login = (credentials) => {
  return httpClient.post('/login', credentials)
}

export const fetchCategories = () => httpClient.get('/categories/all/public')
export const fetchPostsByCategory = (id) => httpClient.post(`/posts/all/public`, {category: id})
export const fetchCategoryData = (id) => httpClient.post(`/posts/${id}`, {category: id})

export const fetchInterests = () => httpClient.get(`/interests/all`)
export const fetchLanguages = () => httpClient.get(`/locales/all`)
export const fetchCities = () => httpClient.get('/attributes/cities')
export const fetchRegions = () => httpClient.get('/attributes/regions')

export const fetchCurrentUser = () => httpClient.get(`/users/current`)

export const postNewAd = (ad) => httpClient.post('/posts', ad)
export const fetchPostById = (id) => httpClient.get(`/posts/${id}`);
