import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// Styles
import styles from './styles'
import GuestMenu from './GuestMenu'
import UserMenu from './UserMenu'
import { selectLanguagesList } from '../../Redux/SettingsRedux'
import { selectUserInfo } from '../../Redux/UserRedux'

class Sidebar extends Component {
  // static navigationOptions = {
  //   drawerLabel: 'sidebar',
  // };
  render () {
    const {languages, navigation, userInfo} = this.props
    return (
      <View style={styles.container}>
        {userInfo
          ? <UserMenu userInfo={userInfo} />
          : <GuestMenu languages={languages} navigate={navigation.navigate} />
        }
      </View>
    )
  }
}

Sidebar.propTypes = {
  languages: PropTypes.array, navigation: PropTypes.any, userInfo: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  languages: selectLanguagesList(),
  userInfo: selectUserInfo(),
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
