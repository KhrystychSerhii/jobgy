import { StyleSheet, I18nManager } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'


export default StyleSheet.create({
  form: {flex: 1, width: '90%'},
  subHeader: {
    ...Fonts.style.h4,
    paddingLeft: '15%',
    paddingRight: '15%',
    fontWeight: '400',
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: Colors.white,
  }
})
