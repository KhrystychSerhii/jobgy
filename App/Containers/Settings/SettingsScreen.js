import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import { createStructuredSelector } from 'reselect'

import { selectUserInfo, updateUser } from '../../Redux/UserRedux'
import { selectInterests } from '../../Redux/SettingsRedux'
import { selectLanguage } from '../../Redux/I18nRedux'

import I18n from '../../I18n'
import SettingsForm from './SettingsForm';

class SettingsScreen extends React.Component {

  render() {
    return (
        <ScreenContainer>
          <PageTitle title={I18n.t('translation.accountInfo', {locale: this.props.ln})} />
          <SettingsForm userInfo={this.props.userInfo} ln={this.props.ln} interests={this.props.interests} onSubmit={this.props.updateUser} />
        </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo(),
  interests: selectInterests(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => dispatch(updateUser(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
