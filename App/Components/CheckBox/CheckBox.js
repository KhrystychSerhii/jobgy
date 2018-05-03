import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import CheckMark from '../CheckMark'

import styles from './styles'
import { Colors } from '../../Themes'

class CheckBox extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.checkBox} onPress={this.props.onPress}>
        {
          this.props.checked &&
          <View style={{
            width: 12.7,
            height: 8.3,
            borderBottomWidth: 3,
            borderLeftWidth: 3,
            borderColor: Colors.black,
            transform: [{ rotate: '-45deg'}],
            top: 2.5,
            right: .25,
            alignSelf: 'center',
            alignItems: 'center'
          }} />
        }
      </TouchableOpacity>
    );
  }
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onPress: PropTypes.func
};

export default CheckBox;
