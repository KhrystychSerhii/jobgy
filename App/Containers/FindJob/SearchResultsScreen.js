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
import { selectAttributesList } from '../../Redux/AttributesRedux'
import { selectFilters, setFilterParams, clearFilterParams } from '../../Redux/FilterRedux'
import { selectUserInfo } from '../../Redux/UserRedux'
import { selectLanguage } from '../../Redux/I18nRedux';

class SearchResultsScreen extends Component {
  state = {
    modalOpened: false,
    results: [],
  }

  componentDidMount () {
    this.getResults(this.props.navigation.state.params.subcategoryId);
    // this.getAttributes(this.props.navigation.state.params.subcategoryId);
  }

  getResults = (categoryId, params) => {
    return fetchPostsByCategory(categoryId, params)
      .then(response => {
        console.log('response fetchPostsByCategory', response);
        console.log('categoryId fetchPostsByCategory', categoryId);
        console.log('params fetchPostsByCategory', params);
        if (response.ok) {
          let results = response.data.data.map((item) => {
            return {
              id: item.id,
              serviceType: item.service ? item.service.title : '',
              area: item.location_from ? item.location_from.title : '',
              date: `${item.work_period_from}-${item.work_period_to}`,
              category: item.category ? item.category.title : ''
            }
          });

          this.setState({results});
          return response.data.data;
        }
      })
  }

  // getAttributes = (id) => {
  //   return getAttributesList(id)
  //     .then(response => {
  //       console.log(`response for id ${id} => `, response);
  //     })
  //     .catch(error => {
  //       console.log('error => ', error);
  //     });
  // }

  openModal = () => {
    this.setState({modalOpened: true})
  }

  closeModal = () => {
    this.setState({modalOpened: false})
  }

  onItemSelect = (id) => {
    // console.log('selected item with id')
    this.props.navigation.navigate('Details', {postId: id})
  }

  handleFilterSubmit = (params) => {
    // todo: переделать по нормальному!
    let filters = {};
    for (let key in params) {
      if (typeof params[key] === 'object' && params[key].length && params[key].length > 0) {
        filters[key] = params[key]
      }
      if ((typeof params[key] === 'string' || typeof params[key] === 'number') && params[key]) {
        filters[key] = params[key]
      }
    }
console.log('params ==> ', params);
console.log('filters ==> ', filters);
    const categoryId = this.props.navigation.state.params.subcategoryId;
    this.closeModal()
    this.props.saveFilterParams(params);
    return this.getResults(categoryId, filters)
  }

  handleFilterReset = () => {
    this.props.clearFilterParams();
    const categoryId = this.props.navigation.state.params.subcategoryId;
    this.getResults(categoryId);
  }

  render () {
    const {interests, regions, regionsObj, cities, userInfo, attributes, ln, filters} = this.props
    return (
      <ScreenContainer noPadding>
        <View style={styles.titleWithImagesWrapper}>
          <Image source={images.buildingImg} style={styles.resultsTitleImageLeft} resizeMode='contain' />
          <PageTitle textStyle={{fontSize: 20}} title={I18n.t('translation.searchAdsInCategory', {category: 'todo!'})} />
          <Image source={images.findDude} style={styles.resultsTitleImage} resizeMode='contain' />
        </View>
        <View>
          <Text style={styles.countText}>{I18n.t('translation.recordsAreFound', {locale: ln, count: this.state.results.length})}</Text>
          <FormButton
            onPress={this.openModal}
            icon={images.filterIcon}
            style={styles.btnStyle}
            textStyle={styles.btnTextStyle}
          >
            {I18n.t('translation.filterAd', {locale: ln})}
          </FormButton>
        </View>
        <SearchResultsList results={this.state.results} onSelect={this.onItemSelect} userInfo={userInfo} />
        {this.state.modalOpened &&
        <FilterModal
          filters={filters}
          interests={interests}
          regions={regions}
          regionsObj={regionsObj}
          onModalClose={this.closeModal}
          onSubmit={this.handleFilterSubmit}
          onReset={this.handleFilterReset.bind(this)}
          cities={cities}
          ln={ln}
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
  userInfo: selectUserInfo(),
  ln: selectLanguage(),
  attributes: selectAttributesList()
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCities: () => dispatch(getCitiesByRegionId()),
    getRegions: () => dispatch(getRegionsList()),
    saveFilterParams: (params) => dispatch(setFilterParams(params)),
    clearFilterParams: (params) => dispatch(clearFilterParams(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsScreen)
