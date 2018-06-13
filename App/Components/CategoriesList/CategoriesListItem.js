import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles'
import GradientButton from '../GradientButton/GradientButton'
import AppConfig from '../../Config/AppConfig'
import I18n from '../../I18n'

const CategoriesListItem = ({item, onSelectCategory, parentWidth, buttonActive, onSelectDisabledCategory, border, borderColor = '#102c62', ln}) => {
  const width = parentWidth ? (parentWidth - 50) / 3 : null;
  return (
    <GradientButton
      onPress={() => {buttonActive ? onSelectCategory(item) : onSelectDisabledCategory(item) }}
      style={[styles.buttonWrapper, width && {width: width, height: width * .8}, item.isSelected && styles.selectedItemStyle, border ? {borderColor: borderColor, borderWidth: 7, padding: 3,} : {padding: 10,},  buttonActive ? null : {opacity: .5}]}
    >
      <View style={[styles.itemInner]}>
        <Image source={item.id <= 0 ? item.icon : {uri: AppConfig.baseUrl + item.icon_path}} style={[styles.image, item.size, width && {width: width / 2, height: width / 2}]} />
        <View
          style={styles.textWrapper}
        >
          <Text style={[styles.itemText, item.isSelected && styles.selectedItemText]} numberOfLines={1} ellipsizeMode='tail'>{I18n.t(item.title, {locale: ln})}</Text>
        </View>
      </View>
    </GradientButton>
  )
}

export default CategoriesListItem
// width && {height: ((width * .8) / 4), lineHeight: ((width * .8) / 4), alignSelf: 'flex-start'}
