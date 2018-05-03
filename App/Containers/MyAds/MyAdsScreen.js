import React from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import { getAdsList } from '../../Redux/AdsRedux';

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

const AdItem = ({ad, adType, ln}) => {
  return (
    <View style={styles.adItemWrapper}>
      <View
        style={styles.adItemContent}
      >
        {
            <View
              style={styles.adItemContentRow}
            >
              {
                adType === 'inactive' ?
                  <View
                    style={styles.activeAdItemContentButton}
                  >
                    <TouchableOpacity
                      style={[styles.adItemButton, styles.blueButton]}
                    >
                      <Text
                        style={styles.buttonText}
                      >
                        {I18n.t('translation.rate', { locale: ln })}
                      </Text>
                    </TouchableOpacity>
                  </View> : null
              }
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
                style={styles.activeAdItemContentInfo}
              >
                <Text>
                  {I18n.t('translation.domain', { locale: ln })}
                </Text>
                <Text>
                  {ad && ad.category ? ad.category.title : ''}
                </Text>
              </View>

              {
                adType === 'active' ?
                  <View
                    style={styles.activeAdItemContentButton}
                  >
                    <TouchableOpacity
                      style={[styles.adItemButton, styles.redButton]}
                    >
                      <Text
                        style={styles.buttonText}
                      >
                        {I18n.t('translation.close', { locale: ln })}
                      </Text>
                    </TouchableOpacity>
                  </View> : null
              }

            </View>
        }

        <View
          style={styles.adItemContentRow}
        >
          <View
            style={styles.activeAdItemContentInfo}
          >
            <Text>
              {I18n.t('translation.workPeriod', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.work_period_from && ad.work_period_to ? `${ad.work_period_to} - ${ad.work_period_from}` : ''}
            </Text>
          </View>

          <View
            style={styles.activeAdItemContentInfo}
          >
            <Text>
              {I18n.t('translation.area', { locale: ln })}
            </Text>
            <Text>
              {ad && ad.location_from ? ad.location_from.title : ''}
            </Text>
          </View>

          {
            adType === 'active' ?
              <View
                style={styles.activeAdItemContentButton}
              >
                <TouchableOpacity
                  style={[styles.adItemButton, styles.greenButton]}
                >
                  <Text
                    style={styles.buttonText}
                  >
                    {I18n.t('translation.jump', { locale: ln })}
                  </Text>
                </TouchableOpacity>
              </View> : null
          }
        </View>
      </View>
      <View
        style={styles.adItemFooter}
      >
        <View
          style={styles.adItemFooterInnerPart}
        >
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
    </View>
  )
}

class MyAdsScreen extends React.Component {
  state = {
    adsType: 'active',
    spinner: true,
    ads: []
  }

  componentDidMount() {
    this._getAdsList = this._getAdsList.bind(this);
    this._getAdsList(this.state.adsType);
  }

  changeViewedAds(adsType) {
    this._getAdsList(adsType);
  }

  keyExtractor = (item, index) => index;

  ///
  _getAdsList(adsType) {
    this.setState({spinner: true});
    getAdsList(adsType).then(ads => {
      this.setState({adsType});
      this.setState({spinner: false});
      this.setState({ads})
    });
  }

  render() {
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
              data={this.state.ads}
              extraData={this.state}
              renderItem={({item}) =>
                <AdItem ad={item} adType={this.state.adsType} ln={this.props.ln} />
              }
            />
        }
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAdsScreen);

