import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

class TextButton extends React.Component {

  render() {
    const {text, icon} = this.props;

    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.textButton]}>
        <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{text}</Text>
        {
          icon ? this.props.icon : null
        }
      </TouchableOpacity>
    )
  }
}

export default TextButton
