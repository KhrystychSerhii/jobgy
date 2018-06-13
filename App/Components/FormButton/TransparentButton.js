import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import { Colors } from '../../Themes';

import styles from './styles'

class TransparentButton extends React.Component {
  static defaultProps = {
    backgroundColor: Colors.transparent,
  };

  // Private

  render () {
    const {onPress, icon, children, style, textStyle, justifyContent = 'center', disabled, backgroundColor} = this.props;

    return (
      <TouchableOpacity style={[styles.btn, style, {backgroundColor}, {borderColor: Colors.white, borderWidth: 2}]} onPress={ !disabled ? onPress : null } activeOpacity={disabled ? 1 : .5}>
        <View style={[styles.btnInner, {justifyContent}, {position: 'relative'}]}>
          <Text style={[styles.txt, textStyle]} numberOfLines={1} ellipsizeMode='tail'>{children}</Text>
          {icon && <Image source={icon} style={{width: 20, height: 20, position: 'absolute', right: 0}} resizeMode='contain' />}
        </View>
      </TouchableOpacity>
    )
  }
}

TransparentButton.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.any,
  style: PropTypes.any,
  textStyle: PropTypes.number,
  justifyContent: PropTypes.string,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string, // hex only
};

export default TransparentButton
