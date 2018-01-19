import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import HomeBtn from './components/HomeBtn'
// Styles
import styles from './styles'
import images from '../../Themes/Images'

class HomeScreen extends Component {
  render () {
    return (
      <ImageBackground source={images.backgroundWithClouds} style={styles.backgroundImage} resizeMode='stretch'>
        <ScrollView style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>ג’ובג’י לשירותך</Text>
            <Text style={styles.subtitle}>
              בחר בין האפשרויות הנל ומצא
              {'\n'}את זה שאתה רוצה לעשות
            </Text>
          </View>
          <View>
            <HomeBtn />
          </View>
        </ScrollView>
      </ImageBackground>
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
