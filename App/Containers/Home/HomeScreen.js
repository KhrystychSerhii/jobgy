import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import HomeBtn from './components/HomeBtn'
// Styles
import styles from './styles'
import images from '../../Themes/Images'
import PageTitle from '../../Components/PageTitle'
import I18n from '../../I18n'
import ScreenContainer from '../../Components/ScreenContainer'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
  }
  navigateTo = (screen) => {
    this.props.navigation.navigate(screen)
  }

  renderBottomArea = () => (
    <View style={styles.bottomBtnWrapper}>
      <TouchableHighlight style={styles.bottomBtn}><Text>{I18n.t('HOME.WATCH_INFO')}</Text></TouchableHighlight>
    </View>
  )

  render () {
    return (
      <ScreenContainer fixedToBottomArea={this.renderBottomArea()}>
        <View style={styles.contentWrapper}>
          <PageTitle title={I18n.t('HOME.TITLE')} large>
            <Text style={styles.subtitle}>{I18n.t('HOME.SUBTITLE')}</Text>
          </PageTitle>
          <View>
            <View style={styles.btnRow}>
              <HomeBtn
                imageStyles={{left: -15}} image={images.dude3} onPress={() => this.navigateTo('Find')}
              >{I18n.t('HOME.FIND_JOB')}</HomeBtn>
              <HomeBtn imageStyles={{left: 10}} image={images.dude2} onPress={() => this.navigateTo('Post')}>{I18n.t('HOME.POST_JOB')}</HomeBtn>
            </View>
            <View style={[styles.btnRow, {justifyContent: 'center'}]}>
              <HomeBtn image={images.dude1}>{I18n.t('HOME.ALL_BUSINESSES')}</HomeBtn>
            </View>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
