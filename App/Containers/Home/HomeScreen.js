import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableHighlight, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import * as firebase from 'firebase';

import HomeBtn from './components/HomeBtn'
// Styles
import styles from './styles'
import images from '../../Themes/Images'
import PageTitle from '../../Components/PageTitle'
import I18n from 'react-native-i18n'
import ScreenContainer from '../../Components/ScreenContainer'
import Row from '../../Components/Row/Row'

import { selectLanguage } from '../../Redux/I18nRedux';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
  }

  componentWillMount() {
      // todo: Pusher not working
      // AsyncStorage.getItem('token').then(token => {
      //   console.log('PusherConfig', PusherConfig);
      //
      //   this.pusher = new Pusher(PusherConfig.key, Object.assign(PusherConfig, {
      //     auth: {
      //       headers: {
      //         Accept: 'Application/json',
      //         Authorization: "Bearer 1BNDF1TwVMpKOgLYk0Cd9b1Xo3z1SZdlRv51SVAsVlMJZy8soZowUxOoqWTp",
      //         'X-CSRF-TOKEN': "aUGFGwYM3sCAptKgFTLMidmni77JyL6suFlWYAjV"
      //       }
      //     }
      //   })); // (1)
      //   const channel = this.pusher.subscribe(`Notification.Message.${2}`);
      //   // // this.chatChannel = this.pusher.private(`Notification.Message.${2}`); // (2)
      //   // //
      //   // //
      //   channel.bind('NotificationMessage', (push) => { // (4)
      //     console.log('push =====> ', push);
      //   });
      //
      // })






    // var pusher = new Pusher({
    //   appId: '478096',
    //   key: '874a8c5763fea6973b90',
    //   secret: '48fbe7cbf7555e519a05',
    //   cluster: 'eu'
    // });



    // const notifications = this.pusher.subscribe('notifications');
    //
    // notifications.bind('test', (data) => {
    //   console.log('data', data);
    // })
  }

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen)
  }

  renderBottomArea = () => (
    <View style={styles.bottomBtnWrapper}>
      <TouchableHighlight style={styles.bottomBtn}><Text>{I18n.t('translation.watchVideo', {locale: this.props.ln})}</Text></TouchableHighlight>
    </View>
  )

  render () {
    return (
      <ScreenContainer fixedToBottomArea={this.renderBottomArea()}>
        <View style={styles.contentWrapper}>
          <PageTitle title={I18n.t('translation.homepageTitle', {locale: this.props.ln})} large>
            <Text style={styles.subtitle}>{I18n.t('translation.homepageDescription', {locale: this.props.ln})}</Text>
          </PageTitle>
          <View>
            <Row style={styles.btnRow} justifyContent={'space-between'}>
              <HomeBtn
                imageStyles={styles.findBtn} image={images.dude3} onPress={() => this.navigateTo('Find')}
              >{I18n.t('translation.findJob', {locale: this.props.ln})}</HomeBtn>
              <HomeBtn imageStyles={styles.postBtn} image={images.dude2} onPress={() => this.navigateTo('Post')}>{I18n.t('translation.createPost', {locale: this.props.ln})}</HomeBtn>
            </Row>
            <Row style={styles.btnRow} justifyContent={'center'} >
              <HomeBtn image={images.dude1}>{I18n.t('translation.allBusinesses', {locale: this.props.ln})}</HomeBtn>
            </Row>
          </View>
        </View>
      </ScreenContainer>

    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    translate: (key, params) => dispatch(translate(key, params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
