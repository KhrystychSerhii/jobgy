import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import I18n from '../../I18n'
// Styles
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { selectCategoriesList, getCategoriesList } from '../../Redux/CategoriesRedux'
import { selectLanguage } from '../../Redux/I18nRedux';

class FindJobScreen extends Component {

  state = {
    categories: []
  };

  componentDidMount() {
    this.props.getCategoriesList()
  }

  onSelectCategory = (category) => {
    if (category.subcategories && category.subcategories.length === 1) {
      this.props.navigation.navigate('Results', {categoryId: category.id, subcategoryId: category.subcategories[0].id});
    } else {
      this.props.navigation.navigate('FindSubcategories', {categoryId: category.id, subCategories: category.subcategories})
    }
  }

  onSelectDisabledCategory = (category) => {
    console.log('disable to select category', category);
  };

  render () {
    console.log('this.props.categories => ', this.props.categories);
    return (
      <Categories
        categories={this.props.categories}
        titleImage={images.findDude}
        title={I18n.t('translation.findAnAdd', {locale: this.props.ln})}
        isButtonActiveProperty={'is_available'}
        onSelectCategory={this.onSelectCategory}
        onSelectDisabledCategory={this.onSelectDisabledCategory}
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
    getCategoriesList: () => dispatch(getCategoriesList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindJobScreen)
