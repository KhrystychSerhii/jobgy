import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import PageTitle from '../../Components/PageTitle/PageTitle'
import I18n from 'react-native-i18n'

import { Images } from '../../Themes';
import styles from './styles'

const GuestMenu = ({navigate, languages, ln, changeLanguage}) => (
  <View style={{flex: 1}}>
    <View
      style={styles.callCenterWrapper}
    >
      <Text style={styles.callCenterText}>
        {I18n.t('translation.callCenter', {locale: ln})}
      </Text>
    </View>


    <View style={styles.loggedOutContent}>
      <View style={styles.topInfoWrapper}>
        <Text style={styles.topInfoText}>{I18n.t('translation.helloGuest', {locale: ln})}</Text>
        <Image source={Images.pageTitleBorder} style={styles.dashedLine} resizeMode={'contain'} />
        <View style={styles.introductionTextWrapper}>
          <Text style={styles.introductionText}>{I18n.t('translation.introductionText', {locale: ln})}</Text>
        </View>

        <View style={styles.registerButtonWrapper}>
          <TouchableOpacity onPress={() => navigate('Register')}>
            <View style={styles.greenBtnInner}>
              <LinearGradient
                style={styles.linearGradient} colors={['rgba(255, 255, 255, 0.16)', 'rgba(0, 0, 0, 0)']}
              >
                <View style={styles.greenBtn}>
                  <Text style={styles.greenBtnText}>+</Text>
                </View>
              </LinearGradient>
              <Text
                style={[styles.introductionText, {textDecorationLine: 'underline', textShadowColor: '#fff'}]}
              >{I18n.t('translation.createNewAccount', {locale: ln})}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </View>
    <View style={styles.loggedOutFooter}>
      <View style={styles.languageSelectorWrapper}>
        <Text style={styles.languageSelectorTitle}>
          {I18n.t('translation.language', {locale: ln})}
        </Text>
        <View style={styles.languagesWrapper}>
          {
            languages.map((item, index) => (
              <TouchableOpacity onPress={() => { changeLanguage(item.abbr) }} key={index} style={[styles.languageSelectButton, (ln === item.abbr) ? styles.selectedLanguageSelectButton : null]}>
                <Text style={[styles.languageSelectButtonText, (ln === item.abbr) ? styles.selectedLanguageButtonText : styles.unselectedLanguageButtonText]}>
                  {I18n.t(`translation.${item.abbr}`, {locale: ln})}
                </Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>

      <View style={styles.loginLinkWrapper}>
        <TouchableWithoutFeedback style={styles.loginLink} onPress={() => navigate('Login')}>
          <View>
            <Text style={[styles.introductionText, {textDecorationLine: 'underline', textShadowColor: '#fff'}]}>{I18n.t('translation.haveAnAccountLogIn', {locale: ln})}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>

  </View>
)

export default GuestMenu
