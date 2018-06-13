import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  itemWrapper: {
    backgroundColor: Colors.white,
    paddingLeft: I18nManager.isRTL ? 30 : 60,
    paddingRight: I18nManager.isRTL ? 60 : 30 ,
    position: 'relative',
    paddingTop: scale(15),
    paddingBottom: scale(15),
    marginBottom: 12,
    width: '100%'
  },
  infoWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 20,
    // borderColor: 'red',
    // borderWidth: 1
  },
  infoRow: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  valueWrapper: {
    marginLeft: 10
  },
  label: {
    textAlign: 'right',
    color: '#969696',
    ...Fonts.style.h4
  },
  info: {
    textAlign: 'right',
    color: '#303030',
    ...Fonts.style.h4
  },
  itemLabel: {
    color: Colors.black,
    opacity: 0.6,
    ...Fonts.style.h3,
  },
  itemValue: {
    ...Fonts.style.normal,
    color: Colors.black,
    fontWeight: '500',
    textAlign: I18nManager.isRTL ? 'left' : 'right'
  },
  arrowWrapper: {
    position: 'absolute',
    [I18nManager.isRTL ? 'right' : 'left']: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
})
