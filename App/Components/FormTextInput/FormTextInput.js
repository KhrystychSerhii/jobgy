import React from 'react';
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';

import { Images } from '../../Themes';

import WhiteBlock from '../../Components/WhiteBlock';

import styles from './styles';

class FormTextInput extends React.Component {
  input;

  state = {
    focused: false
  };

  focusInput = () => {
    this.setState({focused: !this.state.focused});
  };

  render() {
    const { onChange, onBlur, disabled, invalid, required, placeholder, value, keyboardType, secureTextEntry } = this.props;
    return (
      <WhiteBlock style={[styles.textInputWrapper, (!!value && !invalid) ? styles.withValueWrapper : disabled ? styles.disabledWrapper : styles.enabledWrapper, invalid ? styles.invalidWrapper : null]}>
        <View style={[styles.input]} onPress={!disabled ? this.focusInput : null}>
          <TextInput
            ref={(ref) => { this.input = ref }}
            onBlur={onBlur}
            underlineColorAndroid='transparent'
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={[styles.textInput, {width: '70%'}]}
            onChangeText={onChange}
            value={value}
          />
          <View style={{width: '30%', paddingLeft: 20, flex: 0, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-end'}}>
            {
              required &&
              <Text style={styles.requiredSymbol}>*</Text>
            }
            <Text style={[styles.labelText, {textAlign: 'right'}, !!value ? {color: '#bbb'} : {color: '#303030'}]} ellipsizeMode={'tail'} numberOfLines={1}>{placeholder}</Text>
          </View>

        </View>
      </WhiteBlock>
    )
  }
}

FormTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  keyboardType: PropTypes.oneOf(['default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password']),
  secureTextEntry: PropTypes.bool
};

export default FormTextInput;
