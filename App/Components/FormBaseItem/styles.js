import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native'
import { Colors, Fonts } from '../../Themes'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  touchable: {
    flex: 1,
    // flexDirection: Platform.OS === 'Android' && I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
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
    width: '48%',
    paddingLeft: 10,
    lineHeight: 30,
    // lineHeight: Fonts.size.input + 6,
  },
})
