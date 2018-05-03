import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles'
import GradientButton from '../GradientButton/GradientButton'
import AppConfig from '../../Config/AppConfig'

const CategoriesListItem = ({item, onSelectCategory, parentWidth, buttonActive, onSelectDisabledCategory}) => {
  return (
    <GradientButton
      onPress={() => {buttonActive ? onSelectCategory(item) : onSelectDisabledCategory(item) }}
      style={[styles.buttonWrapper, parentWidth && {width: (parentWidth - 50) / 3}, item.isSelected && styles.selectedItemStyle, {padding: 5}, buttonActive ? null : {opacity: .5}]}
    >
      <View style={[styles.itemInner]}>
        <Image source={{uri: AppConfig.baseUrl + item.icon_path}} style={[styles.image, item.size]} />
        <Text style={[styles.itemText, item.isSelected && styles.selectedItemText]} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
      </View>
    </GradientButton>
  )
}

export default CategoriesListItem
