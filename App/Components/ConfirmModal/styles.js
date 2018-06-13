import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  modalWrapper: {
    backgroundColor: Colors.darkTransparent
  },
  confirmModalWrapper: {
    position: 'relative',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  confirmModal: {
    backgroundColor: '#008fe1',
    padding: 20,
    marginHorizontal: 15,
  },
  confirmDescriptionWrapper: {
    marginBottom: 10,
  },
  confirmDescriptionText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  },
  buttonsWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: '35%'
  },
  confirmButton: {},
  dismissButton: {}
})
