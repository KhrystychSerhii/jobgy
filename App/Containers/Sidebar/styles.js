import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  whiteText: {
    color: Colors.white,
  },
  container: {
    backgroundColor: Colors.darkBlue,
    position: 'relative',
    flex: 1,
  },
  title: {
    ...Fonts.style.h2,
    color: Colors.white,
  },
  topInfoWrapper: {
    alignItems: 'center',
    padding: 35,
  },
  introductionTextWrapper: {
    marginTop: 15,
    marginBottom: 40,
  },
  introductionText: {
    ...Fonts.style.h4,
    color: Colors.white,
    textAlign: 'center',
  },
  greenBtnInner: {
    alignItems: 'center',
  },
  linearGradient: {
    borderRadius: 100,
    marginBottom: 15,
  },
  greenBtn: {
    backgroundColor: Colors.green,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  profileImage: {
    borderRadius: 160,
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 160,
    backgroundColor: '#133678',
    borderColor: 'rgba(231, 239, 255, 0.11)',
    borderWidth: 3,
  },
  greenBtnText: {
    ...Fonts.style.h2,
    fontFamily: Fonts.type.medium,
    color: Colors.white,
  },
  loginLinkWrapper: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    paddingBottom: 40,
    alignItems: 'center',
  },
  loginLink: {},
})
