import React from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Text, View } from 'react-native'
import WhiteBlock from '../WhiteBlock'

import styles from './styles'

class FormBaseItem extends React.Component {
  render () {
    const {onFocus, label, labelProps, children, whiteBlockStyles} = this.props
    return (
      <View style={{height: 80}}>
        <WhiteBlock style={whiteBlockStyles}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={onFocus}>
            <View style={styles.touchable}>
              <Text style={styles.label} {...labelProps}>{label}</Text>
              {children}
            </View>
          </TouchableWithoutFeedback>
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
}

export default FormBaseItem
