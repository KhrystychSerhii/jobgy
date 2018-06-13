import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ScrollView, View } from 'react-native'
import I18n from '../../I18n'
import { Images } from '../../Themes'


// Styles
import styles from './styles'
import PostJobForm from '../../Components/JobForm/PostJobForm'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import PageTitle from '../../Components/PageTitle'
import {
  getCitiesList, getRegionsList, selectAllCities, selectInterests, selectRegions,
  selectRegionsList,
} from '../../Redux/SettingsRedux'
import { selectUserInfo } from '../../Redux/UserRedux'
import { selectAttributesList } from '../../Redux/AttributesRedux'
import { selectLanguage } from '../../Redux/I18nRedux';
import { postNewAd } from '../../Services/Api'
import get from 'lodash/get';

class JobFormScreen extends Component {

  handleSubmit = (formData) => {

    console.log(this.props.navigation.state.params)
    const subcategory = get(this.props.navigation, 'state.params.subcategory');
    formData.append('category_id', subcategory.id); //{...adData, category_id: subcategory.id}

    console.log('formData ==> ', formData);
    return postNewAd(formData).then((res) => {
      console.log('res ==> ', res);
      if (res.ok) {
        this.props.navigation.navigate('PostSuccess', {successPostData: res.data.data})
      } else {
        return Promise.reject()
      }
    })
  }

  render () {
    console.log(this.props.navigation.state.params)
    const {userInfo, regions, interests, regionsObj, cities, attributes, ln} = this.props;
    const subcategory = get(this.props.navigation, 'state.params.subcategory');
    const category = get(this.props.navigation, 'state.params.category');
    console.log('this.props ==> ', this.props);
    return (
      <ScreenContainer>

        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}>
          <View style={[styles.titleWithImagesWrapper]}>
            <PageTitle title={I18n.t('translation.postAdInCategory', {locale: ln, category: subcategory.title})} rightImage={Images.postDude} leftImage={subcategory.icon_path} />
          </View>
          <PostJobForm
            isUserPremium={!!userInfo && userInfo.is_premium}
            cities={cities}
            regions={regions}
            attributes={attributes}
            interests={interests}
            ln={ln}
            onSubmit={this.handleSubmit}
          />
          {/*<JobForm*/}
            {/*regionsObj={regionsObj} cities={cities} regions={regions}*/}
            {/*interests={interests} attributes={attributes} onSubmit={this.handleSubmit}*/}
          {/*/>*/}
        </ScrollView>
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests(),
  regions: selectRegionsList(),
  regionsObj: selectRegions(),
  cities: selectAllCities(),
  attributes: selectAttributesList(),
  ln: selectLanguage(),
  userInfo: selectUserInfo(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCities: () => dispatch(getCitiesList()),
    getRegions: () => dispatch(getRegionsList()),
  }
}

JobFormScreen.propTypes = {
  getCities: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(JobFormScreen)
