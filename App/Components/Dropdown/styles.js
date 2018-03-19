import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Fonts } from '../../Themes'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    paddingLeft: 4,
    paddingRight: 4,
    zIndex: 50,
    justifyContent: 'center',

  },
  header: {
    paddingTop: 10,
    paddingBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    ...Fonts.style.normal
  },
  dropdownItem: {
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownText: {
    ...Fonts.style.medium,
    color: Colors.black,
    fontWeight: '500',
  },
  dropdownButtonsWrapper: {
    borderTopWidth: 1,
    borderTopColor: Colors.grey,
    padding: 25
  },
  dropdownBtnLink: {
    ...Fonts.style.h3,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.link,
    color: Colors.link
  }
})
