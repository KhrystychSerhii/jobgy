import React from 'react';
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, Image } from 'react-native';

// Components
import Badge from '../Badge';

import I18n from '../../I18n/index'

import { Images } from '../../Themes';
import styles from './styles';

class SubscriptionItem extends React.Component {
  static defaultProps = {
    onSelect: () => null,
    recommended: false
  };

  render() {
    const { onSelect, item, recommended, ln } = this.props;
    return (
      <View
        style={styles.subscriptionItemWrapper}
      >
        <TouchableOpacity
          activeOpacity={!item.active ? .2 : 1}
          onPress={!item.active ? () => { onSelect(item) } : null}
          style={[styles.subscriptionItem, item.active ? styles.activeSubscriptionItem : null]}
        >
          <View
            style={styles.priceWrapper}
          >
            {
              !!item.price ? <Text style={styles.priceText} numberOfLines={1}>{ item.price } &#x20aa;</Text> : null
            }
            <Text style={styles.periodText} numberOfLines={1}>{I18n.t(`translation.${item.period_title}`, {locale: ln})}</Text>
          </View>
          <View
            style={styles.descriptionWrapper}
          >
            <Text
              style={[styles.descriptionText]}
              ellipsizeMode='tail'
            >
              {I18n.t(`translation.${item.title}`, {locale: ln})}
            </Text>
          </View>
        </TouchableOpacity>
        {
          item.active && !recommended ?
            <Image
              style={styles.activeCheckmark}
              resizeMode={'contain'}
              source={Images.successCheckIcon}
            /> : null
        }
        {
          recommended ?
            <Badge
              top={0}
              right={0}
              size={40}
            >
              <Text style={styles.badgeText} numberOfLines={1}>{I18n.t(`translation.recommended`, {locale: ln})}</Text>
            </Badge> : null
        }

      </View>
    )
  }
}

SubscriptionItem.propTypes = {
  item: PropTypes.any.isRequired,
  onSelect: PropTypes.func,
  ln: PropTypes.string,
  recommended: PropTypes.bool
};

export default SubscriptionItem;
