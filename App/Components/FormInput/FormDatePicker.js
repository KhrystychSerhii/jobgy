import React from 'react'
import PropTypes from 'prop-types'
import {
  TextInput,
  TouchableWithoutFeedback,
  Text,
  View,
  DatePickerAndroid,
  DatePickerIOS,
  Platform,
} from 'react-native'
import WhiteBlock from '../WhiteBlock'

import styles from './styles'
import { getFormattedDate } from '../../Transforms/index'

class FormDatePicker extends React.Component {

  focusInput = () => {
    this.openDatepicker()
  }
  handleChange = (value) => {
    // remember that onChangeText will be Formik's setFieldValue
    this.props.onChange(this.props.name, value)
  }

  showAndroidDatepicker = () => {
    DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(),
    })
      .then(({action, year, month, day}) => {
        this.handleChange(getFormattedDate(new Date(year, month, day)))
      })
      .catch(({code, message}) => {
        console.warn('Cannot open date picker', message)
      })
  }

  openDatepicker = () => {
    if (Platform.OS === 'ios') {

    } else if (Platform.OS === 'android') {
      this.showAndroidDatepicker()
    }
  }

  render () {
    const {value, label, inputProps, labelProps, name, invalid} = this.props
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
      <WhiteBlock style={_style}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={this.focusInput}>
          <View style={[styles.touchable, {flexDirection: 'column', justifyContent: 'center'}]}>
            <Text style={[styles.label, {textAlign: 'center'}]} {...labelProps}>{label}</Text>
            <Text
              disabled
              underlineColorAndroid="transparent"
              style={[styles.input, {textAlign: 'center'}]}
              name={name}
              onChangeText={this.handleChange} {...inputProps}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
      </WhiteBlock>
    )
  }
}

FormDatePicker.propTypes = {
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

export default FormDatePicker
