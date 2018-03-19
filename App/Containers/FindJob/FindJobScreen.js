import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import I18n from '../../I18n'
// Styles
import images from '../../Themes/Images'
import Categories from '../../Components/Categories/Categories'
import { selectCategories } from '../../Redux/SettingsRedux'

class FindJobScreen extends Component {
  onSelectCategory = (categoryId) => {
    this.props.navigation.navigate('Results', {categoryId})
  }

  render () {
    return (
      <Categories
        categories={this.props.categories}
        titleImage={images.findDude}
        title={I18n.t('FIND_JOB.TITLE')}
        onSelectCategory={this.onSelectCategory}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategories()
})

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FindJobScreen)
