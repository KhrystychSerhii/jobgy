import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'

import styles from './styles'

class Badge extends React.Component {
  static defaultProps = {
    backgroundColor: 'red',
    size: 18,
  };

  render() {
    const {children, onPress, top, left, right, backgroundColor, size} = this.props
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.badge,
          {top},
          (left || left === 0) ? {left} : null,
          (right || right === 0) ? {right} : null,
          {width: size, height: size},
          {backgroundColor}
        ]}>
        {children}
      </TouchableOpacity>
    )
  }
}

export default Badge
