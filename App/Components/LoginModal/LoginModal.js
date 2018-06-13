import React from 'react';
import PropsTypes from 'prop-types';
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image, I18nManager, Dimensions } from 'react-native'

import FormButton from '../FormButton/FormButton'
import styles from './styles'
import I18n from '../../I18n'
import { Colors } from '../../Themes'

import Badge from '../../Components/Badge';

import ModalWrapper from '../../Components/ModalWrapper'
import PageTitle from '../../Components/PageTitle'
import LoginForm from '../../Containers/Login/LoginForm';
import ScreenContainer from '../../Components/ScreenContainer';

const {width, height} = Dimensions.get('window');

class LoginModal extends React.Component {
  render() {
    const { onDismiss, modalVisible, onLogin, onCreateAccountPress, onForgotPasswordPress, ln } = this.props;
    return (
      <ModalWrapper
        onClose={onDismiss}
        visible={modalVisible}
        contentWrapperStyles={{padding: -10,}}
      >
          <ScreenContainer optionalScrollViewStyles={{paddingTop: 60}} bgWithPicture>
            <PageTitle title={I18n.t('translation.login', { locale: ln })} />
            <LoginForm onSubmit={onLogin} onCreateAccountPress={onCreateAccountPress} onForgotPasswordPress={onForgotPasswordPress} ln={ln} />
          </ScreenContainer>

      </ModalWrapper>
    )
  }
}

LoginModal.propTypes = {
  modalVisible: PropsTypes.bool,
  onLogin: PropsTypes.func,
  onDismiss: PropsTypes.func,
  onCreateAccountPress: PropsTypes.func,
  onForgotPasswordPress: PropsTypes.func
};

export default LoginModal;
