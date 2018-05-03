import React, { Component } from 'react'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// Styles
import styles from './styles'
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { selectCategories } from '../../Redux/SettingsRedux'
import { getCategoriesList } from '../../Redux/CategoriesRedux'

import {fetchCategories} from '../../Services/Api';
import {selectLanguage} from "../../Redux/I18nRedux";

class PostJobScreen extends Component {

  state = {
    categories: []
  }

  componentDidMount() {
    getCategoriesList().then(categories => {
      this.setState({categories});
    });
  }

  onSelectCategory = (category) => {
    console.log('category', category);
    this.props.navigation.navigate('PostSubcategories', {categoryId: category.id, subcategories: category.subcategories})
  }

  onSelectDisabledCategory = (category) => {
    console.log('disable to select category => ', category);
  }

  render () {
    return (
      <Categories
        categories={this.state.categories}
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
  categories: selectCategories(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJobScreen)
