import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

import { Images } from '../../Themes';

import WhiteBlock from '../../Components/WhiteBlock';

import styles from './styles';

class FormTextArea extends React.Component {

  static defaultProps = {
    onBlur: () => null
  };

  state = {
    focused: false
  };

  focusInput = () => {
    this.setState({focused: !this.state.focused});
  };

  render() {
    const { onChange, onBlur, disabled, required, placeholder, value, invalid, keyboardType } = this.props;
    return (
      <WhiteBlock style={[styles.inputWrapper, (!!value && !invalid) ? styles.withValueWrapper : disabled ? styles.disabledWrapper : styles.enabledWrapper, invalid ? styles.invalidWrapper : null]}>
        <TouchableOpacity style={styles.button} onPress={!disabled ? this.focusInput : null}>
          <View style={styles.textWrapper}>
            <View
              style={[{flex: 0, flexDirection: 'row', flexWrap: 'nowrap'}, (this.state.focused || !!value) ? {justifyContent: 'flex-end'} : {justifyContent: 'center'} ]}
            >
              {
                required &&
                <Text style={[styles.requiredSymbol, {alignSelf: 'center', alignItems: 'center'}]}>*</Text>
              }
              <Text style={[styles.labelText, (!!value) ? {textAlign: 'right', color: '#bbb'} : {textAlign: 'center', color: '#303030'}]}>
                {placeholder}
              </Text>
            </View>
            {
              (this.state.focused || !!value) ?
                <TextInput
                  onBlur={() => { this.focusInput(); onBlur(); }}
                  autoFocus={this.state.focused}
                  underlineColorAndroid='transparent'
                  keyboardType={keyboardType}
                  style={[styles.textArea]}
                  onChangeText={onChange}
                  value={value}
                /> : null
            }
          </View>
          {
            !invalid && !!value ?
              <Image
                style={styles.validCheckmark}
                resizeMode={'contain'}
                source={Images.successCheckIcon}
              /> : null
          }
        </TouchableOpacity>
      </WhiteBlock>
    )
  }
}

FormTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  invalue: PropTypes.any,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password']),
};

export default FormTextArea;
