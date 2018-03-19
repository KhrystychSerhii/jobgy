import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

class Button extends React.Component {
  render () {
    return (
      <TouchableHighlight style={[styles.btn, style]} onPress={onPress}>
        <View style={styles.btnInner}>
          <Text style={[styles.txt, textStyle]}>{children}</Text>
          {icon && <Image source={icon} style={{width: 20}} resizeMode='contain' />}
        </View>
      </TouchableHighlight>
    )
  }
}

export default Button
