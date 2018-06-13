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
    paddingHorizontal: 35,
    paddingTop: 35,
    paddingBottom: 0
  },
  topInfoText: {
    ...Fonts.style.h23Bold,
    color: Colors.white,
    marginBottom: 5
  },
  introductionTextWrapper: {
    marginTop: 15,
    marginBottom: 40,
  },
  introductionText: {
    ...Fonts.style.h5Bold,
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
  callCenterWrapper: {
    paddingHorizontal: 15,
    paddingTop: 5
  },
  callCenterText: {
    fontWeight: '200',
    color: '#fff',
    textAlign: 'left'
  },
  loggedOutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  dashedLine: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  registerButtonWrapper: {

  },
  loggedOutFooter: {

  },
  languageSelectorWrapper: {

  },
  languageSelectorTitle: {
    ...Fonts.style.h3Bold,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 10
  },
  languagesWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  languageSelectButton: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5
  },
  selectedLanguageSelectButton: {
    backgroundColor: Colors.white
  },
  languageSelectButtonText: {
    ...Fonts.style.h4Bold,
    textAlign: 'center',
    textDecorationLine: 'underline',

  },
  selectedLanguageButtonText: {
    textShadowColor: '#2173d0',
    color: '#2173d0'
  },
  unselectedLanguageButtonText: {
    textShadowColor: Colors.white,
    color: Colors.white
  }

})
