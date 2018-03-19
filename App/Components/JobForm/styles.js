import { StyleSheet, I18nManager } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  dropdownBarLeft: {width: '50%', [I18nManager.isRTL ? 'paddingLeft' : 'paddingRight']: 1},
  dropdownBarRight: {width: '50%', [I18nManager.isRTL ? 'paddingRight' : 'paddingLeft']: 1},
})
