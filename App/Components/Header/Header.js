import React from 'react'
import { View, TouchableHighlight, Image, Text } from 'react-native'
import styles from './styles'

export const SidebarBtn = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={styles.sidemenuBtn}>
      <Image style={styles.sidemenuBtnImg} source={require('../../Images/sidebar-icon.png')} />
    </TouchableHighlight>
  )
}

const Header = () => (
  <View style={styles.wrapper}>
    <Text style={styles.title}></Text>
  </View>
)

export default Header
