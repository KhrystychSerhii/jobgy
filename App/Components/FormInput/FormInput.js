import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, TouchableWithoutFeedback, Text, View } from 'react-native'
import WhiteBlock from '../WhiteBlock'

import styles from './styles'

class FormInput extends React.Component {
  getInput = (e) => {
    this.inputRef = e
  }

  focusInput = () => {
    if (this.props.readOnly) {
      this.props.onPress(this.props.name)
      return
    }
    if (!this.inputRef.isFocused()) {
      this.inputRef.focus()
    }
  }
  handleChange = (value) => {
    // remember that onChangeText will be Formik's setFieldValue
    this.props.onChange(this.props.name, value)
  }

  render () {
    const {value, label, inputProps, labelProps, keyboardType, name, invalid, readOnly} = this.props
    let _style = {}
    if (invalid) {
      _style = {borderWidth: 1, borderColor: '#f00'}
    }
    if (String(value).length === 0) {
      _style = {
        ..._style,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }
    }

    return (
      <WhiteBlock style={[_style, {marginBottom: 17}]}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={this.focusInput}>
          <View style={styles.touchable}>
            <Text style={styles.label} {...labelProps}>{label}</Text>
            <TextInput
              disabled={readOnly}
              underlineColorAndroid="transparent"
              ref={this.getInput}
              style={styles.input}
              keyboardType={keyboardType}
              name={name}
              value={value}
              onChangeText={this.handleChange} {...inputProps} />
          </View>
        </TouchableWithoutFeedback>
      </WhiteBlock>
    )
  }
}

FormInput.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  invalid: PropTypes.bool,
  readOnly: PropTypes.bool,
  inputProps: PropTypes.object,
  labelProps: PropTypes.object,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password']),
}

export default FormInput
