import { StyleSheet, I18nManager } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  modalContentWrapper: {
    flex: 1,
    padding: 10,
  },
  modalContent: {
    position: 'relative',
    flex: 1,
  },
  closeBtnStyles: {
    position: 'absolute',
    top: -20,
    [I18nManager.isRTL ? 'left' : 'right']: -4,
    backgroundColor: Colors.white,
    borderRadius: 30,
    zIndex: 10,
    width: 30,
    height: 30,
    alignItems: 'center'
  },
})
