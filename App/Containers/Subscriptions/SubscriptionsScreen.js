import React from 'react'
import { View, Text, FlatList } from 'react-native'
import GradientButton from '../../Components/GradientButton/index'
import I18n from '../../I18n/index'
import WhiteBlock from '../../Components/WhiteBlock/WhiteBlock'
import Row from '../../Components/Row/index'

import styles from '../Register/styles'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'
import ChooseCategoriesModal from './ChooseCategoriesModal'
import { toggleItemInArray } from '../../Transforms/index'

const subscriptions = [
  {id: 1, name: 'ANNUAL_UNLIMITED', price: '3,999/y', pricePerAd: 0},
  {id: 2, name: 'ANNUAL_PREPAID_ALL', price: '399/y', pricePerAd: 10},
  {id: 3, name: 'MONTHLY_PREPAID_ALL', price: '399/m', pricePerAd: 15},
  {id: 4, name: 'ANNUAL_PREPAID_ONE', price: '199/y', pricePerAd: 10},
  {id: 5, name: 'MONTHLY_PREPAID_ONE', price: '299/m', pricePerAd: 15},
]

const SubscriptionItem = ({item: {id, name, price, pricePerAd}, onSelect}) => {
  const [priceCount, priceTerm] = price.split('/')
  return (
    <View style={styles.subscriptionItem}>
      {pricePerAd === 0 && <View style={styles.bestChoiceBlock}><Text
        style={styles.bestChoiceText}
      >{I18n.t('SUBSCRIPTIONS.BEST_CHOICE')}</Text></View>}
      <WhiteBlock>
        <GradientButton
          onPress={() => onSelect(id)} style={{width: null, height: null, paddingHorizontal: 10, paddingVertical: 12}}
        >
          <Row justifyContent={'space-between'}>
            <View style={styles.subscriptionItemPrice}>
              <Row justifyContent={'space-around'}>
                <Text style={styles.subscriptionListText}>
                  {I18n.t(`SUBSCRIPTIONS.${priceTerm === 'y' ? 'PER_YEAR' : 'PER_MONTH'}`)}
                </Text>
                <Text style={styles.subscriptionListPrice}>&#x20aa;{` ${priceCount}`}</Text>
              </Row>
              <Row justifyContent={'space-around'}>
                <Text style={pricePerAd === 0 ? styles.subscriptionListTextSmall : styles.subscriptionListText}>
                  {I18n.t(`SUBSCRIPTIONS.${pricePerAd === 0 ? 'FREE_AD_POST' : 'PER_POST'}`)}
                </Text>
                {pricePerAd > 0 &&
                <View>
                  <Text style={styles.subscriptionListPrice}>
                    &#x20aa;{` ${pricePerAd}`}
                  </Text>
                </View>
                }
              </Row>
            </View>
            <View style={styles.subscriptionItemDescription}>
              <Text
                style={styles.subscriptionListDescriptionText} numberOfLines={2}
              >{I18n.t(`SUBSCRIPTIONS.${name}`)}</Text>
            </View>
          </Row>
        </GradientButton>
      </WhiteBlock>
    </View>
  )
}
const SubscriptionsList = ({list, onSelect}) => (
  <View>
    <FlatList
      keyExtractor={(item, next) => item.id}
      data={list}
      renderItem={({item}) => <SubscriptionItem onSelect={onSelect} item={item} />}
    />
  </View>
)

class SubscriptionsScreen extends React.Component {
  state = {
    showModal: false,
    selectedCategories: [],
  }
  onSelect = () => {
    this.setState({showModal: true})
  }
  closeModal = () => {
    this.setState({showModal: false})
  }
  handleSelectCategory = (id) => {
    this.setState({selectedCategories: toggleItemInArray(this.state.selectedCategories, id)})
  }
  handleSubmit = () => {
    this.closeModal();
  }

  render () {
    const {showModal, selectedCategories} = this.state
    return (
      <ScreenContainer bgWithPicture>
        <PageTitle title={I18n.t('SUBSCRIPTIONS.TITLE')} />
        <SubscriptionsList onSelect={this.onSelect} list={subscriptions} />
        <ChooseCategoriesModal
          onModalClose={this.closeModal}
          modalVisible={showModal}
          onSelectCategory={this.handleSelectCategory}
          selectedCategories={selectedCategories}
          onSubmit={this.handleSubmit}
        />
      </ScreenContainer>
    )
  }
}

export default SubscriptionsScreen
