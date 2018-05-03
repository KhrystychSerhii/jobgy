import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

const {width, height} = Dimensions.get('window')
const itemWidth = (width - (Metrics.sidePadding * 2) - 30) / 3
export default StyleSheet.create({
  fullWidth: {
    width: width
  },
  listWrapper: {
    marginBottom: 20
  },
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
  tillTextContainer: {
    marginTop: -5
  },
  tillText: {
    ...Fonts.style.h5,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center'
  },
  button: {
    padding: 10,
    // paddingTop: 7,

    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteButton: {
    width: '70%',
    marginBottom: 20,
    backgroundColor: Colors.white,
  },
  blueButton: {
    width: '70%',
    marginBottom: 20,
    backgroundColor: Colors.darkBlue
  },
  transparentButton: {
    width: '40%',
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  redButton: {
    width: '40%',
    backgroundColor: Colors.red,
    borderColor: Colors.red,
    borderWidth: 2,
  },
  buttonText: {
    ...Fonts.style.h4,
    fontWeight: '600',
  },
  whiteButtonText: {
    color: Colors.white
  },
  transparentButtonText: {
    color: Colors.whiteTransparent
  },
  planButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    backgroundColor: Colors.white,
    marginHorizontal: 20
  },
  badge: {
    flex: 0,
    position: 'absolute',
    backgroundColor: Colors.red,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBadgeText: {
    lineHeight: 18,
    alignSelf: 'center',
    color: 'white',
    fontWeight: '400'
  },
  tryBadgeText: {
    lineHeight: 18,
    alignSelf: 'center',
    color: 'white',
    fontSize: 12
  }
})
