import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import PageTitle from '../../Components/PageTitle/PageTitle'
import I18n from '../../I18n'
import styles from './styles'
import LanguageSwitcher from './LanguageSwitcher'

const GuestMenu = ({navigate, languages}) => (
  <View style={{flex: 1}}>
    <ScrollView>
      <SafeAreaView style={{flex: 1, position: 'relative'}} forceInset={{top: 'always', horizontal: 'never'}}>
        <View style={styles.topInfoWrapper}>
          <PageTitle title={I18n.t('MENU.HELLO_GUEST')} />
          <View style={styles.introductionTextWrapper}>
            <Text style={styles.introductionText}>{I18n.t('MENU.GUEST_TEXT')}</Text>
          </View>
          <View>
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
                  style={[styles.whiteText, {textDecorationLine: 'underline', textShadowColor: '#fff'}]}
                >{I18n.t('MENU.REGISTER')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
    <LanguageSwitcher languages={languages} />
    <View style={styles.loginLinkWrapper}>
      <TouchableWithoutFeedback style={styles.loginLink} onPress={() => navigate('Login')}>
        <View>
          <Text style={styles.whiteText}>{I18n.t('MENU.LOGIN')}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </View>
)

export default GuestMenu
