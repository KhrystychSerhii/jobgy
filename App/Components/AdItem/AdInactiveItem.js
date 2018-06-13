import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import get from 'lodash/get';

import I18n from '../../I18n'

import styles from './styles';

class AdInactiveItem extends React.Component {
  static defaulProps = {
    onItemPressed: () => null,
    onRatingPressed: () => null,
  };

  render() {
    const {ad, onItemPressed, onRatingPressed, ln} = this.props;
    const typeOfService = get(ad, 'service.title');
    const domain = get(ad, 'category.title');
    const area = get(ad, 'location_from.title');

    return (
      <TouchableOpacity onPress={() => { onItemPressed(ad.id) }} style={styles.itemWrapper}>
        <View style={styles.top}>
          <View style={[styles.itemInner]}>
            <View style={styles.contentContainer_25}>
              <TouchableOpacity onPress={() => { onRatingPressed(ad) }} style={[styles.button, styles.ratingButton]}>
                <Text style={styles.buttonText}>{I18n.t('translation.rate', {locale: ln})}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contentContainer_75}>
              <View style={styles.contentContainer_50}>
                <View style={styles.propertyWrapper}>
                  <Text style={styles.label} numberOfLines={1}>
                    {I18n.t('translation.domain', {locale: ln})}
                  </Text>
                  <Text style={styles.text}>
                    {domain}
                  </Text>
                </View>
              </View>
              <View style={styles.contentContainer_50}>
                <View style={styles.propertyWrapper}>
                  <Text style={styles.label} numberOfLines={1}>
                    {I18n.t('translation.typeOfServce', {locale: ln})}
                  </Text>
                  <Text style={styles.text}>
                    {typeOfService}
                  </Text>
                </View>

              </View>
            </View>
          </View>
          <View style={[styles.itemInner]}>

            <View style={styles.contentContainer_25}></View>

            <View style={styles.contentContainer_75}>
              <View style={styles.contentContainer_50}>
                <View style={styles.propertyWrapper}>
                  <Text style={styles.label} numberOfLines={1}>
                    {I18n.t('translation.workPeriod', {locale: ln})}
                  </Text>
                  <Text style={styles.text}>
                    {`${ad.work_period_to} - ${ad.work_period_from}`}
                  </Text>
                </View>
              </View>
              <View style={styles.contentContainer_50}>
                <View style={styles.propertyWrapper}>
                  <Text style={styles.label} numberOfLines={1}>
                    {I18n.t('translation.area', {locale: ln})}
                  </Text>
                  <Text style={styles.text}>
                    {area}
                  </Text>
                </View>
              </View>

            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={[styles.itemInner]}>
            <View style={styles.contentContainer_50}>
              <View style={styles.propertyWrapper}>
                <Text style={styles.footerText} numberOfLines={1}>
                  {I18n.t('translation.publicationDate', {locale: ln})}
                </Text>
                <Text style={styles.footerText}>
                  {ad.publication_date}
                </Text>
              </View>
            </View>
            <View style={styles.contentContainer_50}>
              <View style={styles.propertyWrapper}>
                <Text style={styles.footerText} numberOfLines={1}>
                  {I18n.t('translation.adNumber', {locale: ln})}
                </Text>
                <Text style={styles.footerText}>
                  {ad.id}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

AdInactiveItem.propTypes = {
  ad: PropTypes.any.isRequired,
  onItemPressed: PropTypes.func,
  onRatingPressed: PropTypes.func,
  ln: PropTypes.string
};

export default AdInactiveItem;
