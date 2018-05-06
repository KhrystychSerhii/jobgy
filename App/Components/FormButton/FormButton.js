import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight, Text, Image, View } from 'react-native'
import { Colors } from '../../Themes'

import styles from './styles'

class FormButton extends React.Component {
  static defaultProps = {
    backgroundColor: '#0069d9',
    disabledBackgroundColor: '#13326A'
  }

  render () {
    const {onPress, icon, children, style, textStyle, justifyContent = 'center', disabled, backgroundColor, disabledBackgroundColor} = this.props
    const disabledStyle = {
        backgroundColor: disabledBackgroundColor,
        borderColor: disabledBackgroundColor
      },
      enabledStyle = {
        backgroundColor: backgroundColor,
        borderColor: backgroundColor
      };

    return (
      <TouchableHighlight style={[styles.btn, style, disabled ? disabledStyle : enabledStyle ]} onPress={onPress} disabled={disabled}>
        <View style={[styles.btnInner, {justifyContent}]}>
          <Text style={[styles.txt, textStyle]} numberOfLines={1} ellipsizeMode='tail'>{children}</Text>
          {icon && <Image source={icon} style={{width: 20, height: 20}} resizeMode='contain' />}
        </View>
      </TouchableHighlight>
    )
  }
}

FormButton.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.any,
  style: PropTypes.any,
  textStyle: PropTypes.number,
  justifyContent: PropTypes.string,
  disabled: PropTypes.bool,
  disabledBackgroundColor: PropTypes.string,
  backgroundColor: PropTypes.string,
}

export default FormButton
