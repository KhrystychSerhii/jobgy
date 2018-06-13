import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import Images from '../../Themes/Images'
import AppConfig from '../../Config/AppConfig'


const PageTitle = ({title, children, large, textStyle, style, leftImage, rightImage}) => {
  const _style = large ? styles.titleLarge : styles.title;
  return (
    <View style={[styles.titleWrapper, style]}>
      <View style={styles.textWrapper}>
        {
          !!leftImage ?
            <Image source={typeof leftImage === 'number' ? leftImage : {uri: AppConfig.baseUrl + leftImage}} style={styles.leftImage} resizeMode='contain' /> : null
        }
        <View style={[styles.textContainer, (!!leftImage || !!rightImage) ? styles.textWrapperPadding : {marginLeft: 'auto', marginRight: 'auto'}]}>
          <Text style={[_style, textStyle, {alignItems: 'center'}]}>{title}</Text>
        </View>
        {
          !!rightImage ?
            <Image source={typeof rightImage === 'number' ? rightImage : {uri: AppConfig.baseUrl + rightImage}} style={styles.rightImage} resizeMode='contain' /> : null
        }
      </View>
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
