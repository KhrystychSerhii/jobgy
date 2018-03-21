import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { createStructuredSelector } from 'reselect'
import I18n from '../../I18n'
import { connect } from 'react-redux'

// Styles
import styles from './styles'
import images from '../../Themes/Images'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'
import FormButton from '../../Components/FormButton'
import SearchResultsList from '../../Components/SearchResultsList'
import FilterModal from './FilterModal'
import { fetchCategoryData, fetchPostsByCategory } from '../../Services/Api'
import {
  getCitiesByRegionId, getRegionsList, selectAllCities, selectInterests, selectRegions,
  selectRegionsList,
} from '../../Redux/SettingsRedux'
import { selectFilters, setFilterParams } from '../../Redux/FilterRedux'

const results = [
  {
    serviceType: 'עבודה וחומר',
    area: 'מרכז',
    date: '12.12.17-12.12.18',
    category: 'בלוק',
  },
  {
    serviceType: 'עבודה וחומר',
    area: 'מרכז',
    date: '12.12.17-12.12.18',
    category: 'בלוק',
  },
  {
    serviceType: 'עבודה וחומר',
    area: 'מרכז',
    date: '12.12.17-12.12.18',
    category: 'בלוק',
  }, {
    serviceType: 'עבודה וחומר',
    area: 'מרכז',
    date: '12.12.17-12.12.18',
    category: 'בלוק',
  }, {
    serviceType: 'עבודה וחומר',
    area: 'מרכז',
    date: '12.12.17-12.12.18',
    category: 'בלוק',
  },
]

class SearchResultsScreen extends Component {
  state = {
    modalOpened: false,
    results: [],
  }

  componentDidMount () {

  }

  getResults = (categoryId, params) => {
    return fetchPostsByCategory({categoryId, ...params})
      .then(response => {
        console.log('response')
        console.log(response)
      })
  }

  openModal = () => {
    this.setState({modalOpened: true})
  }

  closeModal = () => {
    this.setState({modalOpened: false})
  }

  onItemSelect = (id) => {
    this.props.navigation.navigate('Details')
  }

  handleFilterSubmit = (params) => {
    this.closeModal()
    this.props.saveFilterParams({categoryId: this.props.navigation.state.params.categoryId, ...params})
    return this.getResults(params)
  }

  render () {
    const {interests, regions, regionsObj, filters, cities} = this.props
    return (
      <ScreenContainer noPadding>
        <View style={styles.titleWithImagesWrapper}>
          <Image source={images.buildingImg} style={styles.resultsTitleImageLeft} resizeMode='contain' />
          <PageTitle textStyle={{fontSize: 20}} title={I18n.t('SEARCH_RESULTS.TITLE')} />
          <Image source={images.findDude} style={styles.resultsTitleImage} resizeMode='contain' />
        </View>
        <View>
          <Text style={styles.countText}>{I18n.t('SEARCH_RESULTS.COUNT', {count: 45})}</Text>
          <FormButton
            onPress={this.openModal}
            icon={images.filterIcon}
            style={styles.btnStyle}
            textStyle={styles.btnTextStyle}
          >
            {I18n.t('SEARCH_RESULTS.FILTER_BUTTON')}
          </FormButton>
        </View>
        <SearchResultsList results={results} onSelect={this.onItemSelect} />
        {this.state.modalOpened &&
        <FilterModal
          filters={filters}
          interests={interests}
          regions={regions}
          regionsObj={regionsObj}
          onModalClose={this.closeModal}
          onSubmit={this.handleFilterSubmit}
          cities={cities}
        />}
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests(),
  regions: selectRegionsList(),
  regionsObj: selectRegions(),
  filters: selectFilters(),
  cities: selectAllCities(),
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCities: () => dispatch(getCitiesByRegionId()),
    getRegions: () => dispatch(getRegionsList()),
    saveFilterParams: (params) => dispatch(setFilterParams(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsScreen)
