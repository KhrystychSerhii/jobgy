import React from 'react'
import { Dimensions, Text, View, TouchableWithoutFeedback, I18nManager, Image } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Icon from 'react-native-vector-icons/Ionicons'
import I18n from '../../I18n'
import { Colors, Images } from '../../Themes'

import styles from './styles'

import jobs from '../../Config/jobsConfig'
import { createGroupedArray } from '../../Transforms/index'
import ModalWrapper from '../../Components/ModalWrapper/ModalWrapper'
import CategoriesList from '../../Components/CategoriesList/CategoriesList'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer'
import Row from '../../Components/Row/Row'
import FormButton from '../../Components/FormButton/FormButton'

class ChooseCategoriesModal extends React.Component {
  jobsSplitted = createGroupedArray(jobs, 9)
  state = {
    activeSlide: I18nManager.isRTL ? (this.jobsSplitted.length - 1) : 0,
  }

  onPrev = () => {
    this._carousel[I18nManager.isRTL ? 'snapToNext' : 'snapToPrev']()
  }
  onNext = () => {
    this._carousel[I18nManager.isRTL ? 'snapToPrev' : 'snapToNext']()
  }
  onSnap = (index) => {
    this.setState({activeSlide: index})
  }

  _renderItem = ({item, index}) => {
    const {width} = Dimensions.get('window')
    const itemWidth = width * 0.9
    return (
      <View style={{flex: 1}}>
        <CategoriesList
          contentWidth={itemWidth}
          jobs={item}
          onSelectCategory={this.props.onSelectCategory}
          selectedCategories={this.props.selectedCategories}
        />
      </View>
    )
  }

  get pagination () {
    const {activeSlide} = this.state
    return (
      <Row style={{flex: 1}}>
        <TouchableWithoutFeedback
          onPress={this.onPrev}
          disabled={I18nManager.isRTL ? activeSlide >= this.jobsSplitted.length - 1 : activeSlide === 0}
        >
          <Icon name={'ios-arrow-back-outline'} color={Colors.white} size={20} />
        </TouchableWithoutFeedback>
        <Pagination
          dotsLength={this.jobsSplitted.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            backgroundColor: 'transparent',
            paddingVertical: 0,
            paddingHorizontal: 4,
            flexDirection: 'row-reverse',
          }}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 8,
            marginHorizontal: 4,
            backgroundColor: 'rgb(255, 255, 255)',
          }}
          inactiveDotOpacity={0.3}
          inactiveDotScale={1}
        />
        <TouchableWithoutFeedback
          onPress={this.onNext}
          disabled={I18nManager.isRTL ? activeSlide === 0 : activeSlide >= this.jobsSplitted.length - 1}
        >
          <Icon name={'ios-arrow-forward-outline'} color={Colors.white} size={20} />
        </TouchableWithoutFeedback>
      </Row>
    )
  }

  render () {
    // center items on screen
    const {width} = Dimensions.get('window')
    const itemWidth = width * 0.9
    return (
      <ModalWrapper
        withCloseButton
        onClose={this.props.onModalClose}
        visible={this.props.modalVisible}
        contentWrapperStyles={styles.modalContentWrapper}
      >
        <ScreenContainer>
          <PageTitle title={I18n.t('SUBSCRIPTIONS.MODAL_TITLE')} />
          <Text style={styles.subtitle}>{I18n.t('SUBSCRIPTIONS.MODAL_SUBTITLE')}</Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Carousel
              shouldOptimizeUpdates={false}
              firstItem={1}
              layout={'default'}
              ref={(c) => { this._carousel = c }}
              data={this.jobsSplitted}
              renderItem={this._renderItem}
              sliderWidth={itemWidth}
              itemWidth={itemWidth - 20}
              onSnapToItem={this.onSnap}
            />
            {this.pagination}
          </View>
          <View style={{width: '75%'}}>
            <Image source={Images.pageTitleBorder} style={{width: '100%'}} />
            <Row justifyContent={'space-between'}>
              <Text style={styles.whiteText}>{this.props.selectedCategories.length * 50}.00</Text>
              <Text
                style={styles.whiteText}
              >{I18n.t('SUBSCRIPTIONS.SELECTED_CATEGORIES_COUNT', {count: this.props.selectedCategories.length})}</Text>
            </Row>
          </View>
          <View style={{marginVertical: 20}}>
            <FormButton onPress={this.props.onSubmit}>{I18n.t('SUBSCRIPTIONS.CONTINUE')}</FormButton>
          </View>
        </ScreenContainer>
      </ModalWrapper>
    )
  }
}

export default ChooseCategoriesModal
