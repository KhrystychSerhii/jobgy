import React, { Component } from 'react'
import I18n from '../../I18n'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import jobs from '../../Config/jobsConfig'
// Styles
import styles from './styles'
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { selectCategories } from '../../Redux/SettingsRedux'

class PostJobScreen extends Component {
  onSelectCategory = (id) => {
    this.props.navigation.navigate('Subcategories', {categoryId: id})
  }

  render () {
    return (
      <Categories
        categories={this.props.categories}
        titleImage={images.postDude}
        title={I18n.t('POST_JOB.TITLE')}
        onSelectCategory={this.onSelectCategory}
        titleImageStyles={styles.titleImage}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategories(),
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostJobScreen)
