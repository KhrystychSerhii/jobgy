import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import PageTitle from '../../Components/PageTitle'
import SubCategoriesList from '../SubCategoriesList'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import styles from './styles'

class SubCategories extends React.Component {
  render () {
    const {subCategories, titleImage, title, onSelectCategory, titleImageStyles, categoryImage} = this.props;
    console.log('SubCategories this.props', this.props)
    return (
      <ScreenContainer>
        <View style={styles.titleWithImagesWrapper}>
          <PageTitle title={title} />
          <Image source={titleImage} style={[styles.titleImage, titleImageStyles]} resizeMode='contain' />
        </View>
        <SubCategoriesList list={subCategories} onSelectCategory={onSelectCategory} />
      </ScreenContainer>
    )
  }
}

SubCategories.propTypes = {
  categories: PropTypes.array,
  titleImage: PropTypes.number,
  titleImageStyles: PropTypes.number,
  categoryImage: PropTypes.string,
  title: PropTypes.string,
  onSelectCategory: PropTypes.func,
}

export default SubCategories
