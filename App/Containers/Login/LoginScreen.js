import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableHighlight } from 'react-native'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import get from 'lodash/get'
import { createStructuredSelector } from 'reselect'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import PageTitle from '../../Components/PageTitle/PageTitle'
import LoginForm from './LoginForm'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import { login } from '../../Redux/AuthRedux'
import httpClient from '../../Services/Http'
import { getCurrentUser, updateNotificationToken } from '../../Redux/UserRedux'
import {selectLanguage} from '../../Redux/I18nRedux';

class LoginScreen extends Component {
  handleLogin = async (credentials) => {
    const loginResponse = await this.props.login(credentials);
    const success = !!loginResponse.data.token;
    if (success) {
      const setTokenResponse = await httpClient.setToken(loginResponse.data.token);
      const currentUser = await this.props.getCurrentUser();
      const updateNotificationTokenResponse = await this.props.updateNotificationToken();
      this.props.screenProps.rootNavigation.navigate('Home');
    } else {
      throw loginResponse.data;
    }
  };

  createAccountPress = () => {
    this.props.screenProps.rootNavigation.navigate('Register')
  };

  forgotPasswordPress = () => {
    console.log('this.props ==> ', this.props);
    this.props.screenProps.rootNavigation.navigate('ForgotPassword');
  };

  render () {
    const phone = get(this.props, 'screenProps.rootNavigation.state.params.phone', null)
    return (
      <ScreenContainer bgWithPicture>
        <PageTitle title={I18n.t('translation.login', { locale: this.props.ln })} />
        <LoginForm phone={phone} onSubmit={this.handleLogin} onCreateAccountPress={this.createAccountPress} onForgotPasswordPress={this.forgotPasswordPress} ln={this.props.ln} />
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
    getCurrentUser: (data) => dispatch(getCurrentUser(data)),
    updateNotificationToken: () => dispatch(updateNotificationToken()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
