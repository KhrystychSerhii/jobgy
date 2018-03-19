import { StyleSheet, I18nManager } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  row: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
})
