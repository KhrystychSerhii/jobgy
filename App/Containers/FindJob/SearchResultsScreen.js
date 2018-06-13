import React, { Component } from 'react'
import { Image, View, Text, ActivityIndicator } from 'react-native'
import { createStructuredSelector } from 'reselect'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import { get, isArray } from 'lodash'
// Styles
import styles from './styles'
import images from '../../Themes/Images'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'
import FormButton from '../../Components/FormButton'
import SearchResultsList from '../../Components/SearchResultsList'
import FilterModal from './FilterModal'
import LoginModal from '../../Components/LoginModal'
import { fetchCategoryData, fetchPostsByCategory } from '../../Services/Api'
import httpClient from '../../Services/Http'
import { login } from '../../Redux/AuthRedux'
import {
  getCitiesByRegionId, getRegionsList, selectAllCities, selectInterests, selectRegions,
  selectRegionsList,
} from '../../Redux/SettingsRedux'
import { selectAttributesList, getAttributesList } from '../../Redux/AttributesRedux'
import { selectFilters, setFilterParams, clearFilterParams } from '../../Redux/FilterRedux'
import { selectUserInfo, getCurrentUser, updateNotificationToken } from '../../Redux/UserRedux'

import { selectLanguage } from '../../Redux/I18nRedux';

class SearchResultsScreen extends Component {
  state = {
    filterModalOpened: false,
    loginModalOpen: false,
    filters: null,
    results: [],
    spinner: true,
    selectedItemId: null
  };

  componentDidMount () {
    const subcategory = get(this.props.navigation, 'state.params.subcategory');
    this.getResults(subcategory.id);
    this.props.getAttributesList(subcategory.id);
  }

  getResults = (categoryId, params) => {
    this.setState({spinner: true});
    return fetchPostsByCategory(categoryId, params)
      .then(response => {
        if (response.ok) {
          let results = response.data.data.map((item) => {
            return {
              id: item.id,
              serviceType: (item.service && item.service.title) ? item.service.title : '...',
              area: (item.location_from && item.location_from.title) ? item.location_from.title : '...',
              date: `${item.work_period_to || '...'} - ${item.work_period_from || '...'}`,
              category: (item.category && item.category.title) ? item.category.title : '...'
            }
          });

          this.setState({spinner: false});
          this.setState({results});
          return response.data.data;
        }
      })
  }

  openFilterModal = () => {
    this.setState({filterModalOpened: true})
  }

  closeFilterModal = () => {
    this.setState({filterModalOpened: false})
  }

  openLoginModal = () => {
    this.setState({loginModalOpen: true});
  }

  closeLoginModal = () => {
    this.setState({selectedItemId: null});
    this.setState({loginModalOpen: false});
  }

  login = async (data) => {
    const loginResponse = await this.props.login(data);
    const success = !!loginResponse.data.token;
    if (success) {
      const setTokenResponse = await httpClient.setToken(loginResponse.data.token);
      const currentUser = await this.props.getCurrentUser();
      const updateNotificationTokenResponse = await this.props.updateNotificationToken();
      const postId = this.state.selectedItemId;
      this.closeLoginModal();
      this.props.navigation.navigate('Details', {postId, showCallButton: true});

    } else {
      throw loginResponse.data;
    }
  };

  onCreateAccountPress = () => {
    this.closeLoginModal();
    this.props.screenProps.drawerNavigation.navigate('Register');
  };

  onForgotPasswordPress = () => {
    this.closeLoginModal();
    this.props.screenProps.drawerNavigation.navigate('ForgotPassword');
  };

  onItemSelect = (id) => {
    const { userInfo } = this.props;

    if (!!userInfo) {
      this.props.navigation.navigate('Details', {postId: id, showCallButton: true});
    } else {
      this.setState({selectedItemId: id}, () => {
        this.openLoginModal();
      });
    }
  };

  handleFilterSubmit = (params) => {
    console.log('this.props ==> ', this.props);
    console.log('params ==> ', params);
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

    const categoryId = this.props.navigation.state.params.subcategory.id;

    this.setState({filters});
    this.closeFilterModal();

    return this.getResults(categoryId, filters);
  };

  handleFilterReset = () => {
    this.props.clearFilterParams();
    let filters = this.state.filters;
    for (let key in filters) {
      if (isArray(filters[key])) {
        filters[key] = [];
      } else {
        filters[key] = '';
      }
    }

    this.setState({filters});
    const categoryId = this.props.navigation.state.params.subcategory.id;
    this.getResults(categoryId);
  };

  render () {
    const {interests, regions, regionsObj, cities, userInfo, attributes, ln, login} = this.props;
    const {category, subcategory} = this.props.navigation.state.params;

    return (
      <ScreenContainer noPadding>
        <View style={styles.titleWithImagesWrapper}>
          <PageTitle textStyle={{fontSize: 20}}
                     leftImage={subcategory.icon_path}
                     rightImage={images.findDude}
                     title={I18n.t('translation.searchAdsInCategory', {locale: ln, category: category.title})} />
        </View>
        <View>
          <Text style={styles.countText}>{I18n.t('translation.recordsAreFound', {locale: ln, count: this.state.results.length})}</Text>
          <FormButton
            onPress={this.openFilterModal}
            icon={images.filterIcon}
            style={styles.btnStyle}
            textStyle={styles.btnTextStyle}
          >
            {I18n.t('translation.filterAd', {locale: ln})}
          </FormButton>
        </View>
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#fff" /> :
            <SearchResultsList results={this.state.results} onSelect={this.onItemSelect} userInfo={userInfo} ln={ln} />
        }

        {this.state.filterModalOpened &&
        <FilterModal
          isUserPremium={!!userInfo && userInfo.is_premium}
          attributes={attributes}
          filters={this.state.filters}
          interests={interests}
          regions={regions}
          regionsObj={regionsObj}
          onModalClose={this.closeFilterModal}
          onSubmit={this.handleFilterSubmit}
          onReset={this.handleFilterReset.bind(this)}
          cities={cities}
          ln={ln}
        />}
        {
          this.state.loginModalOpen &&
          <LoginModal
            modalVisible={this.state.loginModalOpen}
            onLogin={this.login}
            onDismiss={this.closeLoginModal}
            onCreateAccountPress={this.onCreateAccountPress}
            onForgotPasswordPress={this.onForgotPasswordPress}
          />
        }
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests(),
  regions: selectRegionsList(),
  regionsObj: selectRegions(),
  // filters: selectFilters(),
  cities: selectAllCities(),
  userInfo: selectUserInfo(),
  ln: selectLanguage(),
  attributes: selectAttributesList()
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: (data) => dispatch(getCurrentUser(data)),
    updateNotificationToken: () => dispatch(updateNotificationToken()),
    login: (data) => dispatch(login(data)),
    getCities: () => dispatch(getCitiesByRegionId()),
    getRegions: () => dispatch(getRegionsList()),
    // saveFilterParams: (params) => dispatch(setFilterParams(params)),
    clearFilterParams: (params) => dispatch(clearFilterParams(params)),
    getAttributesList: (id) => dispatch(getAttributesList(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsScreen)
