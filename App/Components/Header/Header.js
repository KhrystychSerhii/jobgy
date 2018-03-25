import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'


export const SidebarBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.sidemenuBtn}>
      <Image style={styles.sidemenuBtnImg} source={require('../../Images/sidebar-icon.png')} />
    </TouchableOpacity>
  )
}
export const BackBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.backBtn}>
      <Image style={styles.sidemenuBtnImg} source={require('../../Images/back-icon.png')} />
    </TouchableOpacity>
  )
}

const Header = () => (
  <View style={styles.wrapper}>
    <Text style={styles.title}></Text>
  </View>
)

export default Header
