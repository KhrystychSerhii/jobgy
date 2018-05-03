import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import styles from './styles'

class CheckMark extends React.Component {
  static defaultProps = {
    width: 12.7,
    height: 8.3,
    top: 2.5,
    left: 0,
    borderWidth: 3,
  }

  render() {
    return (
      <View style={[styles.checkMark, {
        borderColor: this.props.color,
        width: this.props.width,
        height: this.props.height,
        top: this.props.top,
        left: this.props.left,
        borderBottomWidth: this.props.borderWidth,
        borderLeftWidth: this.props.borderWidth,
      }]} />
    );
  }
}

CheckMark.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  borderWidth: PropTypes.number,
};

export default CheckMark;
