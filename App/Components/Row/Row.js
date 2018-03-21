import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

class Row extends React.Component {
  static defaultProps = {
    justifyContent: 'center',
    alignContent: 'center',
  }

  render () {
    const {width, justifyContent, alignContent, children} = this.props
    const optionalStyles = {
      width, justifyContent, alignContent
    }
    return (
      <View style={[styles.row, optionalStyles, this.props.styles]}>{children}</View>
    )
  }
}

Row.propTypes = {
  width: PropTypes.any,
  justifyContent: PropTypes.string,
  alignContent: PropTypes.string,
  children: PropTypes.node,
  styles: PropTypes.any,
}

export default Row
