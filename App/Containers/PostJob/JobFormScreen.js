import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ScrollView } from 'react-native'

// Styles
import PostJobForm from '../../Components/JobForm/PostJobForm'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import {
  getCitiesList, getRegionsList, selectAllCities, selectInterests, selectRegions,
  selectRegionsList,
} from '../../Redux/SettingsRedux'
import { selectAttributesList } from '../../Redux/AttributesRedux'
import { selectLanguage } from '../../Redux/I18nRedux';
import { postNewAd } from '../../Services/Api'

class JobFormScreen extends Component {

  handleSubmit = (adData) => {

    console.log(this.props.navigation.state.params)
    const data = {...adData, category_id: this.props.navigation.state.params.subcategoryId}
    console.log('data')
    console.log(data)

    return postNewAd(data).then((res) => {
      console.log('res')
      console.log(res)
      if (res.ok) {
        this.props.navigation.navigate('PostSuccess', {successPostData: res.data.data})
      } else {
        return Promise.reject()
      }
    })
  }

  render () {
    console.log(this.props.navigation.state.params)
    const {regions, interests, regionsObj, cities, attributes, ln} = this.props;
    console.log('regionsObj ==> ', regionsObj);
    return (
      <ScreenContainer>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}>
          <PostJobForm
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
  ln: selectLanguage()
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
