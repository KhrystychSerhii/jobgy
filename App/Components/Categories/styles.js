import { StyleSheet, I18nManager } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes'
import { scale } from 'react-native-size-matters'
import { rightProp, leftProp } from '../../Transforms/index'

export default StyleSheet.create({
  titleWithImagesWrapper: {
    ...ApplicationStyles.titleWithImagesWrapper,
    paddingLeft: 50,
    paddingRight: 50,
  },
  titleImage: {
    position: 'absolute',
    [rightProp()]: scale(25),
    top: -scale(15),
    width: scale(60),
  },
})
