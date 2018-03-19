import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import PageTitle from '../../Components/PageTitle'
import CategoriesList from '../CategoriesList'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import styles from './styles'

class Categories extends React.Component {
  render () {
    const {categories, titleImage, title, onSelectCategory, titleImageStyles} = this.props;
    return (
      <ScreenContainer>
        <View style={styles.titleWithImagesWrapper}>
          <PageTitle title={title} />
          <Image source={titleImage} style={[styles.titleImage, titleImageStyles]} resizeMode='contain' />
        </View>
        <CategoriesList categories={categories} onSelectCategory={onSelectCategory} />
      </ScreenContainer>
    )
  }
}

Categories.propTypes = {
  categories: PropTypes.array,
  titleImage: PropTypes.number,
  titleImageStyles: PropTypes.number,
  title: PropTypes.string,
  onSelectCategory: PropTypes.func,
}

export default Categories
