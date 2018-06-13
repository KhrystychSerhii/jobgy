import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import { Colors } from '../../Themes';

import styles from './styles'

class FormButton extends React.Component {
  static defaultProps = {
    backgroundColor: '#13326a',
  };

  // Private
  _heToRGBA = (hex, disabled) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = disabled ? .5 : 1;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  render () {
    const {onPress, icon, children, style, textStyle, justifyContent = 'center', disabled} = this.props;

    const backgroundColor = this._heToRGBA(this.props.backgroundColor, disabled);

    return (
      <TouchableOpacity style={[styles.btn, style, {backgroundColor}, {borderColor: backgroundColor}]} onPress={ !disabled ? onPress : null } activeOpacity={disabled ? 1 : .5}>
        <View style={[styles.btnInner, {justifyContent}, {position: 'relative'}]}>
          <Text style={[styles.txt, textStyle]} numberOfLines={1} ellipsizeMode='tail'>{children}</Text>
          {icon && <Image source={icon} style={{width: 20, height: 20, position: 'absolute', right: 0}} resizeMode='contain' />}
        </View>
      </TouchableOpacity>
    )
  }
}

FormButton.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.any,
  style: PropTypes.any,
  textStyle: PropTypes.any,
  justifyContent: PropTypes.string,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string, // hex only
}

export default FormButton
