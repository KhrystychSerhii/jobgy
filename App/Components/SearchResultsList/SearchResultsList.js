import React from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'

import styles from './styles'
import SearchResultItem from './SearchResultItem'

class SearchResultsList extends React.Component {
  keyExtractor = (item, index) => index;
  render () {
    const {results, onSelect} = this.props
    return (
      <View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={results}
          renderItem={({item}) => <SearchResultItem item={item} onSelect={onSelect} />}
        />
      </View>
    )
  }
}
SearchResultsList.propTypes = {
  results: PropTypes.array,
  onSelect: PropTypes.func,
}
export default SearchResultsList
