import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

class WhiteBlock extends React.Component {
  render () {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

WhiteBlock.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
}

export default WhiteBlock
