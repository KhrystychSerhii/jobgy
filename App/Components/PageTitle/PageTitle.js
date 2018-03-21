import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import Images from '../../Themes/Images'

const PageTitle = ({title, children, large, textStyle, style}) => {
  const _style = large ? styles.titleLarge : styles.title;
  return (
    <View style={[styles.titleWrapper, style]}>
      <Text style={[_style, textStyle]}>{title}</Text>
      <Image source={Images.pageTitleBorder} style={styles.border} />
      {children}
    </View>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string,
  large: PropTypes.bool,

}

export default PageTitle
