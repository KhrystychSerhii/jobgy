import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
// Add Actions - replace 'Your' with whatever your reducer is called :)

// Styles
import PageTitle from '../../Components/PageTitle/PageTitle';
import RegisterForm from './RegisterForm';
import I18n from '../../I18n';
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import { selectInterests, selectInterestsObj } from '../../Redux/SettingsRedux'
import { register } from '../../Redux/AuthRedux'
import {selectLanguage} from "../../Redux/I18nRedux";

class RegisterScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Register',
  };

  handleSubmit = (values) => {
    this.props.register({...values, interest_id: parseInt(values.interest_id)})
      .then((response) => {
      console.log('response => ', response);
        if (response.ok) {
          this.props.screenProps.rootNavigation.navigate('Login', {phone: values.phone})
        }
      })
  };
  render () {
    return (
      <ScreenContainer>
        <PageTitle title={I18n.t('translation.createAccount', {locale: this.props.ln})} />
        <RegisterForm interestsobj={this.props.interestsobj} interests={this.props.interests} onSubmit={this.handleSubmit} ln={this.props.ln} />
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests(),
  interestsobj: selectInterestsObj(),
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => dispatch(register(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
