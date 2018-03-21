import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, View } from 'react-native'
import WhiteBlock from '../WhiteBlock'

import styles from './styles'
import Row from '../Row/Row'

class FormBaseItem extends React.Component {
  render () {
    const {onFocus, label, labelProps, children, whiteBlockStyles} = this.props
    return (
      <View style={{height: 80}}>
        <WhiteBlock style={whiteBlockStyles}>
          <TouchableOpacity style={{flex: 1}} onPress={onFocus}>
            <Row justifyContent={'space-between'} styles={[styles.touchable, {flex: 1}]}>
              {children}
              <Text style={styles.label} {...labelProps}>{label}</Text>
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
}

export default FormBaseItem
