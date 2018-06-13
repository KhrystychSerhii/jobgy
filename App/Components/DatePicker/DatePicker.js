import React from 'react';
import { Platform, View, TouchableOpacity, Text, DatePickerAndroid, DatePickerIOS, } from 'react-native';
import PropTypes from 'prop-types'

import WhiteBlock from '../WhiteBlock';

import styles from './styles';
import { getFormattedDate } from '../../Transforms/index'

class DatePicker extends React.Component {

  handleChange = (value) => {
    // remember that onChangeText will be Formik's setFieldValue
    this.props.onSelect(value)
  }

  showAndroidDatepicker = () => {
    DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(),
    })
      .then(({action, year, month, day}) => {
        const { makeTouched } = this.props;
        makeTouched && makeTouched();

        if (year && month && day) {
          this.handleChange(getFormattedDate(new Date(year, month, day)));
        }
      })
      .catch(({code, message}) => {
        console.warn('Cannot open date picker', message)
      })
  };

  openDatepicker = () => {
    if (Platform.OS === 'ios') {

    } else if (Platform.OS === 'android') {
      this.showAndroidDatepicker()
    }
  };


  render() {
    const { invalid, value, label, disabled, required } = this.props;

    return (
      <WhiteBlock
        style={[styles.wrapper, (!!value && !invalid) ? styles.withValueWrapper : disabled ? styles.disabledWrapper : styles.enabledWrapper, invalid ? styles.invalidWrapper : null]}
      >
        <TouchableOpacity
          activeOpacity={disabled ? 1 : .2}
          onPress={!disabled ? this.openDatepicker : null}
          style={styles.selectButton}
        >
          <View
            style={styles.textWrapper}>

            <View
              style={[{flex: 0, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center'}]}
            >
              {
                required &&
                <Text style={[styles.requiredSymbol, {alignSelf: 'center', alignItems: 'center'}]}>*</Text>
              }
              <Text style={[styles.labelText, !!value ? {color: '#bbb'} : {color: '#303030'}]}>
                {label}
              </Text>
            </View>

            {
              !!value ?
                <Text style={[styles.valueText]}>{value}</Text> : null
            }
          </View>

        </TouchableOpacity>
      </WhiteBlock>
    );
  }
}

DatePicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  makeTouched: PropTypes.func
};

export default DatePicker;
