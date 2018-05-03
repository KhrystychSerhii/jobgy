import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native'
import { Colors, Fonts } from '../../Themes'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: Platform.OS === 'android' && I18nManager.isRTL ? 'row' : 'row-reverse',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flexWrap: 'wrap',
    alignItems: 'center'
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
    width: '50%',
    // lineHeight: Fonts.size.input + 6,
  },
  dateLabel: {
    color: Colors.black,
    ...Fonts.style.input,
    fontWeight: '500',
    width: '90%',
  }
})
