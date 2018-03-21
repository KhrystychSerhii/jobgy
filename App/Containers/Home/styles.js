import { StyleSheet, I18nManager } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    ...ApplicationStyles.screen.container,
    position: 'relative',
    // justifyContent: 'center'
  },
  contentWrapper: {
    width: '80%',
  },
  btnRow: {
    marginBottom: 35,
  },
  titleWrapper: {
    paddingTop: 50,
  },
  findBtn: {
    [I18nManager.isRTL ? 'left' : 'right']: 23,
  },
  postBtn: {
    [I18nManager.isRTL ? 'left' : 'right']: 5,
  },
  title: {
    ...Fonts.style.h1,
    color: Colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.style.h3,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 25,
  },
  homeBtnBackground: {
    backgroundColor: Colors.white,
    width: scale(110),
    height: scale(110),
    // boxShadow: '2 -7 10 rgba(0, 0, 0)',
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.16,
    shadowRadius: 5,
  },
  homeBtnImage: {
    width: scale(95),
    height: scale(95),
    flex: 1,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  homeBtnInner: {
    width: scale(110),
    height: scale(140),
    paddingTop: 20,
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom:10
  },
  bottomBtnWrapper: {
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    // left: 0,
    height: 40,
    // flex: 1,
    alignItems: 'center',
  },
  bottomBtn: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
})
