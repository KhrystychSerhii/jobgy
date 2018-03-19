import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../../Themes'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    width: scale(110),
    height: scale(140),
    // boxShadow: '2 -7 10 rgba(0, 0, 0)',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.16,
    shadowRadius: 5,
  }
})
