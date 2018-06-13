import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { sortBy, get } from 'lodash'


import { selectLanguage } from '../../Redux/I18nRedux'
import { selectCategoriesList, getCategoriesList } from '../../Redux/CategoriesRedux'
import { getAttributesList } from '../../Redux/AttributesRedux';

import Categories from '../../Components/Categories/Categories'

import I18n from '../../I18n'

import { Images } from '../../Themes'


class WrappedPostCategories extends Component {

  onSelectCategory = (category) => {
    console.log('select category', category);

    if (category.subcategories && category.subcategories.length === 1) {
      this.props.getAttributesList(category.subcategories[0].id).then(() => {
        this.props.navigation.navigate('JobForm', {
          category: category,
          subcategory: category.subcategories[0]
        });
      });
    } else {
      this.props.navigation.navigate('PostSubcategories', {
        category: category,
        subcategories: category.subcategories
      })
    }
  }

  onSelectDisabledCategory = (category) => {
    console.log('select disabled category', category);
    // todo: show modal
  }

  render() {
    const { categories, ln } = this.props
    const category = get(this.props.navigation, 'state.params.category');

    return (
      <Categories
        categories={categories.filter(item => item.is_grouped)}
        titleImage={Images.postDude}
        title={I18n.t('translation.findAnAdd', {locale: ln})}
        leftImage={category.icon}
        isButtonActiveProperty={'is_available'}
        onSelectCategory={this.onSelectCategory}
        onSelectDisabledCategory={this.onSelectDisabledCategory}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList()),
    getAttributesList: (id) => dispatch(getAttributesList(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedPostCategories)
