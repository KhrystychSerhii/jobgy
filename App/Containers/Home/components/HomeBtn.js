import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image, Text, View } from 'react-native'

import styles from '../styles'

const HomeBtn = ({image, imageStyles, children ,onPress}) => (
  <TouchableOpacity activeOpacity={0.7} style={styles.homeBtn} onPress={onPress}>
    <View style={styles.homeBtnInner}>
      <Image source={image} style={[styles.homeBtnImage, imageStyles]} />
      <LinearGradient colors={['rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0)']} style={styles.homeBtnBackground} />
      <Text>{children}</Text>
    </View>
  </TouchableOpacity>
)
HomeBtn.propTypes = {
  image: PropTypes.any,
  imageStyles: PropTypes.object,
}
export default HomeBtn
