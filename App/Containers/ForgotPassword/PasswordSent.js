import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text } from 'react-native'
import Yup from 'yup'

import FormInput from '../../Components/FormInput'
import I18n from '../../I18n'
import styles from './styles'
import TransparentButton from '../../Components/FormButton/TransparentButton';


class PasswordSent extends React.Component {
  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.subHeader}>
          {I18n.t('translation.newPassWasSentIfYouDidNotReceive', { locale: this.props.ln })}
        </Text>

        <View
          style={styles.buttonContainer}>
          <TransparentButton
            onPress={this.props.onBackPress}>
            <Text style={{textDecorationLine: 'underline', textDecorationStyle: 'solid', textDecorationColor: 'white'}}>
              {I18n.t('translation.backToLogin', { locale: this.props.ln })}
            </Text>
          </TransparentButton>
        </View>
      </View>
    );
  }
}

export default PasswordSent;
