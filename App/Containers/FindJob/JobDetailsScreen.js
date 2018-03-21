import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import get from 'lodash/get'
// Styles
import styles from './styles'
import images from '../../Themes/Images'
import PageTitle from '../../Components/PageTitle'
import JobDetails from './JobDetails'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import { fetchPostById } from '../../Services/Api'

class JobDetailsScreen extends Component {
  state = {
    post: null,
  }

  componentDidMount () {
    const postId = get(this.props.navigation, 'state.params.postId')
    if (postId) {
      fetchPostById(postId)
        .then((res) => {
          this.setState({post: res.data.data})
        })
    }
  }


  render () {
    return (
      <ScreenContainer>
        <View style={styles.titleWithImagesWrapper}>
          <Image source={images.buildingImg} style={styles.resultsTitleImageLeft} resizeMode='contain' />
          <PageTitle textStyle={{fontSize: 25}} title={'אחמד אחמד ובניו'} />
          <Image source={images.findDude} style={styles.resultsTitleImage} resizeMode='contain' />
        </View>
        <JobDetails post={this.state.post} />
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

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsScreen)
