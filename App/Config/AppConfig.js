// Simple React Native specific changes

import '../I18n/I18n'

const baseUrl = 'https://jobgy.dias.team'; // dev
// const baseUrl = 'https://app.jobgy.co.il'; // prod
const apiUrl = baseUrl + '/api/v1';
const video = 'https://www.youtube.com/embed/_NXPRoC3mTg';
const termsLink = 'http://jobgy.co.il/terms.pdf';

// todo: узнать что это
export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true,
  baseUrl,
  apiUrl,
  video,
  termsLink,
}
