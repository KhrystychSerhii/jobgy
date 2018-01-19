import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableHighlight, Image } from 'react-native'

import Images from '../../../Themes/Images'
import styles from '../styles'

const HomeBtn = () => (
  <LinearGradient colors={['rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0)']} style={styles.homeBtn}>
    <TouchableHighlight style={{flex:1}}>
      <Image source={Images.dude1} style={styles.homeBtnImage} />
    </TouchableHighlight>
  </LinearGradient>
)

export default HomeBtn
