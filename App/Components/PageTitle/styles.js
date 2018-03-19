import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Colors } from '../../Themes'
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  titleWrapper: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
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
    marginBottom: 20,
    textAlign: 'center',
  },
  border: {
    // maxWidth: width * 90 / 100
    maxWidth: '80%',
    height: 5
  }
})
