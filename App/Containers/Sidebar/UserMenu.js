import React from 'react'
import PropTypes from 'prop-types'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native'

import styles from './styles'
import PageTitle from '../../Components/PageTitle'
import I18n from '../../I18n'
import Images from '../../Themes/Images'
import PhotoUpload from 'react-native-photo-upload'
// const NoImage = () => (
//   <View>
//
//   </View>
// )

const UserMenu = ({userInfo}) => (
  <View style={{flex: 1}}>
    <ScrollView>
      <SafeAreaView style={{flex: 1, position: 'relative'}} forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.topInfoWrapper}>
          <PageTitle title={userInfo.business_name} />
          {/*<View style={styles.introductionTextWrapper}>*/}
          {/*<Text style={styles.introductionText}>{I18n.t('MENU.GUEST_TEXT')}</Text>*/}
          {/*</View>*/}
          <View style={{width: 160,
            height: 160,}}>

            <PhotoUpload
              containerStyle={{
                borderRadius: 160,
                justifyContent: 'center',
                alignItems: 'center',

                backgroundColor: '#133678',
                borderColor: 'rgba(231, 239, 255, 0.11)',
                borderWidth: 3,
              }}
              onPhotoSelect={avatar => {
                if (avatar) {
                  console.log('Image base64 string: ', avatar)
                }
              }}
            >
              <Image
                resizeMode='contain'
                style={{width: 60, position: 'relative', right: -7, top: 3}} source={Images.addPhoto}
              />
            </PhotoUpload>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
    {/*<LanguageSwitcher languages={languages} />*/}
  </View>
)
UserMenu.propTypes = {
  userInfo: PropTypes.object,
}
export default UserMenu
