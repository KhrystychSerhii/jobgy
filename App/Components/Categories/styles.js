import { StyleSheet, Dimensions } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  titleWithImagesWrapper: {
    ...ApplicationStyles.titleWithImagesWrapper,
    paddingLeft: 50,
    paddingRight: 50,
  },
  titleImage: {
    position: 'absolute',
    right: scale(25),
    top: -scale(5),
    width: scale(80),
  },
})
