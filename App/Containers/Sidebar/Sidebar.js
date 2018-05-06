import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
// todo: узнать что такое reselect
import { createStructuredSelector } from 'reselect'

import { NavigationActions } from 'react-navigation'

// Styles
import styles from './styles'
import GuestMenu from './GuestMenu'
import UserMenu from './UserMenu'
import { selectLanguagesList } from '../../Redux/SettingsRedux'
import { selectUserInfo, clearCurrentUser } from '../../Redux/UserRedux'
import { logout } from '../../Redux/AuthRedux';
import { selectLanguage, updateCurrentLanguage } from '../../Redux/I18nRedux'


import I18n from 'react-native-i18n'

class Sidebar extends Component {
  // static navigationOptions = {
  //   drawerLabel: 'sidebar',
  // };
  render () {
    const {languages, navigation, userInfo, logout, clearCurrentUser, updateCurrentLanguage} = this.props

    const logoutAndClear = () => {
      // todo: подумать о том, как выйти из Home stackNavigation
      navigation.navigate('Home');
      logout();
      clearCurrentUser();
    }

    return (
      <View style={styles.container}>
        {
          userInfo
          ? <UserMenu
              languages={languages}
              ln={this.props.ln}
              changeLanguage={updateCurrentLanguage}
              userInfo={userInfo}
              logoutAndClear={logoutAndClear}
              navigate={navigation.navigate}
            />
          : <GuestMenu
              languages={languages}
              ln={this.props.ln}
              changeLanguage={updateCurrentLanguage}
              navigate={navigation.navigate}
            />
        }
      </View>
    )
  }
}

Sidebar.propTypes = {
  languages: PropTypes.any,
  navigation: PropTypes.any,
  userInfo: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  languages: selectLanguagesList(),
  ln: selectLanguage(),
  userInfo: selectUserInfo(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentUser: (data) => dispatch(clearCurrentUser()),
    logout: (data) => dispatch(logout()),
    updateCurrentLanguage: (ln) => dispatch(updateCurrentLanguage(ln))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
