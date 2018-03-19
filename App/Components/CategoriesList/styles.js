import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from '../../Themes'

const {width, height} = Dimensions.get('window')
const itemWidth = (width - (Metrics.sidePadding * 2) - 30) / 3
export default StyleSheet.create({
  buttonWrapper: {
    width: itemWidth,
    margin: 5,
    height: itemWidth * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInner: {
    alignItems: 'center',
  },
  selectedItemStyle: {backgroundColor: Colors.darkBlue},
  selectedItemText: {color: Colors.white},
  itemText: {
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
})
