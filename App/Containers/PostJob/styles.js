import { StyleSheet, I18nManager } from 'react-native'
import { Colors, ApplicationStyles, Fonts } from '../../Themes'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  titleImage: {
    position: 'absolute',
    right: scale(0),
    top: -scale(5),
    width: scale(80),
  },
  buttonWrapper: {
    width: '48%',
    height: 60,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  buttonTxt: {
    ...Fonts.style.h3,
    fontWeight: '500',
  },
  titleWithImagesWrapper: {
    ...ApplicationStyles.titleWithImagesWrapper
  },
  resultsTitleImage: {
    position: 'absolute',
    right: scale(3),
    bottom: 0,
    width: scale(65),
  },
  resultsTitleImageLeft: {
    position: 'absolute',
    left: scale(12),
    bottom: scale(15),
    width: scale(45),
  },
  outlineBtn: {
    ...ApplicationStyles.outlineButton,
    marginBottom: 10,
    borderWidth: 2
  },
  successImg: {
    width: 200,
  },
  successTitle: {
    ...Fonts.style.h2,
    color: Colors.white,
    marginBottom: 20,
    fontWeight: '400',
    textAlign: 'center'
  },
  successDetails: {
    ...Fonts.style.medium,
    color: Colors.white,
    fontWeight: '400',
    textAlign: 'center'
  },
})
