import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'

import styles from './styles'
import CategoriesListItem from './CategoriesListItem'

class CategoriesList extends React.Component {

  static defaultProps = {
    selectedCategories: [],
  }
  keyExtractor = (item, index) => index

  render () {
    const {categories, onSelectCategory, contentWidth, selectedCategories, isButtonActiveProperty, onSelectDisabledCategory} = this.props
    const data = categories.map(item => selectedCategories.indexOf(item.id) !== -1 ? {...item, isSelected: true} : item)
    return (
      <View>
        <FlatList
          numColumns={3}
          style={styles.listWrapper}
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={({item}) => <CategoriesListItem
            buttonActive={item[isButtonActiveProperty]}
            parentWidth={contentWidth} onSelectCategory={onSelectCategory} onSelectDisabledCategory={onSelectDisabledCategory} item={item}
          />}
        />
      </View>
    )
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array,
  onSelectCategory: PropTypes.func,
  onSelectDisabledCategory: PropTypes.func,
  contentWidth: PropTypes.number,
  selectedCategories: PropTypes.array,
  isButtonActiveProperty: PropTypes.string
}
export default CategoriesList
