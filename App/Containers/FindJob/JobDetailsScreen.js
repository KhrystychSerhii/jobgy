import React, { Component } from 'react'
import { Image, View, Share } from 'react-native'
import { connect } from 'react-redux'
import get from 'lodash/get'
// Styles
import styles from './styles'
import images from '../../Themes/Images'
import AppConfig from '../../Config/AppConfig'

import PageTitle from '../../Components/PageTitle'
import JobDetails from './JobDetails'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import { fetchPostById } from '../../Services/Api'

import { createStructuredSelector } from 'reselect'

import { selectLanguage } from '../../Redux/I18nRedux'
import { callButtonPress } from '../../Redux/CallsRedux';
import { selectUserInfo } from '../../Redux/UserRedux';
import { getAttributesList, selectAttributesList } from '../../Redux/AttributesRedux';

class JobDetailsScreen extends Component {
  state = {
    post: null,
    attributes: null
  };

  componentDidMount () {
    const postId = get(this.props.navigation, 'state.params.postId');
    if (postId) {
      fetchPostById(postId)
        .then((res) => {
          this.setState({post: res.data.data});
          const categoryId = get(this.state, 'post.category.id');
          this.props.getAttributes(categoryId);
        });
    }
  }

  share(post) {
    Share.share({
      message: `Share text!! \n${post.category.title} category from ${post.author.name}. \nCall me ${post.author.phone}.`,
    })
  }


  render () {
    const { callButtonPress, userInfo, attributes } = this.props;
    const authorId = get(this.state, 'post.author.id');
    const showCallButton = authorId !== userInfo.id; // get(this.props.navigation, 'state.params.showCallButton');

    return (
      <ScreenContainer>
        {
          this.state.post ?
            <View style={{
              position: 'relative',
              paddingHorizontal: 50
            }}>
              {/*<Image source={} style={{ width: 60, height: 60, position: 'absolute', right: 0, top: 20 }} resizeMode='contain' />*/}
              <PageTitle textStyle={{fontSize: 25}}
                         leftImage={this.state.post.category.icon_path}
                         rightImage={images.findDude}
                         title={this.state.post.author.business_name} />
              {/*<Image source={images.findDude} style={{ width: 60, height: 60, position: 'absolute', left: 0, top: 20 }} resizeMode='contain' />*/}
            </View> : null
        }
        {
          this.state.post ?
            <JobDetails post={this.state.post} onShare={this.share.bind(this)} ln={this.props.ln} showCallButton={showCallButton} callButtonPress={callButtonPress} attributes={attributes} /> : null
        }
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage(),
  userInfo: selectUserInfo(),
  attributes: selectAttributesList()
});

const mapDispatchToProps = (dispatch) => {
  return {
    callButtonPress: (postId) => dispatch(callButtonPress(postId)),
    getAttributes: (categoryId) => dispatch(getAttributesList(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsScreen)
