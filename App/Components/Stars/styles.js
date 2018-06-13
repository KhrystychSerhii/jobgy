import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  starWrapper: {
    flex: 0,
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    paddingBottom: 10
  },
  star: {
    width: 20,
    height: 20,
    marginHorizontal: 5
  },
  activeStar: {
    opacity: 1
  },
  disabledStar: {
    opacity: .5
  }
})
