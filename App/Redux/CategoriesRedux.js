import { normalize, schema } from 'normalizr'
import { fetchCategories, fetchMyCategories, toggleNotificationCategory } from '../Services/Api'

export const getCategoriesList = () => fetchCategories().then((response) => {
  console.log(response);
  if (response.ok) {
    return response.data.data;
  } else {
    return null;
  }
});
// todo: переписать на редуксе
export const toggleCategories = (categoryId) => toggleNotificationCategory(categoryId).then((response) => {
  if (response.status) {
    return getCategoriesList();
  }
});
