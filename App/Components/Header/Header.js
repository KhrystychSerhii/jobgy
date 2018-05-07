import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import AppConfig from '../../Config/AppConfig'
import I18n from '../../I18n'

import { NavigationActions } from 'react-navigation'

import { selectUserInfo } from '../../Redux/UserRedux'
import { selectLanguage } from '../../Redux/I18nRedux';
import { getUnreadNotificationsAmount } from '../../Redux/NotificationRedux';

import { Images } from '../../Themes'
import styles from './styles'

export const SidebarBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.headerButton, styles.sidemenuBtn]}>
      <Image style={[styles.sidemenuBtnImg, styles.headerButtonInner]} source={require('../../Images/sidebar-icon.png')} />
    </TouchableOpacity>
  )
}
export const BackBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.headerButton, styles.backBtn]}>
      <Image style={[styles.sidemenuBtnImg, styles.headerButtonInner]} source={require('../../Images/back-icon.png')} />
    </TouchableOpacity>
  )
}
export const Bell = ({badgeValue = 0, onPress}) => {
  return (
    <TouchableOpacity style={[styles.headerButton, styles.bell]} onPress={onPress}>
      <Image style={[styles.sidemenuBtnImg, styles.headerButtonInner]} source={Images.bellIcon} />
      <View style={[styles.badge]}>
        <Text
          numberOfLines={1}
          ellipsizeMode='head'
          style={styles.badgeText}>
          {badgeValue}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export const UserName = ({userName, userImage, onPress, ln}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.userInfo]}>
      <View style={{alignSelf: 'center', flex: 0, flexDirection: 'row', flexWrap: 'nowrap'}}>
        {
          userImage ? <Image style={styles.userImage} source={{uri: AppConfig.baseUrl + userImage}} /> : null
        }
        <Text style={styles.userName} numberOfLines={1} ellipsizeMode='tail'>
          {I18n.t('translation.headerGreeting', {locale: ln, userName: userName})}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

let drawerRouteNames = {};
class Header extends React.Component {
  state = {
    notificationAmount: 0
  }

  drawerOpen() {
    this.props.drawerNavigation.navigate('DrawerOpen')
  }
  navigateToNotificationsScreen() {
    this.props.drawerNavigation.navigate('MyNotificationsScreen')
  }

  navigateToMainScreen(navigation, drawerNavigation) {
    if (drawerRouteNames[navigation.state.routeName]) {
      drawerNavigation.goBack()
    } else {
      const emptyStack = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      });
      navigation.dispatch(emptyStack);
    }
  }

  render() {
    const { drawerNavigation, navigation, userInfo } = this.props;

    drawerRouteNames[drawerNavigation.state.routeName] = true;
    // todo: удалить. заменить на Push Notifications
    // if (userInfo) {
    //   getUnreadNotificationsAmount().then(amount => {
    //     this.setState({notificationAmount: amount})
    //   })
    // }

    return (
      <View style={styles.wrapper}>
        <SidebarBtn onPress={this.drawerOpen.bind(this)} />
        {
          userInfo ? <UserName userName={userInfo.name} ln={this.props.ln} userImage={userInfo.img_path} onPress={() => {this.navigateToMainScreen(navigation, drawerNavigation)}} /> : null
        }
        {
          userInfo ? <Bell badgeValue={0} onPress={this.navigateToNotificationsScreen.bind(this)} /> : null
        }
        {
          navigation.state.routeName === 'Home' ? null :
          <BackBtn onPress={() => {
            if (drawerRouteNames[navigation.state.routeName]) {
              drawerNavigation.goBack()
            } else {
              navigation.goBack()
            }
          }} />
        }
      </View>
    )
  }
}

Header.propTypes = {
  drawerNavigation: PropTypes.any,
  navigation: PropTypes.any,
}

// export default Header

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
