import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';

import { forgotPassword } from '../../Redux/AuthRedux';

import I18n from '../../I18n'
import ForgotPasswordForm from './ForgotPasswordForm';
import PasswordSent from './PasswordSent';
import { selectLanguage } from '../../Redux/I18nRedux';

class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'ForgotPassword',
  };

  state = {
    passwordSent: false
  };

  handleSubmit = (data) => {
    this.props.forgotPassword(data)
      .then((response) => {
        // console.log('response', response);
        this.setState({passwordSent: true});
      });
  };

  onBackPress = () => {
    this.props.screenProps.navigation.goBack();
  };

  render() {
    return (
      this.state.passwordSent ?
      <ScreenContainer>
        <PageTitle title={I18n.t('translation.passwordSent', { locale: this.props.ln })} />
        <PasswordSent onBackPress={this.onBackPress} ln={this.props.ln} />
      </ScreenContainer> :
      <ScreenContainer>
        <PageTitle title={I18n.t('translation.resetPassword', { locale: this.props.ln })} />
        <ForgotPasswordForm onSubmit={this.handleSubmit} onBackPress={this.onBackPress} />
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (data) => dispatch(forgotPassword(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
