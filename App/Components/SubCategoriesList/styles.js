import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from '../../Themes'

const {width, height} = Dimensions.get('window')
const imageWidth = 35;
const imageHeight = 35;
const itemWidth = (width - (Metrics.sidePadding * 2) - 30) / 2
export default StyleSheet.create({
  listWrapper: {
    width: '100%'
  },
  rowWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
},
  buttonWrapper: {
    width: itemWidth,
    height: 50,
    flex: 0,
    // aspectRatio: 2,
    margin: 5,
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  itemInner: {
    alignItems: 'center',
  },
  selectedItemStyle: {backgroundColor: Colors.darkBlue},
  selectedItemText: {color: Colors.white},
  imageContainer: {

  },
  image: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'contain',
  },
  textContainer: {
    maxWidth: itemWidth - imageWidth
  },
  itemText: {
    textAlign: 'center',
  },
  // image: {
  //   width: 50,
  //   height: 50,
  //   resizeMode: 'contain',
  // },
})
