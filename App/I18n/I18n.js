import I18n from 'react-native-i18n'

I18n.fallbacks = true

// English language is the main language for fall back:
I18n.translations = {
  en: require('./languages/en.json'),
  he: require('./languages/he.json'),
  ar: require('./languages/ar.json')
};
I18n.locale = 'en';

export default I18n
