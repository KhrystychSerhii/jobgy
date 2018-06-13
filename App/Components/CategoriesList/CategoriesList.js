import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList, ActivityIndicator } from 'react-native'

import styles from './styles'
import CategoriesListItem from './CategoriesListItem'

class CategoriesList extends React.Component {

  static defaultProps = {
    selectedCategories: [],
  }
  keyExtractor = (item, index) => index

  render () {
    const {categories, onSelectCategory, contentWidth, selectedCategories, isButtonActiveProperty, onSelectDisabledCategory, ln, spinner} = this.props
    const data = categories.map(item => selectedCategories.indexOf(item.id) !== -1 ? {...item, isSelected: true} : item)
    return (
      <View>
        {
          spinner ?
            <ActivityIndicator size="large" color="#fff" /> :
            <FlatList
              numColumns={3}
              style={[styles.listWrapper]}
              columnWrapperStyle={{flex: 0, flexDirection: 'row-reverse', justifyContent: 'center'}}
              keyExtractor={this.keyExtractor}
              data={data}
              renderItem={({item}) => <CategoriesListItem
                ln={ln}
                buttonActive={item[isButtonActiveProperty]}
                parentWidth={contentWidth} onSelectCategory={onSelectCategory} onSelectDisabledCategory={onSelectDisabledCategory} item={item}
              />}
            />
        }
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
