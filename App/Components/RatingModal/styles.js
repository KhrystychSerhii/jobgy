import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  modalWrapper: {
    backgroundColor: Colors.darkTransparent
  },
  ratingModalWrapper: {
    position: 'relative',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  ratingModal: {
    backgroundColor: '#008fe1',
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  ratingRow: {
    marginBottom: 20
  },
  ratingTitle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10
  }
})
