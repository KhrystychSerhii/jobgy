// Simple React Native specific changes

import '../I18n/I18n'
// dev
const baseUrl = 'https://jobgy.dias.team'
// prod
// const baseUrl = 'https://app.jobgy.co.il'
const apiUrl = baseUrl + '/api/v1'

const notificationsToken = '/api/v1/token';


// todo: узнать что это
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  baseUrl,
  apiUrl,
}
