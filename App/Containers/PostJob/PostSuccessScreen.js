import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

// Styles
import styles from './styles'
import images from '../../Themes/Images'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import FormButton from '../../Components/FormButton/FormButton'

class PostJobScreen extends Component {

  handleSubmit = () => {
    this.props.navigation.navigate('PostSuccess')
  }
  goToScreen = (screen, params) => {
    const action = screen === 'Home'
      ? NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: screen, params})],
      })
      : NavigationActions.navigate({routeName: screen, params})
    this.props.navigation.dispatch(action)
  }

  render () {
    const {successPostData} = this.props.navigation.state.params
    return (
      <ScreenContainer>
        <View>
          <Image style={styles.successImg} source={images.postSuccess} resizeMode={'contain'} />
        </View>
        <View style={{marginBottom: 50}}>
          <Text style={styles.successTitle}>{I18n.t('POST_JOB.SUCCESS_TITLE')}</Text>
          <Text style={styles.successDetails}>{I18n.t('POST_JOB.SUCCESS_DETAILS', {
            id: successPostData.id,
            subcategory: successPostData.subcategory,
          })}</Text>
        </View>
        <View>
          <FormButton
            onPress={() => this.goToScreen('Details', {postId: successPostData.id, showCallButton: true})}
            style={styles.outlineBtn}
          >{I18n.t('POST_JOB.SHOW_AD')}</FormButton>
          <FormButton
            onPress={() => this.goToScreen('Home')} style={styles.outlineBtn}
          >{I18n.t('POST_JOB.GO_BACK')}</FormButton>
        </View>
      </ScreenContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJobScreen)
