import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image, I18nManager } from 'react-native'
import AppConfig from '../../Config/AppConfig'

import styles from './styles'
import PageTitle from '../../Components/PageTitle'
import I18n from '../../I18n'
import Images from '../../Themes/Images'
import PhotoUpload from 'react-native-photo-upload'

const MenuButton = ({label, onPress}) => (
  <TouchableOpacity
    style={{borderColor: '#fff', borderBottomWidth: 0.4}}
    onPress={onPress}
  >
    <Text
      style={{textAlign: 'left', paddingHorizontal: 25, paddingVertical: 15, color: '#fff', fontSize: 15}}
    >
      {label}
    </Text>
  </TouchableOpacity>
)

const LanguageSelectButton = ({languages, label, onChange}) => (
  <View
    style={{borderColor: '#fff', borderBottomWidth: 0.4, flex: 1, justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 15,}}
  >
    <View style={{flex: 0, flexWrap: 'nowrap', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
      <View style={{width: '50%'}}>
        <Text
          style={{color: '#fff', fontSize: 15}}
        >
          {label}
        </Text>
      </View>
      <View style={{width: '50%', flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
        {
          languages.map((item, i) => <Text key={i} style={{color: '#fff', fontSize: 14, borderBottomWidth: 1, borderColor: 'white'}} onPress={() => {onChange(item.abbr)}}>{item.title}</Text>)
        }
      </View>
    </View>
  </View>
)

const BusinessDescription = ({rating, description, onRatingPress, onDescriptionPress}) => {
  let stars = [];
  for (let i = 0, length = Math.round(rating); i < length; i++) {
    stars.push(i);
  }
  return (
    <View style={{paddingBottom: 30,}}>
      <TouchableOpacity style={{flex: 0, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', paddingBottom: 10}}
        onPress={onRatingPress}
      >
        {
          stars.map((item) =>
            <Image key={item} source={Images.starIcon} style={{width: 20, height: 20, marginHorizontal: 5}} />
          )
        }
      </TouchableOpacity>
      <TouchableOpacity style={{flex: 0, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center', paddingBottom: 10}}
        onPress={onDescriptionPress}
      >
        <Text style={{textAlign: 'center', fontSize: 16, color: '#fff', borderBottomWidth: 0.4, borderColor: 'white'}}>
          {description}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const SidebarUserImage = ({image, isPremium}) => (
  // todo: вынести в файл стилей все стили. добавить функционал выбора изображения
  <View style={{width: '80%', padding: 15, aspectRatio: 1, position: 'relative'}}>
    <View
      style={{flex: 1, borderRadius: 160, borderColor: 'rgba(231, 239, 255, 0.11)', borderWidth: 3,}}
    >
      <Image style={{alignSelf: 'center', alignItems: 'center', width: '100%', height: '100%'}} source={{uri: AppConfig.baseUrl + image}} />
    </View>
    {
      isPremium ?
        <View style={{position: 'absolute', width: 65, height: 65, top: 0, left: 0, borderRadius: 65, flex: 0, backgroundColor: 'rgba(19, 54, 120, 0.8)', alignItems: 'center'}}>
          <Image resizeMode='contain' style={{alignSelf: 'center', alignItems: 'center', width: 30, height: 30, marginTop: 'auto', marginBottom: 'auto'}} source={Images.premiumIcon} />
        </View> : null
    }
    {/*{*/}
    {/*userInfo && userInfo.img_path ?*/}
    {/*{*/}
    {/**/}
    {/*}*/}
    {/*:*/}
    {/*<PhotoUpload*/}
    {/*containerStyle={{*/}
    {/*borderRadius: 160,*/}
    {/*justifyContent: 'center',*/}
    {/*alignItems: 'center',*/}

    {/*backgroundColor: '#133678',*/}
    {/*borderColor: 'rgba(231, 239, 255, 0.11)',*/}
    {/*borderWidth: 3,*/}
    {/*}}*/}
    {/*onPhotoSelect={avatar => {*/}
    {/*if (avatar) {*/}
    {/*console.log('Image base64 string: ', avatar)*/}
    {/*}*/}
    {/*}}*/}
    {/*>*/}
    {/*<Image*/}
    {/*resizeMode='contain'*/}
    {/*style={{width: 60, position: 'relative', right: -7, top: 3}} source={Images.addPhoto}*/}
    {/*/>*/}
    {/*</PhotoUpload>*/}
    {/*}*/}
  </View>
)

const UserMenu = ({languages, changeLanguage, userInfo, logoutAndClear, navigate, ln}) => (

  <View style={{flex: 1}}>
    {console.log('userInfo', userInfo)}
    <ScrollView>
      <View
        style={{paddingHorizontal: 15, paddingTop: 5}}
      >
        <Text style={{fontWeight: '200', color: '#fff', textAlign: I18nManager.isRTL ? 'right' : 'left'}}>
          {I18n.t('translation.callCenter', {locale: ln})}
        </Text>
      </View>
      <SafeAreaView style={{flex: 1, position: 'relative'}} forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.topInfoWrapper}>
          <SidebarUserImage image={userInfo.img_path} isPremium={userInfo.is_premium} />
          <PageTitle title={userInfo.name} />
        </View>
        <BusinessDescription rating={userInfo.rating} description={userInfo.description} onRatingPress={() => {console.log('reating pressed')}} onDescriptionPress={() => navigate('Settings')} />
      </SafeAreaView>
      <View>
        <MenuButton label={I18n.t('translation.myCategories', {locale: ln})} onPress={() => navigate('MyCategories')} />
        <MenuButton label={I18n.t('translation.myAds', {locale: ln})} onPress={() => navigate('MyAds')} />
        <MenuButton label={I18n.t('translation.myIncomingCalls', {locale: ln})} onPress={() => navigate('MyIncomingCallsScreen')} />
        <MenuButton label={I18n.t('translation.mySubscription', {locale: ln})} onPress={() => navigate('Subscriptions')} />
        <MenuButton label={I18n.t('translation.manageAlerts', {locale: ln})} onPress={() => navigate('NotificationsSettings')} />
        <MenuButton label={I18n.t('translation.settings', {locale: ln})} onPress={() => navigate('Settings')} />
        <LanguageSelectButton languages={languages} onChange={changeLanguage} label={I18n.t('translation.language', {locale: ln})} />
        <MenuButton label={I18n.t('translation.logout', {locale: ln})} onPress={logoutAndClear} />
      </View>
    </ScrollView>
  </View>
)

UserMenu.propTypes = {
  languages: PropTypes.any,
  userInfo: PropTypes.object,
  logout: PropTypes.any,
  navigate: PropTypes.any
}
export default UserMenu
