import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { I18nManager, Platform } from 'react-native'

import HomeScreen from '../Containers/Home'
import styles from './Styles/NavigationStyles'
import RegisterScreen from '../Containers/Register/RegisterScreen'
import Sidebar from '../Containers/Sidebar/Sidebar'
import Header, { BackBtn, SidebarBtn } from '../Components/Header/Header'
import LoginScreen from '../Containers/Login/LoginScreen'
import FindJobScreen from '../Containers/FindJob/FindJobScreen'
import SearchResultsScreen from '../Containers/FindJob/SearchResultsScreen'
import JobDetailsScreen from '../Containers/FindJob/JobDetailsScreen'
import PostJobScreen from '../Containers/PostJob/PostJobScreen'
import SubcategoriesScreen from '../Containers/PostJob/SubcategoriesScreen'
import JobFormScreen from '../Containers/PostJob/JobFormScreen'
import PostSuccessScreen from '../Containers/PostJob/PostSuccessScreen'
import SubscriptionsScreen from '../Containers/Subscriptions/SubscriptionsScreen'
import PaymentScreen from '../Containers/Subscriptions/PaymentScreen'

const stackOptions = {
  navigationOptions: ({screenProps: {drawerNavigation}, navigation}) => {
    const isRtl = Platform.OS === 'android' && I18nManager.isRTL
    const headerSide = isRtl ? 'headerRight' : 'headerLeft'
    const backbtnSide = !isRtl ? 'headerRight' : 'headerLeft'

    const options = {
      headerStyle: styles.header,
      [headerSide]: <SidebarBtn onPress={() => {drawerNavigation.navigate('DrawerOpen')}} />,

      headerTitle: <Header drawerNavigation={drawerNavigation} />,
    }
    if (drawerNavigation.state.routeName === 'Register' || drawerNavigation.state.routeName === 'Login') {
      options[backbtnSide] = (<BackBtn onPress={() => {drawerNavigation.goBack()}} />)
    }
    return options
  },
}

const HomeNav = StackNavigator({
  Home: {screen: HomeScreen},
  Find: {screen: FindJobScreen},
  Results: {screen: SearchResultsScreen},
  Details: {screen: JobDetailsScreen},
  Post: {screen: PostJobScreen},
  Subcategories: {screen: SubcategoriesScreen},
  JobForm: {screen: JobFormScreen},
  PostSuccess: {screen: PostSuccessScreen},
}, {
  ...stackOptions,
  initialRouteName: 'Home',
})

const RegisterNav = StackNavigator({
  Register: {
    // screen: RegisterScreen,
    screen: ({screenProps}) => <RegisterScreen screenProps={{rootNavigation: screenProps.drawerNavigation}} />,
  },
}, {
  ...stackOptions,
  initialRouteName: 'Register',
})
const LoginNav = StackNavigator({
  Login: {
    screen: ({screenProps}) => <LoginScreen screenProps={{rootNavigation: screenProps.drawerNavigation}} />,
  },
}, {
  ...stackOptions,
  initialRouteName: 'Login',
})

const SubscriptionsNav = StackNavigator({
  Subscriptions: {screen: SubscriptionsScreen},
  Payment: {screen: PaymentScreen},
}, {
  ...stackOptions,
  initialRouteName: 'Home',
})
// Manifest of possible screens
const DrawerNav = DrawerNavigator({
  Home: {
    screen: ({navigation}) => <HomeNav screenProps={{drawerNavigation: navigation}} />,
  },
  Register: {
    screen: ({navigation}) => <RegisterNav screenProps={{drawerNavigation: navigation}} />,
  },
  Login: {
    screen: ({navigation}) => <LoginNav screenProps={{drawerNavigation: navigation}} />,
  },
  Subscriptions: {
    screen: ({navigation}) => <SubscriptionsNav screenProps={{drawerNavigation: navigation}} />,
  },
}, {
  initialRouteName: 'Home',
  contentComponent: Sidebar,
  drawerPosition: Platform.OS === 'ios' && I18nManager.isRTL ? 'right' : 'left',
})
// const PrimaryNav = StackNavigator({
//   HomeScreen: {screen: DrawerNav},
// }, {
//   // Default config for all screens
//   headerMode: 'none',
//   initialRouteName: 'HomeScreen',
//
// })

export default DrawerNav
