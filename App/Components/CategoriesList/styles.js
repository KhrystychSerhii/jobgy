import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

const {width, height} = Dimensions.get('window');
const itemWidth = (width - (Metrics.sidePadding * 2) - 30) / 3;

export default StyleSheet.create({
  buttonWrapper: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    width: itemWidth,
    margin: 5,
    height: itemWidth * 0.8,
  },
  itemInner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  selectedItemStyle: {backgroundColor: Colors.darkBlue},
  selectedItemText: {color: Colors.white},
  textWrapper: {
    // alignSelf: 'flex-end',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  itemText: {
    ...Fonts.style.h5,
    color: Colors.black,
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    width: itemWidth / 2.5,
    height: itemWidth / 2.5,
    resizeMode: 'contain',
  },

})
