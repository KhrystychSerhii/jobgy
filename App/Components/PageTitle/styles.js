import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Colors } from '../../Themes'
const { width, height } = Dimensions.get('window');
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  titleWrapper: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  textWrapper: {
    position: 'relative',
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scale(55), // image height + top
  },
  textWrapperPadding: {
    paddingLeft: scale(50),
    paddingRight: scale(50),
  },
  leftImage: {
    position: 'absolute',
    left: 0,
    // top: scale(5),
    width: scale(50),
    height: scale(50),
  },
  rightImage: {
    position: 'absolute',
    right: 0,
    // top: scale(5),
    width: scale(50),
    height: scale(50),
  },
  textContainer: {
    width: '100%',
  },
  titleLarge: {
    ...Fonts.style.h1,
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    ...Fonts.style.h2,
    color: Colors.white,
    marginBottom: 5,
    textAlign: 'center',
  },
  border: {
    // maxWidth: width * 90 / 100
    maxWidth: '80%',
    height: 5
  }
})
