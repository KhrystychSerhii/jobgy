import React from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import { selectAdsList, getAdsList, jumpActiveAd, cancelActiveAd, getAdRating } from '../../Redux/AdsRedux';
import { getQuestions } from '../../Redux/QuestionsRedux';

import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'
import { selectLanguage } from '../../Redux/I18nRedux';

const AdsTypesButtons = ({activeType = 'active', onPress, ln}) => {
  return (
    <View
      style={styles.buttonsWrapper}
    >

      <TouchableOpacity
        style={[styles.button, activeType === 'active' ? styles.activeButton : styles.inactiveButton]}
        onPress={() => {onPress('active')}}
      >
        <Text style={styles.buttonText}>
          {I18n.t('translation.activeAds', { locale: ln })}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, activeType === 'inactive' ? styles.activeButton : styles.inactiveButton]}
        onPress={() => {onPress('inactive')}}
      >
        <Text style={styles.buttonText}>
          {I18n.t('translation.inactiveAds', { locale: ln })}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const ActiveAdItem = ({ad, onItemSelect, jumpAd, cancelAd, ln}) => {
  return (
    <TouchableOpacity onPress={() => { onItemSelect(ad.id) }} style={styles.adItemWrapper}>
      <View
        style={styles.adItemContent}>
        <View
          style={styles.adItemContentRow}>
          <View
            style={styles.activeAdItemContentInfo}
          >
            <Text>
              {I18n.t('translation.typeOfServce', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.service ? ad.service.title : ''}
            </Text>
          </View>

          <View
            style={styles.activeAdItemContentInfo}>
            <Text>
              {I18n.t('translation.domain', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.category ? ad.category.title : ''}
            </Text>
          </View>
          <View
            style={styles.activeAdItemContentButton}>
            <TouchableOpacity
              onPress={() => { cancelAd(ad.id) }}
              style={[styles.adItemButton, styles.redButton]}>
              <Text
                style={styles.buttonText}>
                {I18n.t('translation.close', { locale: ln })}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        <View
          style={styles.adItemContentRow}>
          <View
            style={styles.activeAdItemContentInfo}>
            <Text>
              {I18n.t('translation.workPeriod', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.work_period_from && ad.work_period_to ? `${ad.work_period_to} - ${ad.work_period_from}` : ''}
            </Text>
          </View>

          <View
            style={styles.activeAdItemContentInfo}>
            <Text>
              {I18n.t('translation.area', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.location_from ? ad.location_from.title : ''}
            </Text>
          </View>
          <View
            style={styles.activeAdItemContentButton}>
            <TouchableOpacity
              onPress={() => { jumpAd(ad.id) }}
              activeOpacity={ad.can_jump ? .2 : 1}
              style={[styles.adItemButton, ad.can_jump ? styles.greenButton : styles.disabledGreenButton]}>
              <Text
                style={styles.buttonText}>
                {I18n.t('translation.jump', { locale: ln })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={styles.adItemFooter}>
        <View
          style={styles.adItemFooterInnerPart}>
          <Text>
            {I18n.t('translation.publicationDate', { locale: ln })}
          </Text>
          <Text>
            { ad && ad.publication_date ? ad.publication_date : '' }
          </Text>
        </View>
        <View>
          <Text>
            {I18n.t('translation.adNumber', { locale: ln })}
          </Text>
          <Text>
            { ad && ad.id ? ad.id : '' }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const InactiveAdItem = ({ad, onItemSelect, goToRatingPage, ln}) => {
  return (
    <TouchableOpacity onPress={() => { onItemSelect(ad.id) }} style={styles.adItemWrapper}>
      <View
        style={styles.adItemContent}>
        <View
          style={styles.adItemContentRow}>
          <View
            style={styles.activeAdItemContentButton}>
            <TouchableOpacity
              onPress={() => { goToRatingPage(ad.id) }}
              style={[styles.adItemButton, styles.blueButton]}>
              <Text
                style={styles.buttonText}>
                {I18n.t('translation.rate', { locale: ln })}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={styles.activeAdItemContentInfo}>
            <Text>
              {I18n.t('translation.typeOfServce', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.service ? ad.service.title : ''}
            </Text>
          </View>

          <View
            style={styles.activeAdItemContentInfo}>
            <Text>
              {I18n.t('translation.domain', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.category ? ad.category.title : ''}
            </Text>
          </View>

        </View>

        <View
          style={styles.adItemContentRow}>
          <View
            style={styles.activeAdItemContentInfo}>
            <Text>
              {I18n.t('translation.workPeriod', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.work_period_from && ad.work_period_to ? `${ad.work_period_to} - ${ad.work_period_from}` : ''}
            </Text>
          </View>

          <View
            style={styles.activeAdItemContentInfo}>
            <Text>
              {I18n.t('translation.area', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.location_from ? ad.location_from.title : ''}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={styles.adItemFooter}>
        <View
          style={styles.adItemFooterInnerPart}>
          <Text>
            {I18n.t('translation.publicationDate', { locale: ln })}
          </Text>
          <Text>
            { ad && ad.publication_date ? ad.publication_date : '' }
          </Text>
        </View>
        <View>
          <Text>
            {I18n.t('translation.adNumber', { locale: ln })}
          </Text>
          <Text>
            { ad && ad.id ? ad.id : '' }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

class MyAdsScreen extends React.Component {
  state = {
    adsType: 'active',
    spinner: true,
    ads: []
  }

  componentDidMount() {
    // this.props.getAdsList(this.state.adsType);
    this._getAdsList = this._getAdsList.bind(this);
    this._getAdsList(this.state.adsType);
  }

  changeViewedAds(adsType) {
    this._getAdsList(adsType);
  }

  onItemSelect(id) {
    this.props.navigation.navigate('Details', {postId: id})
  }

  goToRatingPage(id) {
    console.log('go to rating page', id);
    Promise.all([
      this.props.getQuestions(),
      this.props.getAdRating(id)
    ]).then(response => {
      this.props.navigation.navigate('Rating', {postId: id})
    });
  }

  keyExtractor = (item, index) => index;

  ///
  _getAdsList(adsType) {
    this.setState({spinner: true});
    this.props.getAdsList(adsType).then(() => {
      this.setState({adsType});
      this.setState({spinner: false});
    });
    // this.setState({spinner: true});
    // getAdsList(adsType).then(ads => {
    //   this.setState({adsType});
    //   this.setState({spinner: false});
    //   this.setState({ads})
    // });
  }

  render() {
    const { ads } = this.props;
    return (
      <ScreenContainer noPadding={true}>
        <PageTitle title={I18n.t('translation.adsIHavePosted', { locale: this.props.ln })} />
        <AdsTypesButtons activeType={this.state.adsType} onPress={this.changeViewedAds.bind(this)} ln={this.props.ln} />
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#fff" /> :
            <FlatList
              numColumns={1}
              keyExtractor={this.keyExtractor}
              data={ads}
              extraData={this.state}
              renderItem={({item}) =>
                this.state.adsType === 'active' ?
                  <ActiveAdItem ad={item} onItemSelect={this.onItemSelect.bind(this)} jumpAd={this.props.jumpAd} cancelAd={this.props.cancelAd} ln={this.props.ln} /> :
                  <InactiveAdItem ad={item} onItemSelect={this.onItemSelect.bind(this)} goToRatingPage={this.goToRatingPage.bind(this)} ln={this.props.ln} />
              }
            />
        }
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ads: selectAdsList(),
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAdsList: (type) => dispatch(getAdsList(type)),
    jumpAd: (id) => dispatch(jumpActiveAd(id)),
    cancelAd: (id) => dispatch(cancelActiveAd(id)),
    getAdRating: (id) => dispatch(getAdRating(id)),
    getQuestions: () => dispatch(getQuestions())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAdsScreen);
