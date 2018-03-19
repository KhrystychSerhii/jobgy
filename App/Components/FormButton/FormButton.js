import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, Image, View } from 'react-native'

import styles from './styles'

class FormButton extends React.Component {
  render () {
    const {onPress, icon, children, style, textStyle, justifyContent = 'center', disabled} = this.props
    return (
      <TouchableHighlight style={[styles.btn, style]} onPress={onPress} disabled={disabled}>
        <View style={[styles.btnInner, {justifyContent}]}>
          <Text style={[styles.txt, textStyle]}>{children}</Text>
          {icon && <Image source={icon} style={{width: 20, height: 20}} resizeMode='contain' />}
        </View>
      </TouchableHighlight>
    )
  }
}

FormButton.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.any,
  style: PropTypes.any,
  textStyle: PropTypes.number,
  justifyContent: PropTypes.string,
  disabled: PropTypes.bool,
}

export default FormButton
