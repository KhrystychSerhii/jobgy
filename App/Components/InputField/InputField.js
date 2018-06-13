import React from 'react';
import PropTypes from 'prop-types'
import { View, TextInput, Text, TouchableWithoutFeedback } from 'react-native';

import WhiteBlock from '../WhiteBlock';

import styles from './styles'
import { Fonts, Colors } from '../../Themes';

class InputField extends React.Component {
  static defaultProps = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#fff',
    color: Colors.white,
    font: Fonts.style.h4Bold,
    focusInput: () => null,
    placeholder: '',
    keyboardType: 'default'
  };
  // backgroundColor: '#f5f5f5', borderColor: '#d9d9d9'

  render() {
    const { onChangeText, value, focusInput, placeholder, keyboardType, backgroundColor, borderColor, color, font } = this.props;

    return (
      <View style={styles.searchInputWrapper}>
        <WhiteBlock style={[{backgroundColor}, {borderColor}, {borderWidth: 1}]}>
          <TouchableWithoutFeedback style={{flex: 1}} onPress={focusInput}>
            <View style={{flex: 1, paddingHorizontal: 20}}>
              <TextInput
                underlineColorAndroid='transparent'
                placeholder={placeholder}
                keyboardType={keyboardType}
                style={[styles.searchInput, {color}, ...font]}
                placeholderStyle={[...font]}
                placeholderTextColor={color}
                onChangeText={onChangeText}
                value={value}
              />
            </View>
          </TouchableWithoutFeedback>
        </WhiteBlock>
      </View>
    )
  }
}
InputField.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  focusInput: PropTypes.func,
  placeholder: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  color: PropTypes.string,
  font: PropTypes.any,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password']),
};

export default InputField;
