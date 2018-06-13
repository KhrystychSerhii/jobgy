import React, { Component } from 'react'
import { View } from 'react-native';
import I18n from '../../I18n'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// Styles
import styles from './styles'
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { BlockedCategoryModal } from '../../Components/BlockedCategoryModal';
import { selectCategoriesList, getCategoriesList } from '../../Redux/CategoriesRedux'

import { selectLanguage } from '../../Redux/I18nRedux';
import { getAttributesList } from '../../Redux/AttributesRedux'

class PostJobScreen extends Component {

  state = {
    disabledCategoryModalVisible: false,
    selectedCategory: null,
    spinner: true
  };

  categoryWrapper = {
    id: 0,
    icon: images.buildingImg,
    is_available_for_create: true,
    title: 'translation.userWrapperCategory'
  };

  componentDidMount() {
    this.props.getCategoriesList().then(() => {
      this.setState({spinner: false});
    })
  }

  onSelectCategory = (category) => {
    if (category.id === 0) {
      this.props.navigation.navigate('WrappedPostCategories', {
        category: category
      });
    } else {
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

    // this.props.navigation.navigate('PostSubcategories', {categoryId: category.id, subcategories: category.subcategories})
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
    const { categories, ln } = this.props;
    return (
      <View style={{flex: 1}}>
        <Categories
          spinner={this.state.spinner}
          ln={ln}
          categories={[].concat(this.categoryWrapper, categories.filter(item => !item.is_grouped))}
          titleImage={images.postDude}
          title={I18n.t('translation.postAnAdd', {locale: ln})}
          isButtonActiveProperty={'is_available_for_create'}
          onSelectCategory={this.onSelectCategory}
          onSelectDisabledCategory={this.pressOnDisabledCategory}
          titleImageStyles={styles.titleImage}
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
    getCategoriesList: () => dispatch(getCategoriesList()),
    getAttributesList: (id) => dispatch(getAttributesList(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJobScreen)
