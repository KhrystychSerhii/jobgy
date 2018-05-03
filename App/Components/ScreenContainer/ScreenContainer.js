import React from 'react'
import PropTypes from 'prop-types'
import { View, ImageBackground, ScrollView } from 'react-native'

import styles from './styles'
import images from '../../Themes/Images'

class ScreenContainer extends React.Component {
  render () {
    const {bgWithPicture, noPadding, optionalScrollViewStyles} = this.props
    const scrollViewStyles = [styles.container, noPadding && {paddingLeft: 0, paddingRight: 0}, optionalScrollViewStyles]
    return (
      <ImageBackground
        source={bgWithPicture ? images.backgroundWithPic : images.backgroundWithClouds}
        style={styles.backgroundImage}
        resizeMode='stretch'
      >
        <ScrollView style={scrollViewStyles} contentContainerStyle={{alignItems: 'center', paddingBottom: 40}}>
          {this.props.children}
        </ScrollView>
        {this.props.fixedToBottomArea}
      </ImageBackground>
    )
  }
}

ScreenContainer.propTypes = {
  fixedToBottomArea: PropTypes.node,
  bgWithPicture: PropTypes.bool,
  optionalScrollViewStyles: PropTypes.any
}

export default ScreenContainer
