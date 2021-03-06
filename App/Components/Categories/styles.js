import { StyleSheet, I18nManager } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes'
import { scale } from 'react-native-size-matters'
import { rightProp, leftProp } from '../../Transforms/index'

export default StyleSheet.create({
  titleWithImagesWrapper: {
    ...ApplicationStyles.titleWithImagesWrapper,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleImage: {
    position: 'absolute',
    // [leftProp()]: scale(25),
    right: scale(25),
    top: -scale(35),
    width: scale(40),
  },
})
