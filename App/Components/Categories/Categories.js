import React from 'react'
import PropTypes from 'prop-types'
import { View, Image } from 'react-native'
import PageTitle from '../../Components/PageTitle'
import CategoriesList from '../CategoriesList'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import styles from './styles'

class Categories extends React.Component {
  render () {
    const {categories, titleImage, leftImage, title, onSelectCategory, titleImageStyles, isButtonActiveProperty, onSelectDisabledCategory, ln, spinner} = this.props;
    return (
      <ScreenContainer>
        <View style={[styles.titleWithImagesWrapper]}>
          <PageTitle title={title} rightImage={titleImage} leftImage={leftImage} />
        </View>
        {/* todo: если одна категория в списке подкатерий, сразу напрвлять на нее */}
        <CategoriesList
          spinner={spinner}
          ln={ln}
          categories={categories}
          onSelectCategory={onSelectCategory}
          onSelectDisabledCategory={onSelectDisabledCategory}
          isButtonActiveProperty={isButtonActiveProperty} />
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
  onSelectDisabledCategory: PropTypes.func,
  isButtonActiveProperty: PropTypes.string
}

export default Categories
