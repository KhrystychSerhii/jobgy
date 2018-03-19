import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './styles'
import images from '../../Themes/Images'
import I18n from '../../I18n'

import GradientButton from '../../Components/GradientButton'
import ScreenContainer from '../../Components/ScreenContainer'
import Row from '../../Components/Row'
import PageTitle from '../../Components/PageTitle/PageTitle'

class SubcategoriesScreen extends React.Component {
  handleSelect = (id) => {
    this.props.navigation.navigate(
      'JobForm',
      {categoryId: this.props.navigation.state.params.categoryId, subcategoryId: id},
    )
  }

  render () {
    return (
      <ScreenContainer>
        <View style={styles.titleWithImagesWrapper}>
          <Image source={images.buildingImg} style={styles.resultsTitleImageLeft} resizeMode='contain' />
          <PageTitle title={'בניין'} />
          <Image source={images.postDude} style={styles.resultsTitleImage} resizeMode='contain' />
        </View>
        <Row styles={{flexWrap: 'wrap'}} justifyContent={'space-between'}>
          <GradientButton onPress={this.handleSelect} style={styles.buttonWrapper}>
            <Text style={styles.buttonTxt}>גבס</Text>
          </GradientButton>
          <GradientButton onPress={this.handleSelect} style={styles.buttonWrapper}>
            <Text style={styles.buttonTxt}>גבס</Text>
          </GradientButton>
          <GradientButton onPress={this.handleSelect} style={styles.buttonWrapper}>
            <Text style={styles.buttonTxt}>גבס</Text>
          </GradientButton>
          <GradientButton onPress={this.handleSelect} style={styles.buttonWrapper}>
            <Text style={styles.buttonTxt}>גבס</Text>
          </GradientButton>
        </Row>
      </ScreenContainer>
    )
  }
}

export default SubcategoriesScreen
