import { StyleSheet, I18nManager } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  btn: {
    // marginBottom: 20,
    backgroundColor: Colors.darkBlue,
    paddingHorizontal: 10,
    paddingVertical: 20,
    // paddingTop: 7,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txt: {
    ...Fonts.style.normal,
    color: Colors.white,
    fontWeight: '500',
    includeFontPadding: false
  },
  btnInner: {
    width: '100%',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  }
})
