import React from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import get from 'lodash/get'

import styles from './styles'
import images from '../../Themes/Images'
import I18n from '../../I18n'

import { getAttributesList } from '../../Redux/AttributesRedux'

import ScreenContainer from '../../Components/ScreenContainer'
import PageTitle from '../../Components/PageTitle/PageTitle'

import SubCategories from '../../Components/SubCategories';

// todo: это не правильно. узнать как нужно
import {getSubCategoriesList} from '../../Redux/SubCategoriesRedux';

class PostSubcategoriesScreen extends React.Component {

  // todo: сделать по нормальному. узнать у Дена как по нормальному сделать

  handleSelect = (id) => {
    const categoryId = get(this.props.navigation, 'state.params.categoryId');
    this.props.getAttributesList(id);

    this.props.navigation.navigate(
      'JobForm',
      {categoryId: categoryId, subcategoryId: id},
    )
  };

  render () {
    return (
      <SubCategories
        subCategories={this.props.navigation.state.params.subcategories}
        titleImage={images.postDude}
        title={'בניין'}
        onSelectCategory={this.handleSelect}
        titleImageStyles={styles.resultsTitleImage}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAttributesList: (id) => dispatch(getAttributesList(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostSubcategoriesScreen)
