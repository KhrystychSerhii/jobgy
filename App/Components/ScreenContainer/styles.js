import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  contentContainer: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? null : 40
  }
})
