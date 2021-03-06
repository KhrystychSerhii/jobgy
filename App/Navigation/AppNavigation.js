import React from 'react'

import { View, TouchableOpacity, Image, Text } from 'react-native'


import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
import { I18nManager, Platform } from 'react-native'

import HomeScreen from '../Containers/Home'
import styles from './Styles/NavigationStyles'
import RegisterScreen from '../Containers/Register/RegisterScreen'
import ForgotPasswordScreen from '../Containers/ForgotPassword/ForgotPasswordScreen'
import Sidebar from '../Containers/Sidebar/Sidebar'
import Header, { BackBtn, SidebarBtn, Bell, UserName } from '../Components/Header/Header'
import LoginScreen from '../Containers/Login/LoginScreen'
import FindJobScreen from '../Containers/FindJob/FindJobScreen'
import SearchResultsScreen from '../Containers/FindJob/SearchResultsScreen'
import JobDetailsScreen from '../Containers/FindJob/JobDetailsScreen'
import PostJobScreen from '../Containers/PostJob/PostJobScreen'
import PostSubcategoriesScreen from '../Containers/PostJob/PostSubcategoriesScreen'
import FindSubcategoriesScreen from '../Containers/FindJob/FindSubcategoriesScreen'
import JobFormScreen from '../Containers/PostJob/JobFormScreen'
import PostSuccessScreen from '../Containers/PostJob/PostSuccessScreen'
import SubscriptionsScreen from '../Containers/Subscriptions/SubscriptionsScreen'
import ChooseCategoriesScreen from '../Containers/Subscriptions/ChooseCategoriesScreen'
import PaymentScreen from '../Containers/Subscriptions/PaymentScreen'
import SettingsScreen from '../Containers/Settings/SettingsScreen';
import MyCategoriesScreen from '../Containers/MyCategories/MyCategoriesScreen';
import CategoriesPaymentScreen from '../Containers/MyCategories/CategoriesPaymentScreen';
import MyAdsScreen from '../Containers/MyAds/MyAdsScreen';
import AdRatingScreen from '../Containers/MyAds/AdRatingScreen';
import NotificationsSettingsScreen from '../Containers/NotificationsSettings/NotificationsSettingsScreen';
import MyIncomingCallsScreen from '../Containers/MyIncomingCalls/MyIncomingCallsScreen';
import MyNotificationsScreen from '../Containers/MyNotifications/MyNotificationsScreen';
import WrappedFindCategories from '../Containers/FindJob/WrappedFindCategories';
import WrappedPostCategories from '../Containers/PostJob/WrappedPostCategories';
import AllBusinessCategoriesScreen from '../Containers/AllBusiness/AllBusinessCategoriesScreen';
import BusinessResults from '../Containers/AllBusiness/BusinessResults';
import PremiumBusinessResults from '../Containers/AllBusiness/PremiumBusinessResults';
import WrappedBusinessCategories from '../Containers/AllBusiness/WrappedBusinessCategories';

const stackOptions = {
  navigationOptions: ({screenProps: {drawerNavigation}, navigation}) => {
    return {
      header: <Header drawerNavigation={drawerNavigation} navigation={navigation} />
    }
  },
}

const HomeNav = StackNavigator({
  Home: {screen: HomeScreen},
  Find: {screen: FindJobScreen},
  Results: {screen: SearchResultsScreen},
  Details: {screen: JobDetailsScreen},
  Post: {screen: PostJobScreen},
  PostSubcategories: {screen: PostSubcategoriesScreen},
  FindSubcategories: {screen: FindSubcategoriesScreen},
  WrappedFindCategories: {screen: WrappedFindCategories},
  WrappedPostCategories: {screen: WrappedPostCategories},
  JobForm: {screen: JobFormScreen},
  PostSuccess: {screen: PostSuccessScreen},
  AllBusinessCategories: {screen: AllBusinessCategoriesScreen},
  BusinessResults: {screen: BusinessResults},
  PremiumBusinessResults: {screen: PremiumBusinessResults},
  WrappedBusinessCategories: {screen: WrappedBusinessCategories},
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
    screen: ({screenProps, navigation}) => <LoginScreen screenProps={{rootNavigation: screenProps.drawerNavigation, navigation}} />,
  },
}, {
  ...stackOptions,
  initialRouteName: 'Login',
})

const ForgotPasswordNav = StackNavigator({
  ForgotPassword: {
    screen: ({screenProps, navigation}) => <ForgotPasswordScreen screenProps={{rootNavigation: screenProps.drawerNavigation, navigation}} />
  }
}, {
  ...stackOptions,
  initialRouteName: 'ForgotPassword',
});

const SubscriptionsNav = StackNavigator({
  Subscriptions: {screen: SubscriptionsScreen},
  ChooseCategories: {screen: ChooseCategoriesScreen},
  Payment: {screen: PaymentScreen},
}, {
  ...stackOptions,
  initialRouteName: 'Subscriptions',
});

const SettingsNav = StackNavigator({
  Settings: {screen: SettingsScreen}
}, {
  ...stackOptions,
  initialRouteName: 'Settings',
})

const MyCategoriesNav = StackNavigator({
  MyCategories: {screen: MyCategoriesScreen},
  Payment: {screen: PaymentScreen}
}, {
  ...stackOptions,
  initialRouteName: 'MyCategories',
})

const MyAdsNav = StackNavigator({
  MyAds: {screen: MyAdsScreen},
  Details: {screen: JobDetailsScreen},
  Rating: {screen: AdRatingScreen}
}, {
  ...stackOptions,
  initialRouteName: 'MyAds',
})

const NotificationsSettingsScreenNav = StackNavigator({
  NotificationsSettings: {screen: NotificationsSettingsScreen}
}, {
  ...stackOptions,
  initialRouteName: 'NotificationsSettings'
})

const MyIncomingCallsScreenNav = StackNavigator({
  MyIncomingCallsScreen: {screen: MyIncomingCallsScreen}
}, {
  ...stackOptions,
  initialRouteName: 'MyIncomingCallsScreen'
})

const MyNotificationsScreenNav = StackNavigator({
  Details: {screen: JobDetailsScreen},
  Rating: {screen: AdRatingScreen},
  MyNotificationsScreen: {screen: MyNotificationsScreen}
}, {
  ...stackOptions,
  initialRouteName: 'MyNotificationsScreen'
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
  Settings: {
    screen: ({navigation}) => <SettingsNav screenProps={{drawerNavigation: navigation}} />
  },
  MyCategories: {
    screen: ({navigation}) => <MyCategoriesNav screenProps={{drawerNavigation: navigation}} />
  },
  MyAds: {
    screen: ({navigation}) => <MyAdsNav screenProps={{drawerNavigation: navigation}} />
  },
  NotificationsSettings: {
    screen: ({navigation}) => <NotificationsSettingsScreenNav screenProps={{drawerNavigation: navigation}} />
  },
  MyIncomingCallsScreen: {
    screen: ({navigation}) => <MyIncomingCallsScreenNav screenProps={{drawerNavigation: navigation}} />
  },
  MyNotificationsScreen: {
    screen: ({navigation}) => <MyNotificationsScreenNav screenProps={{drawerNavigation: navigation}} />
  },
  ForgotPassword: {
    screen: ({navigation}) => <ForgotPasswordNav screenProps={{drawerNavigation: navigation}} />
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
