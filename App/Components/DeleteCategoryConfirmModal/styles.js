import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  modalWrapper: {
    backgroundColor: Colors.darkTransparent
  },
  categoryModalWrapper: {
    position: 'relative',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  categoryModal: {
    backgroundColor: '#008fe1',
    padding: 20,
    marginHorizontal: 15
  },
  categoryWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalDescription: {
    color: Colors.white,
    marginBottom: 10,
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
    width: '35%',
  },
  confirmButton: {
    backgroundColor: Colors.red
  },
  cancelButton: {
    backgroundColor: Colors.darkBlue
  }
})
