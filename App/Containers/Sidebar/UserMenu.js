import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image, I18nManager } from 'react-native'
import ImagePicker from 'react-native-image-picker';

import AppConfig from '../../Config/AppConfig'
import ImageOptions from '../../Config/ImagePickerConfig';

import styles from './styles'
import PageTitle from '../../Components/PageTitle'
import Stars from '../../Components/Stars'
import I18n from '../../I18n'
import Images from '../../Themes/Images'

import { getUserRating, updateAvatar } from '../../Redux/UserRedux'

// Modals
import { RatingModal } from '../../Components/RatingModal';

const MenuButton = ({label, onPress}) => (
  <TouchableOpacity
    style={{borderColor: '#fff', borderBottomWidth: 0.4}}
    onPress={onPress}
  >
    <Text
      style={{textAlign: 'right', paddingHorizontal: 25, paddingVertical: 15, color: '#fff', fontSize: 15}}
    >
      {label}
    </Text>
  </TouchableOpacity>
)

const LanguageSelectButton = ({languages, label, onChange, ln}) => (
  <View
    style={{borderColor: '#fff', borderBottomWidth: 0.4, flex: 1, justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 10,}}
  >
    <View style={{flex: 0, flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
      <View style={{width: '75%', flex: 0, flexDirection: 'row', justifyContent: 'flex-end',}}>
        {
          languages.map((item, index) =>
            <TouchableOpacity onPress={() => { onChange(item.abbr) }} key={index} style={[styles.languageSelectButton, (ln === item.abbr) ? styles.selectedLanguageSelectButton : null]}>
              <Text style={[{textAlign: 'center', textDecorationLine: 'underline',fontSize: 14}, (ln === item.abbr) ? styles.selectedLanguageButtonText : styles.unselectedLanguageButtonText]}>
                {I18n.t(`translation.${item.abbr}`, {locale: ln})}
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
      <View style={{width: '25%', flex: 0, flexDirection: 'column', justifyContent: 'center'}}>
        <Text
          style={{color: '#fff', fontSize: 15, paddingRight: 'auto', textAlign: 'right'}}
        >
          {label}
        </Text>
      </View>
    </View>
  </View>
)

const BusinessDescription = ({rating, description, onRatingPress, onDescriptionPress, ln}) => {
  let stars = [];
  for (let i = 0, length = 5; i < length; i++) {
    stars.push(i < Math.ceil(rating));
  }
  return (
    <View style={{paddingBottom: 30,margin: 10}}>
      {
        !!rating &&
        <Stars rating={rating} onPress={onRatingPress} />
      }
      <TouchableOpacity style={{flex: 0, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', paddingBottom: 10}}
        onPress={onDescriptionPress}
      >
        <Text style={{textAlign: 'center', fontSize: 16, color: '#fff', textDecorationLine: 'underline', borderColor: 'white'}}>
          {
            !!description ?
              description :
              I18n.t('translation.addDescriptionAboutBusiness', {locale: ln})
          }
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const SidebarUserImage = ({image, isPremium, onImagePress}) => (
  // todo: вынести в файл стилей все стили. добавить функционал выбора изображения
  <View style={{width: '50%', padding: 15, aspectRatio: 1, position: 'relative'}}>
    <TouchableOpacity
      style={{flex: 1, flexDirection: 'column', justifyContent: 'center', borderRadius: 160, borderColor: 'rgba(231, 239, 255, 0.11)', borderWidth: 3, overflow: 'hidden'}}
      onPress={onImagePress}
    >
      {
        !!image ?
          <Image style={{alignSelf: 'center', alignItems: 'center', width: '100%', height: '100%'}} source={{uri: AppConfig.baseUrl + image}} /> :
          <Image
            resizeMode='contain'
            style={{width: '50%', height: '50%', alignSelf: 'center', alignItems: 'center', marginLeft: '-10%', marginBottom: '-10%'}} source={Images.addPhoto}
          />
      }

    </TouchableOpacity>
    {
      isPremium ?
        <View style={{position: 'absolute', width: 35, height: 35, top: 10, right: 10, borderRadius: 35, flex: 0, backgroundColor: 'rgba(19, 54, 120, 0.8)', alignItems: 'center'}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', alignItems: 'center', width: 20, height: 20, marginTop: 'auto', marginBottom: 'auto'}} source={Images.premiumIcon} />
        </View> : null
    }
  </View>
)

class UserMenu extends React.Component {

  state = {
    ratingModalVisible: false
  };

  openRatingModal = () => {
    this.props.getUserRating().then(() => {
      this.setState({ratingModalVisible: true});
    });
  };

  closeRatingModal = () => {
    this.setState({ratingModalVisible: false});
  };

  openImagePicker = () => {
    ImagePicker.showImagePicker(ImageOptions, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const body = new FormData();
        body.append('avatar', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });

        this.props.updateAvatar(body);
      }
    });
  };

  render() {
    const { languages, logout, userInfo, changeLanguage, logoutAndClear, navigate, ln, rating } = this.props;
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{paddingHorizontal: 15, paddingTop: 5}}
          >
            <Text style={{fontWeight: '200', color: '#fff', textAlign: 'left'}}>
              {I18n.t('translation.callCenter', {locale: ln})}
            </Text>
          </View>
          <SafeAreaView style={{flex: 1, position: 'relative'}} forceInset={{top: 'always', horizontal: 'never'}}>
            <View style={styles.topInfoWrapper}>
              <SidebarUserImage image={userInfo.img_path} isPremium={userInfo.is_premium} onImagePress={this.openImagePicker} />
              <PageTitle title={ I18n.t('translation.headerGreeting', {locale: ln, userName: userInfo.name})} />
            </View>
            <BusinessDescription rating={userInfo.rating} description={userInfo.description} onRatingPress={this.openRatingModal} onDescriptionPress={() => navigate('Settings')} ln={ln} />
          </SafeAreaView>
          <View>
            <MenuButton label={I18n.t('translation.myCategories', {locale: ln})} onPress={() => navigate('MyCategories')} />
            <MenuButton label={I18n.t('translation.myAds', {locale: ln})} onPress={() => navigate('MyAds')} />
            <MenuButton label={I18n.t('translation.myIncomingCalls', {locale: ln})} onPress={() => navigate('MyIncomingCallsScreen')} />
            <MenuButton label={I18n.t('translation.mySubscription', {locale: ln})} onPress={() => navigate('Subscriptions')} />
            <MenuButton label={I18n.t('translation.manageAlerts', {locale: ln})} onPress={() => navigate('NotificationsSettings')} />
            <MenuButton label={I18n.t('translation.settings', {locale: ln})} onPress={() => navigate('Settings')} />
            <LanguageSelectButton languages={languages} onChange={changeLanguage} label={I18n.t('translation.language', {locale: ln})} ln={ln} />
            <MenuButton label={I18n.t('translation.logout', {locale: ln})} onPress={logoutAndClear} />
          </View>
          {
            this.state.ratingModalVisible ?
              <RatingModal
                onClose={this.closeRatingModal}
                modalVisible={this.state.ratingModalVisible}
                rating={rating}
              /> : null
          }
        </ScrollView>
      </View>
    )
  }
}

UserMenu.propTypes = {
  languages: PropTypes.any,
  logout: PropTypes.any,
  userInfo: PropTypes.any,
  changeLanguage: PropTypes.any,
  logoutAndClear: PropTypes.any,
  navigate: PropTypes.any,
  ln: PropTypes.any,
  rating: PropTypes.any
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserRating: () => dispatch(getUserRating()),
    updateAvatar: (formData) => dispatch(updateAvatar(formData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
