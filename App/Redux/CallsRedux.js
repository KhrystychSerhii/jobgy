import { normalize, schema } from 'normalizr'
import { fetchIncomingCalls } from '../Services/Api'

// todo: переписать на редуксе
export const getIncomingCallsList = () => fetchIncomingCalls().then((response) => {
  console.log(response);
  if (response.ok) {
    return response.data.data;
  } else {
    return null;
  }
});

