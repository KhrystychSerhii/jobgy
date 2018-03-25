import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  title: {
    color: Colors.white
  },
  wrapper: {
    width: Dimensions.get('window').width * 0.7,
  },
  sidemenuBtn: {},
  sidemenuBtnImg: {
    // width: 30,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 15,
  },
  backBtn: {
    paddingHorizontal: 20,
  }
})
