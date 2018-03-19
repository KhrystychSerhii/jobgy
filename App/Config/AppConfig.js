// Simple React Native specific changes

import '../I18n/I18n'

const baseUrl = 'https://jobgy.dias.team'
const apiUrl = baseUrl + '/api/v1'

export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  baseUrl,
  apiUrl,
}
