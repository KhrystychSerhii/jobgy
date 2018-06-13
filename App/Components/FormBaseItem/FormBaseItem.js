import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import WhiteBlock from '../WhiteBlock'

import styles from './styles'
import Row from '../Row/Row'

class FormBaseItem extends React.Component {
  render () {
    const {onFocus, label, labelProps, children, whiteBlockStyles, disabled} = this.props
    return (
      <View style={{height: 80}}>
        <WhiteBlock style={whiteBlockStyles}>
          <TouchableOpacity style={{flex: 1}} onPress={onFocus} disabled={disabled} activeOpacity={disabled ? 1 : .2}>
            <Row justifyContent={'space-around'} styles={[styles.touchable, {flex: 1}]}>
              {children}
              <Text style={styles.label} {...labelProps} numberOfLines={1} ellipsizeMode='tail'>{label}</Text>
            </Row>
          </TouchableOpacity>
        </WhiteBlock>
      </View>
    )
  }
}

FormBaseItem.propTypes = {
  onFocus: PropTypes.func,
  label: PropTypes.string,
  labelProps: PropTypes.object,
  children: PropTypes.node,
  whiteBlockStyles: PropTypes.any,
  disabled: PropTypes.bool,
}

export default FormBaseItem
