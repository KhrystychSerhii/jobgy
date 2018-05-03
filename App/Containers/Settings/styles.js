import { StyleSheet, I18nManager } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modalContentWrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: 65,
  },
  modalContent: {
    backgroundColor: Colors.lightBlue,
    padding: 15,
  },
  modalHeaderText: {
    ...Fonts.style.normal,
    color: Colors.white,
    textAlignVertical: 'center',
  },
  subtitle: {
    ...Fonts.style.h5,
    color: Colors.white,
  },
  whiteText: {
    ...Fonts.style.medium,
    color: Colors.white,
    fontWeight: '500'
  }
})
