import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, View, TouchableHighlight, AsyncStorage, WebView } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'


import styles from './styles'
import Categories from '../../Components/Categories/Categories'
import { BlockedCategoryModal } from '../../Components/BlockedCategoryModal'
import { selectCategoriesList, getCategoriesList } from '../../Redux/CategoriesRedux'
import { getBusinessList, getPremiumBusinessList, selectBusinessList } from '../../Redux/BusinessRedux'
import images from '../../Themes/Images'
import PageTitle from '../../Components/PageTitle'
import I18n from 'react-native-i18n'
import ScreenContainer from '../../Components/ScreenContainer'
import Row from '../../Components/Row/Row'

import { selectLanguage } from '../../Redux/I18nRedux';

class AllBusinessCategoriesScreen extends React.Component {

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

  premiumCategory = {
    id: -1,
    icon: images.premiumCategoryIcon,
    is_available: true,
    title: 'translation.premium'
  }

  componentDidMount() {
    this.props.getCategoriesList().then(() => {
      this.setState({spinner: false});
    })
  }

  onSelectCategory = (category) => {
    if (category.id === 0) {
      this.props.navigation.navigate('WrappedBusinessCategories', {
        category: category
      });
    } else if (category.id === -1) {


        this.props.navigation.navigate('PremiumBusinessResults');

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

  render() {
    const { ln, categories } = this.props;
    console.log('categories ==> ', categories);
    return (
      <View style={{flex: 1}}>
        <Categories
          spinner={this.state.spinner}
          ln={ln}
          categories={[].concat(this.categoryWrapper, this.premiumCategory, categories.filter(item => !item.is_grouped))}
          titleImage={images.dude1}
          title={I18n.t('translation.allBusinesses', {locale: ln})}
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
  ln: selectLanguage(),
  business: selectBusinessList()
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBusinessCategoriesScreen)
