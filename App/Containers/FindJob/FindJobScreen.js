import React, { Component } from 'react'
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import I18n from '../../I18n'
// Styles
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { BlockedCategoryModal } from '../../Components/BlockedCategoryModal'
import { selectCategoriesList, getCategoriesList } from '../../Redux/CategoriesRedux'
import { selectLanguage } from '../../Redux/I18nRedux';

class FindJobScreen extends Component {

  state = {
    disabledCategoryModalVisible: false,
    selectedCategory: null,
    spinner: true
  }

  categoryWrapper = {
    id: 0,
    icon: images.buildingImg,
    is_available: true,
    title: 'translation.userWrapperCategory'
  };

  componentDidMount() {

    this.props.getCategoriesList().then(() => {
      this.setState({spinner: false});
    })
  }

  onSelectCategory = (category) => {
    if (category.id === 0) {
      this.props.navigation.navigate('WrappedFindCategories', {
        category: category
      });
    } else {
      if (category.subcategories && category.subcategories.length === 1) {
        this.props.navigation.navigate('Results', {
          category: category,
          subcategory: category.subcategories[0],
        });
      } else {
        this.props.navigation.navigate('FindSubcategories', {
          category: category,
          subCategories: category.subcategories
        })
      }
    }
  }

  pressOnDisabledCategory = (category) => {
    this.setState({selectedCategory: category}, () => {
      this.setState({disabledCategoryModalVisible: true});
    });
  };

  closeDisabledCategoryModal = () => {
    this.setState({disabledCategoryModalVisible: false}, () => {
      this.setState({selectedCategory: null});
    });
  };

  render () {
    const { ln, categories } = this.props;
    return (
      <View style={{flex: 1}}>
        <Categories
          spinner={this.state.spinner}
          ln={ln}
          categories={[].concat(this.categoryWrapper, categories.filter(item => !item.is_grouped))}
          titleImage={images.findDude}
          title={I18n.t('translation.findAnAdd', {locale: ln})}
          isButtonActiveProperty={'is_available'}
          onSelectCategory={this.onSelectCategory}
          onSelectDisabledCategory={this.pressOnDisabledCategory}
        />

        <BlockedCategoryModal
          modalVisible={this.state.disabledCategoryModalVisible}
          ln={ln}
          category={this.state.selectedCategory}
          onClose={this.closeDisabledCategoryModal}
        />
      </View>
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
