import React, { Component } from 'react'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// Styles
import styles from './styles'
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { selectCategoriesList, getCategoriesList } from '../../Redux/CategoriesRedux'

import { selectLanguage } from '../../Redux/I18nRedux';
import { getAttributesList } from '../../Redux/AttributesRedux'

class PostJobScreen extends Component {

  state = {
    categories: []
  }

  componentDidMount() {
    this.props.getCategoriesList()
  }

  onSelectCategory = (category) => {
    console.log('category', category);
    if (category.subcategories && category.subcategories.length === 1) {
      this.props.getAttributesList(category.subcategories[0].id);
      this.props.navigation.navigate('JobForm', {categoryId: category.id, subcategoryId: category.subcategories[0].id});
    } else {
      this.props.navigation.navigate('PostSubcategories', {categoryId: category.id, subCategories: category.subcategories})
    }
    // this.props.navigation.navigate('PostSubcategories', {categoryId: category.id, subcategories: category.subcategories})
  }

  onSelectDisabledCategory = (category) => {
    console.log('disable to select category => ', category);
  }

  render () {
    return (
      <Categories
        categories={this.props.categories}
        titleImage={images.postDude}
        title={I18n.t('translation.postAnAdd', {locale: this.props.ln})}
        isButtonActiveProperty={'is_available_for_create'}
        onSelectCategory={this.onSelectCategory}
        onSelectDisabledCategory={this.onSelectDisabledCategory}
        titleImageStyles={styles.titleImage}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList()),
    getAttributesList: () => dispatch(getAttributesList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJobScreen)
