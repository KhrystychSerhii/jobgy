import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native'
import { Colors, Fonts } from '../../Themes'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: Platform.OS === 'Android' && I18nManager.isRTL ? 'row-reverse' : 'row',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    flexGrow: 2,
    flex: 1,
    padding: 0,
    color: Colors.black,
    ...Fonts.style.input,
  },
  label: {
    color: Colors.black,
    ...Fonts.style.input,
    fontWeight: '500',
    // lineHeight: Fonts.size.input + 6,
  },
  value: {
    ...Fonts.style.h4,
    alignItems: 'flex-start',
    textAlign: 'left',
    fontWeight: '500',
    lineHeight: 30,
  }
})
