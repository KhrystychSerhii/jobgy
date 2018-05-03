
import { normalize, schema } from 'normalizr'
import { fetchUnreadNotificationsAmount, fetchAllNotifications, deleteNotification } from '../Services/Api'

export const getUnreadNotificationsAmount = () => fetchUnreadNotificationsAmount().then((response) => {
  // console.log('unread notification amount', response);
  if (response.ok) {
    return response.data.data;
  } else {
    return null;
  }
});

export const getAllNotifications = () => fetchAllNotifications().then((response) => {
  if (response.ok) {
    return response.data.data;
  } else {
    return null;
  }
});

export const removeNotification = (id) => deleteNotification(id).then((response) => {
  console.log('response', response);
  return response.ok;
});
