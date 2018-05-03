import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import Yup from 'yup'

import FormInput from '../../Components/FormInput'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton'


class PasswordSent extends React.Component {
  render() {
    // console.log('styles ==> ', styles);
    return (
      <View style={styles.form}>
        <Text style={styles.subHeader}>
          {I18n.t('translation.newPassWasSentIfYouDidNotReceive', { locale: this.props.ln })}
        </Text>
        <FormButton
          style={styles.backButton}
          onPress={this.props.onBackPress}
        >
          {I18n.t('translation.backToLogin', { locale: this.props.ln })}
        </FormButton>
      </View>
    );
  }
}

export default PasswordSent;
