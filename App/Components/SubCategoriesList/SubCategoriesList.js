import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, FlatList, Image } from 'react-native'

import styles from './styles'
import GradientButton from '../GradientButton'
import Row from '../Row'
import AppConfig from '../../Config/AppConfig';

class SubCategoriesList extends React.Component {

  keyExtractor = (item, index) => index;

  render () {
    console.log('this.props.list', this.props.list);
    return (
      // todo: incorrect view
      <View style={styles.listWrapper}>
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.rowWrapper}
          keyExtractor={this.keyExtractor}
          data={this.props.list}
          renderItem={({item}) =>

            <GradientButton onPress={() => {this.props.onSelectCategory(item.id)}} style={[styles.buttonWrapper]}>
              <View style={styles.imageContainer}>
                <Image source={{uri: AppConfig.baseUrl + item.icon_path}} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.buttonTxt} numberOfLines={1} ellipsizeMode='tail'>
                  {item.title}
                </Text>
              </View>
            </GradientButton>
          }
        />
      </View>
    )
  }
}

SubCategoriesList.propTypes = {
  list: PropTypes.any,
  onSelectCategory: PropTypes.func,
}
export default SubCategoriesList
