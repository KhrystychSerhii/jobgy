import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import AppConfig from '../../Config/AppConfig';
import Images from '../../Themes/Images';

import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import Badge from '../../Components/Badge';
// Modals
import NotificationItemModal from '../../Components/NotificationItemModal';

import { selectAllNotifications, removeNotification, getAllNotifications } from '../../Redux/NotificationRedux';

import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'
import {selectLanguage} from '../../Redux/I18nRedux';

const NotificationItem = ({notification, removeNotification, ln, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => { console.log('notification', notification); onPress(notification) }}
      style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: 'blue', paddingVertical: 10}}
    >
      <View
        style={{width: '15%'}}
      >
        <Badge
          onPress={() => { removeNotification(notification.id) }}
          size={30}
          backgroundColor={'#D7D7D7'}
        >
          <Text style={styles.removeBadgeText}>&times;</Text>
        </Badge>
      </View>
      <View
        style={{
         width: '65%', alignSelf: 'center'
        }}
      >
        <Text>
          {I18n.t(`translation.${notification.translation}`, notification.meta_info.merge({locale: ln}) )}
          {I18n.t(`translation.${notification.translation}`, notification.meta_info.merge({locale: ln}) )}
        </Text>
      </View>
      <View
        style={{width: '20%', alignSelf: 'center'}}
      >
        <Image resizeMode={'contain'} style={{width: 50, height: 30, marginLeft: 'auto'}} source={{uri: AppConfig.baseUrl + notification.icon_path}} />
      </View>
    </TouchableOpacity>
  )
};

class MyNotificationsScreen extends React.Component {
  state = {
    spinner: true,
    selectedNotification: null,
    modalOpened: false,
    notifications: []
  };

  openNotificationModal = (notification) => {
    this.setState({selectedNotification: notification}, () => {
      this.setState({modalOpened: true});
    });
  };

  closeNotificationModal = () => {
    this.setState({modalOpened: false}, () => {
      this.setState({selectedNotification: null});
    });
  };

  onButtonPress = () => {
    const { selectedNotification } = this.state;
    const notificationTypeId = selectedNotification.type.id;
    const notificationPostId = selectedNotification.post.id;

    this.closeNotificationModal();
    if (notificationTypeId === 1) this.props.navigation.navigate('Details', {postId: notificationPostId});
    if (notificationTypeId === 2) this.props.navigation.navigate('Rating', {postId: notificationPostId})

  };

  componentDidMount() {
    this.setState({spinner: true});
    this.props.getAllNotifications().then(() => {
      this.setState({spinner: false});
    })
  }

  keyExtractor = (item, index) => index;

  ///

  render() {
    const {notifications, removeNotification, ln} = this.props;
    console.log('notifications', notifications);
    return (
      <ScrollView style={{flex: 1, width: '100%', backgroundColor: '#fff', paddingBottom: 10, paddingHorizontal: 40}}>
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#11306a" /> :
            <FlatList
              numColumns={1}
              style={{width: '100%'}}
              keyExtractor={this.keyExtractor}
              data={notifications}
              extraData={this.props}
              renderItem={({item}) =>
                <NotificationItem notification={item} removeNotification={removeNotification} ln={ln} onPress={this.openNotificationModal} />
              }
            />
        }
        {
          this.state.modalOpened &&
          <NotificationItemModal
            modalVisible={this.state.modalOpened}
            onDismiss={this.closeNotificationModal}
            onButtonPress={this.onButtonPress}
            notification={this.state.selectedNotification}
            locale={ln}
          />
        }

      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage(),
  notifications: selectAllNotifications()
})

const mapDispatchToProps = (dispatch) => {
  return {
    removeNotification: (id) => dispatch(removeNotification(id)),
    getAllNotifications: () => dispatch(getAllNotifications())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNotificationsScreen);
