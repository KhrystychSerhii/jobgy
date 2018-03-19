import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ScrollView } from 'react-native'

// Styles
import JobForm from '../../Components/JobForm/JobForm'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import {
  getCitiesList, getRegionsList, selectAllCities, selectInterests, selectRegions,
  selectRegionsList,
} from '../../Redux/SettingsRedux'
import { postNewAd } from '../../Services/Api'

class JobFormScreen extends Component {

  handleSubmit = (adData) => {
    console.log('adData')
    console.log(adData)
    console.log('rr')
    console.log(this.props.navigation.state.params.categoryId)
    const data = {...adData, category_id: this.props.navigation.state.params.categoryId}
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
    const {regions, interests, regionsObj, cities} = this.props
    return (
      <ScreenContainer>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}>
          <JobForm
            regionsObj={regionsObj} cities={cities} regions={regions}
            interests={interests} onSubmit={this.handleSubmit}
          />
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
