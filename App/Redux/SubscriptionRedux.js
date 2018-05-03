import { normalize, schema } from 'normalizr'
import { fetchSubscriptions } from '../Services/Api'


export const getSubscriptions = (id) => fetchSubscriptions().then((response) => {
  if (response.ok) {
    return response.data.data;
  } else {
    return [];
  }
});
