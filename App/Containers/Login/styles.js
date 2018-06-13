import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  form: {flex: 1, width: '90%'},
  textButtonIcon: {width: 20, height: 20, borderRadius: 25/2, backgroundColor: 'green', marginLeft: 5, marginRight: 5, flex: 0, alignSelf: 'center', alignItems: 'center'},
  textButtonIconText: {color: 'white', marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 15, fontWeight: '900', paddingBottom: 2}
})
