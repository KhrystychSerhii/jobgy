import { AsyncStorage } from 'react-native';
import httpClient from './Http'

export const register = (credentials) => httpClient.post('/register', credentials)
export const login = (credentials) => {
  return httpClient.post('/login', credentials)
};
export const forgotPassword = (phone) => httpClient.post('/password/reset', phone);

export const fetchCategories = () => httpClient.get('/categories/all/public');
export const fetchSubCategories = (id) => httpClient.get(`/categories/${id}`);
export const unsubscribeCategory = (id) => httpClient.put('/subscriptions/category/unsubscribe', {category_id: id});
export const fetchAttributes = (id) => httpClient.get(`/categories/${id}/attributes`);
export const fetchPostsByCategory = (id, params) => httpClient.post(`/posts/all/public`, {category: id, ...params});
export const fetchCategoryData = (id) => httpClient.post(`/posts/${id}`, {category: id});

export const fetchInterests = () => httpClient.get(`/interests/all`);
export const fetchLanguages = () => httpClient.get(`/locales/all`);
export const fetchCities = () => httpClient.get('/attributes/cities');
export const fetchRegions = () => httpClient.get('/attributes/regions');

export const fetchCurrentUser = () => httpClient.get(`/users/current`);
export const updateCurrentUser = (user) => httpClient.post(`/users/${user.id}`, user);

export const fetchUnreadNotificationsAmount = () => httpClient.get('/notifications/unread/amount');
export const fetchAllNotifications = () => httpClient.get('/notifications/all');
export const deleteNotification = (id) => httpClient.delete(`/notifications/${id}`);

export const postNewAd = (ad) => httpClient.post('/posts', ad);
export const fetchPostById = (id) => httpClient.get(`/posts/${id}`);

export const postLanguage = (ln) => httpClient.post(`/users/locale/${ln}`);
export const getLanguage = () => AsyncStorage.getItem('ln');
export const setLanguage = (ln) => {console.log('ln', ln); return AsyncStorage.setItem('ln', ln)};

export const fetchSubscriptions = () => httpClient.get('/subscriptions/all');

// Ads
export const fetchAds = (type = 'active') => httpClient.get(`/posts/own/${type}`);
export const jumpAd = (id) => httpClient.post(`/posts/own/${id}/jump`);
export const cancelAd = (id) => httpClient.post(`/posts/own/${id}/cancel`);
// ad rating
export const fetchAdRating = (id) => httpClient.get(`/posts/own/${id}/rating`);

// Questions
export const fetchQuestions = (id) => httpClient.get('/questions/all');

// Notifications Manage
export const toggleNotificationCategory = (categoryId) => httpClient.put(`/categories/${categoryId}/notify/toggle`);

// Calls
export const fetchIncomingCalls = () => httpClient.get('/incoming/calls/all');
