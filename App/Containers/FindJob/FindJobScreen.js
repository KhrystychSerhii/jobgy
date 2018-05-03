import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import I18n from '../../I18n'
// Styles
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { selectCategories } from '../../Redux/SettingsRedux'
import { getCategoriesList } from '../../Redux/CategoriesRedux'
import { selectLanguage } from '../../Redux/I18nRedux';

class FindJobScreen extends Component {

  state = {
    categories: []
  };

  componentDidMount() {
    getCategoriesList().then(categories => {
      this.setState({categories});
    });
  }

  onSelectCategory = (category) => {
    this.props.navigation.navigate('FindSubcategories', {categoryId: category.id, subCategories: category.subcategories})
  }

  onSelectDisabledCategory = (category) => {
    console.log('disable to select category', category);
  };

  render () {
    console.log('this.props.categories => ', this.props.categories);
    return (
      <Categories
        categories={this.state.categories}
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
  categories: selectCategories(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FindJobScreen)
