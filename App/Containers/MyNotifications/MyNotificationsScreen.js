import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux'
import findIndex from 'lodash/findIndex'
import AppConfig from '../../Config/AppConfig';
import Images from '../../Themes/Images';

import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import Badge from '../../Components/Badge';
import { getAllNotifications, removeNotification } from '../../Redux/NotificationRedux';

import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'
import {selectLanguage} from "../../Redux/I18nRedux";

const NotificationItem = ({notification, removeNotification, ln}) => {
  return (
    <View
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
          {I18n.t(`translation.${notification.translation}`, Object.assign(notification.meta_info, {locale: ln}) )}
          {I18n.t(`translation.${notification.translation}`, Object.assign(notification.meta_info, {locale: ln}) )}
        </Text>
      </View>
      <View
        style={{width: '20%', alignSelf: 'center'}}
      >
        <Image resizeMode={'contain'} style={{width: 50, height: 30, marginLeft: 'auto'}} source={{uri: AppConfig.baseUrl + notification.icon_path}} />
      </View>
    </View>
  )
};

class MyNotificationsScreen extends React.Component {
  state = {
    spinner: true,
    notifications: []
  }

  componentDidMount() {
    this._getNotificationsList = this._getNotificationsList.bind(this);
    this._getNotificationsList();
  }

  removeNotification(id) {
    removeNotification(id).then(() => {
      this.setState({notifications: this.state.notifications.filter((item) => item.id !== id)})
    });
  }

  keyExtractor = (item, index) => index;

  ///
  _getNotificationsList() {
    this.setState({spinner: true});
    getAllNotifications().then((notifications) => {
      console.log('notifications', notifications);
      this.setState({spinner: false});
      this.setState({notifications});
    })
  }

  render() {
    return (
      <ScrollView style={{flex: 1, width: '100%', backgroundColor: '#fff', paddingBottom: 10, paddingHorizontal: 40}}>
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#11306a" /> :
            <FlatList
              numColumns={1}
              style={{width: '100%'}}
              keyExtractor={this.keyExtractor}
              data={this.state.notifications}
              extraData={this.state}
              renderItem={({item}) =>
                <NotificationItem notification={item} removeNotification={this.removeNotification.bind(this)} ln={this.props.ln} />
              }
            />
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNotificationsScreen);
