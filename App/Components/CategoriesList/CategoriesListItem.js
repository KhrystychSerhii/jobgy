import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles'
import GradientButton from '../GradientButton/GradientButton'
import AppConfig from '../../Config/AppConfig'

const CategoriesListItem = ({item, onSelectCategory, parentWidth}) => {
  return (
    <GradientButton
      onPress={() => onSelectCategory(item.id)}
      style={[styles.buttonWrapper, parentWidth && {width: (parentWidth - 50) / 3}, item.isSelected && styles.selectedItemStyle]}
    >
      <View style={[styles.itemInner]}>
        <Image source={{uri: AppConfig.baseUrl + item.icon_path}} style={[styles.image, item.size]} />
        <Text style={[styles.itemText, item.isSelected && styles.selectedItemText]}>{item.title}</Text>
      </View>
    </GradientButton>
  )
}

export default CategoriesListItem
