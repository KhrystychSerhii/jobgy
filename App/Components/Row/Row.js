import React from 'react'
import PropTypes from 'prop-types'
import { View, I18nManager } from 'react-native'

import styles from './styles'

class Row extends React.Component {
  static defaultProps = {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
  }

  render () {
    const {width, justifyContent, alignContent, children, flexDirection} = this.props
    const optionalStyles = {
      width, justifyContent, alignContent, flexDirection
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
  flexDirection: PropTypes.any
}

export default Row
