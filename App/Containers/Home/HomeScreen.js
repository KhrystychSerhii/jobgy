import React, { Component } from 'react'
import { Animated, ScrollView, Text, ImageBackground, View, TouchableHighlight, TouchableOpacity, AsyncStorage, WebView, Dimensions } from 'react-native'
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


import { FormImagePicker } from '../../Components/FormTextInput';


import {MultiSelectDropdown} from '../../Components/SelectDropdown'

import { selectLanguage } from '../../Redux/I18nRedux';


import LoginModal from '../../Components/LoginModal';
const {width, height} = Dimensions.get('window');

import AppConfig from '../../Config/AppConfig';

let defaultVideoPosition = 0; // -((width / 4) * 3) + 40;
let visibleVideoPosition = -((width / 4) * 3) + 40 + 5;

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
  };
  translateY = new Animated.Value(defaultVideoPosition);

  state = {
    videoVisible: false,

    // TEST
    selectedItems: [],

  };

  componentWillMount() {}

  navigateTo = (screen) => {
    this.props.navigation.navigate(screen)
  };

  onSelect = (selectedItems) => {
    this.setState({selectedItems});
  };

  renderBottomArea = () => (
    <Animated.View style={[styles.bottomBtnWrapper, {
      transform: [
        {
          translateY: this.translateY
        }
      ]
    }]}>
      <TouchableOpacity onPress={this.state.videoVisible ? this.hideVideo : this.showVideo} style={styles.bottomBtn}><Text>{I18n.t('translation.watchVideo', {locale: this.props.ln})}</Text></TouchableOpacity>
      <View style={styles.bottomVideoBorder}></View>
      <WebView
        style={[styles.bottomVideo]}
        source={{uri: AppConfig.video + '?rel=0&autoplay=0&showinfo=0&controls=0&modestbranding=0&disablekb=0'}}
      />
      <View style={styles.bottomVideoLinkBlocker}></View>
    </Animated.View>
  )

  showVideo = () => {
    Animated.timing(
      this.translateY,
      {toValue: visibleVideoPosition, duration: 100, useNativeDriver: true,} // Configuration
    ).start(() => {
      this.setState({videoVisible: true})
    });
  };

  hideVideo = () => {
    Animated.timing(
      this.translateY,
      {toValue: defaultVideoPosition, duration: 100, useNativeDriver: true,} // Configuration
    ).start(() => {
      this.setState({videoVisible: false})
    });
  };

  render () {
    return (
      <View style={{flex:1, position: 'relative'}}>
        <ScreenContainer optionalScrollViewStyles={{position: 'relative'}}>
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
              {/*<Row style={styles.btnRow} justifyContent={'center'}>*/}
              {/*<HomeBtn image={images.dude1} onPress={() => this.navigateTo('AllBusinessCategories')}>{I18n.t('translation.allBusinesses', {locale: this.props.ln})}</HomeBtn>*/}
              {/*</Row>*/}
            </View>
          </View>
        </ScreenContainer>
        {this.renderBottomArea()}
      </View>


    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage(),
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
