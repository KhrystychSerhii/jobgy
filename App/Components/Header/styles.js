import { StyleSheet, Dimensions, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors } from '../../Themes'


export default StyleSheet.create({
  title: {
    color: Colors.white
  },
  wrapper: {
    backgroundColor: Colors.darkBlue,
    height: scale(50),
    flex: 0,
    alignItems: 'center',
    position: 'relative'
  },
  headerButton: {
    position: 'absolute',
    flex: 0,
    height: scale(50),
    minWidth: scale(40),
    alignItems: 'center',
  },
  headerButtonInner: {
    marginTop: 'auto',
    marginBottom: 'auto',

  },
  // Hamburger menu button
  sidemenuBtn: {
    [I18nManager.isRTL ? 'right' : 'left']: 0,
  },
  sidemenuBtnImg: {
    resizeMode: 'contain',
    height: 20,
    minWidth: 20,
  },
  // Back button
  backBtn: {
    [I18nManager.isRTL ? 'left' : 'right']: 0
  },
  badge: {
    position: 'absolute',
    paddingTop: 1,
    paddingBottom: 2,
    backgroundColor: Colors.red,
    borderRadius: 9,
    minWidth: scale(18),
    maxWidth: scale(36),
    height: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    top: 3,
    [I18nManager.isRTL ? 'left' : 'right']: 3
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    paddingLeft: 2,
    paddingRight: 2,
  },
  bell: {
    [I18nManager.isRTL ? 'left' : 'right']: 40
  },
  userInfo: {
    position: 'absolute',
    [I18nManager.isRTL ? 'right' : 'left']: 40,
    flex: 0,
    height: scale(50),
    flexWrap: 'nowrap',
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width * 0.7,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  userImage: {
    position: 'absolute',
    [I18nManager.isRTL ? 'left' : 'right']: 0,
    top: 2,
    borderRadius: 35,
    resizeMode: 'center',
    width: 35,
    height: 35,
    margin: 5,
    overflow: 'hidden'
  },
  userName: {
    alignSelf: 'center',
    color: Colors.white,
    paddingRight: 45
  }
})
