import React from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import { TouchableNativeFeedback } from 'react-native'
import styles from './styles'

class GradientButton extends React.Component {
  render () {
    const {style, children, onPress} = this.props
    return (
      <TouchableNativeFeedback style={{flex: 1}} onPress={onPress}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.07)', 'rgba(0, 0, 0, 0)']} style={[styles.wrapper, style]}>
          {children}
        </LinearGradient>
      </TouchableNativeFeedback>
    )
  }
}

GradientButton.propTypes = {
  onPress: PropTypes.func,
}

export default GradientButton
