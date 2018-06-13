import React, { Component } from 'react'
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { sortBy, get } from 'lodash'

import { BlockedCategoryModal } from '../../Components/BlockedCategoryModal'

import { selectLanguage } from '../../Redux/I18nRedux'
import { selectCategoriesList, getCategoriesList } from '../../Redux/CategoriesRedux'

import Categories from '../../Components/Categories/Categories'

import I18n from '../../I18n'

import { Images } from '../../Themes'


class WrappedFindCategories extends Component {

  state = {
    selectedCategory: null,
    disabledCategoryModalVisible: false
  }

  componentDidMount() {
    console.log('WrappedFindCategories this.props', this.props);
  }

  onSelectCategory = (category) => {
    if (category.subcategories && category.subcategories.length === 1) {
      this.props.navigation.navigate('Results', {
        category: category,
        subcategory: category.subcategories[0]
      });
    } else {
      this.props.navigation.navigate('FindSubcategories', {
        category: category,
        subCategories: category.subcategories,
      })
    }
  }

  onSelectDisabledCategory = (category) => {
    this.setState({selectedCategory: category}, () => {
      this.setState({disabledCategoryModalVisible: true});
    });
  };

  closeDisabledCategoryModal = () => {
    this.setState({disabledCategoryModalVisible: false}, () => {
      this.setState({selectedCategory: null});
    });
  };

  render() {
    const { categories, ln } = this.props;
    const category = get(this.props.navigation, 'state.params.category');
    return (
      <View style={{flex: 1}}>
        <Categories
          categories={categories.filter(item => item.is_grouped)}
          titleImage={Images.findDude}
          title={I18n.t('translation.findAnAdd', {locale: ln})}
          leftImage={category.icon}
          isButtonActiveProperty={'is_available'}
          onSelectCategory={this.onSelectCategory}
          onSelectDisabledCategory={this.onSelectDisabledCategory}
        />

        <BlockedCategoryModal
          modalVisible={this.state.disabledCategoryModalVisible}
          ln={ln}
          category={this.state.selectedCategory}
          onClose={this.closeDisabledCategoryModal}
        />
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(WrappedFindCategories)
