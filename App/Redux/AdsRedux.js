import { normalize, schema } from 'normalizr'
import { fetchAds } from '../Services/Api'

export const getAdsList = (type) => fetchAds(type).then((response) => {
  if (response.ok) {
    return response.data.data;
  } else {
    return null;
  }
});
