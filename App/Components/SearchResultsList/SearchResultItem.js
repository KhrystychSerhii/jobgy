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

const SearchResultItem = ({item, onSelect, userInfo}) => (
  <TouchableWithoutFeedback onPress={() => userInfo ? onSelect(item.id) : null}>
    <View style={styles.itemWrapper}>
      <View style={styles.infoWrapper}>
        <InfoItem label={I18n.t('translation.domain')} value={item.category} size='lg' />
        <InfoItem label={I18n.t('translation.typeOfServce')} value={item.serviceType} size='sm' />
        <InfoItem label={I18n.t('translation.area')} value={item.area} size='lg' />
        <InfoItem label={I18n.t('translation.workPeriod')} value={item.date} size='sm' />
      </View>
      {
        userInfo ?
          <View style={styles.arrowWrapper}>
            <Icon name='ios-arrow-back' size={40} color={Colors.black} />
          </View> : null
      }
    </View>
  </TouchableWithoutFeedback>
)

export default SearchResultItem
