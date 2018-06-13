import React from 'react';
import { View, TouchableOpacity, Image, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ImagePicker from 'react-native-image-picker';
import AppConfig from '../../Config/AppConfig'
import ImageOptions from '../../Config/ImagePickerConfig';

import { Images } from '../../Themes';

import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';

import { selectUserInfo, updateUser, updateAvatar } from '../../Redux/UserRedux'
import { selectInterests } from '../../Redux/SettingsRedux'
import { selectLanguage } from '../../Redux/I18nRedux'


// EXAMPLE


import I18n from '../../I18n'
import SettingsForm from './SettingsForm';

const ImageComponent = ({image, isPremium, onImagePress}) => {
  return (
    <View style={{width: '40%', padding: 15, aspectRatio: 1, position: 'relative'}}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center', borderRadius: 160, borderColor: 'rgba(19, 54, 120, 0.8)', borderWidth: 3, overflow: 'hidden'}}
        onPress={onImagePress}>
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
          <View style={{position: 'absolute', width: 35, height: 35, top: 10, right: 10, borderRadius: 25, flex: 0, backgroundColor: 'rgba(19, 54, 120, 0.8)', alignItems: 'center'}}>
            <Image resizeMode='contain' style={{alignSelf: 'center', alignItems: 'center', width: 20, height: 20, marginTop: 'auto', marginBottom: 'auto'}} source={Images.premiumIcon} />
          </View> : null
      }
    </View>
  )
};

class SettingsScreen extends React.Component {

  updateUser = (data) => {
    return new Promise((resolve, reject) => {
      this.props.updateUser(data).then(() => {
        this.props.screenProps.drawerNavigation.navigate('Home');
        resolve();
      }, reject);
    });
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
    const {userInfo, ln, interests} = this.props;
    return (
        <ScreenContainer>
          <PageTitle title={I18n.t('translation.accountInfo', {locale: this.props.ln})} />
          <ImageComponent image={userInfo.img_path} isPremium={userInfo.is_premium} onImagePress={this.openImagePicker} />
          <SettingsForm userInfo={userInfo} ln={ln} interests={interests} onSubmit={this.updateUser} />
        </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo(),
  interests: selectInterests(),
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => dispatch(updateUser(data)),
    updateAvatar: (formData) => dispatch(updateAvatar(formData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
