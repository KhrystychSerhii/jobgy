import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    position: 'relative',
  },
  titleWrapper: {
    paddingTop: 50,
  },
  title: {
    ...Fonts.style.h1,
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.style.h2,
    color: Colors.white,
    textAlign: 'center',
  },
  homeBtn: {
    backgroundColor: Colors.white,
    width: scale(120),
    height: scale(120),
    // boxShadow: '2 -7 10 rgba(0, 0, 0)',
    borderRadius: 14,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.16,
    shadowRadius: 5,
  },
  homeBtnImage: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: 'contain',
    position: 'relative',
    top: -30
  }
})
