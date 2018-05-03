import { StyleSheet, Dimensions, I18nManager } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  title: {
    color: Colors.white
  },
  wrapper: {
    backgroundColor: Colors.darkBlue,
    height: 50,
    flex: 0,
    alignItems: 'center',
    position: 'relative'
  },
  headerButton: {
    position: 'absolute',
    flex: 0,
    height: 50,
    minWidth: 40,
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
    resizeMode: 'center',
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
    minWidth: 18,
    maxWidth: 36,
    height: 18,
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
    height: 50,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width * 0.4,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  userImage: {
    borderRadius: 9,
    resizeMode: 'center',
    width: 35,
    height: 35,
    margin: 5
  },
  userName: {
    alignSelf: 'center',
    color: Colors.white
  }
})
