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
        this.setState({passwordSent: true});
      });
  };

  onBackPress = () => {
    console.log('this.props', this.props);
    this.props.screenProps.rootNavigation.navigate('Login');
  };

  render() {
    const { ln } = this.props;
    return (
      this.state.passwordSent ?
      <ScreenContainer>
        <PageTitle title={I18n.t('translation.passwordSent', { locale: ln })} />
        <PasswordSent onBackPress={this.onBackPress} ln={ln} />
      </ScreenContainer> :
      <ScreenContainer>
        <PageTitle title={I18n.t('translation.resetPassword', { locale: ln })} />
        <ForgotPasswordForm onSubmit={this.handleSubmit} onBackPress={this.onBackPress} ln={ln} />
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (data) => dispatch(forgotPassword(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);
