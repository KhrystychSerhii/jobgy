import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import FCM from 'react-native-fcm'
import { startup } from '../Redux/StartupRedux'

// Styles
import styles from './Styles/RootContainerStyles'
import PushNotifications from '../Components/PushNotifications'

class RootContainer extends Component {
  state = {
    fcm_token: '',
  }

  componentDidMount () {
    this.props.startup()
    FCM.requestPermissions()
    FCM.getFCMToken().then(token => {
      this.setState({fcm_token: token})
      //update your fcm token on server.
    })
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <PushNotifications />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(startup()),
})
export default connect(null, mapDispatchToProps)(RootContainer)
