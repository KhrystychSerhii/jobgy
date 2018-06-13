import React from 'react'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors } from '../../Themes'
import I18n from '../../I18n'

import styles from './styles'

const InfoItem = ({label, value, size}) => (
  <View style={{width: size === 'lg' ? '40%' : '60%'}}>
    <Text style={styles.itemLabel}>{label}</Text>
    <Text style={styles.itemValue} numberOfLines={1}>{value}</Text>
  </View>
)

const SearchResultItem = ({item, onSelect, userInfo, ln}) => (
  <TouchableWithoutFeedback onPress={() => onSelect(item.id)}>
    <View style={styles.itemWrapper}>
      <View style={styles.infoWrapper}>
        <View style={[styles.infoRow, {paddingBottom: 10}]}>

          <View style={[styles.valueWrapper, {width: '60%'}]}>
            <Text style={styles.label}>
              {I18n.t('translation.typeOfServce', {locale: ln})}
            </Text>
            <Text style={styles.info}>
              {item.serviceType}
            </Text>
          </View>

          <View style={[styles.valueWrapper, {width: '40%'}]}>
            <Text style={styles.label}>
              {I18n.t('translation.domain', {locale: ln})}
            </Text>
            <Text style={styles.info}>
              {item.category}
            </Text>
          </View>

        </View>
        <View style={styles.infoRow}>
          <View style={[styles.valueWrapper, {width: '60%'}]}>
            <Text style={styles.label}>
              {I18n.t('translation.workPeriod', {locale: ln})}
            </Text>
            <Text style={styles.info}>
              {item.date}
            </Text>
          </View>
          <View style={[styles.valueWrapper, {width: '40%'}]}>
            <Text style={styles.label}>
              {I18n.t('translation.regionFrom', {locale: ln})}
            </Text>
            <Text style={styles.info}>
              {item.area}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.arrowWrapper}>
        <Icon name='ios-arrow-back' size={40} color={Colors.black} />
      </View>
    </View>
  </TouchableWithoutFeedback>
)

export default SearchResultItem
