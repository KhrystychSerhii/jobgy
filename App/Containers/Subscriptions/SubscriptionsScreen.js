import React from 'react'
import { View, Text, FlatList } from 'react-native'
import GradientButton from '../../Components/GradientButton/index'
import I18n from '../../I18n/index'
import WhiteBlock from '../../Components/WhiteBlock/WhiteBlock'
import Row from '../../Components/Row/index'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import styles from '../Register/styles'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'
import CheckMark from '../../Components/CheckMark'
import ChooseCategoriesModal from './ChooseCategoriesModal'
import { toggleItemInArray } from '../../Transforms/index'

import { getSubscriptions } from '../../Redux/SubscriptionRedux'
import { selectLanguage } from '../../Redux/I18nRedux'

const SubscriptionItem = ({item, onSelect, locale}) => {
  // active:true
  // id:1
  // period:2
  // period_title:"perYear"
  // post_price:null
  // posts_price_label:null
  // price:100
  // title:"plan1"
  // const [priceCount, priceTerm] = price.split('/')
  // return (
    {/*<View style={styles.subscriptionItem}>*/}
      {/*/!*{pricePerAd === 0 && <View style={styles.bestChoiceBlock}><Text*!/*/}
        {/*/!*style={styles.bestChoiceText}*!/*/}
      {/*/!*>{I18n.t('SUBSCRIPTIONS.BEST_CHOICE')}</Text></View>}*!/*/}
      {/*<WhiteBlock>*/}
        {/*<GradientButton*/}
          {/*onPress={() => onSelect(item.id)} style={{width: null, height: null, paddingHorizontal: 10, paddingVertical: 12}}*/}
        {/*>*/}
          {/*<Row justifyContent={'space-between'}>*/}
            {/*<View style={styles.subscriptionItemPrice}>*/}
              {/*<Row justifyContent={'space-around'}>*/}
                {/*<Text style={styles.subscriptionListText}>*/}
                  {/*{I18n.t(`translation.${item.period_title}`)}*/}
                {/*</Text>*/}
                {/*/!*<Text style={styles.subscriptionListPrice}>&#x20aa;{` ${priceCount}`}</Text>*!/*/}
              {/*</Row>*/}
              {/*/!*<Row justifyContent={'space-around'}>*!/*/}
                {/*/!*<Text style={pricePerAd === 0 ? styles.subscriptionListTextSmall : styles.subscriptionListText}>*!/*/}
                  {/*/!*{I18n.t(`translation.${pricePerAd === 0 ? 'freeAdPosts' : 'perAdPost'}`)}*!/*/}
                {/*/!*</Text>*!/*/}
                {/*/!*{pricePerAd > 0 &&*!/*/}
                {/*/!*<View>*!/*/}
                  {/*/!*<Text style={styles.subscriptionListPrice}>*!/*/}
                    {/*/!*&#x20aa;{` ${pricePerAd}`}*!/*/}
                  {/*/!*</Text>*!/*/}
                {/*/!*</View>*!/*/}
                {/*}*/}
              {/*/!*</Row>*!/*/}
            {/*</View>*/}
            {/*<View style={styles.subscriptionItemDescription}>*/}
              {/*<Text*/}
                {/*style={styles.subscriptionListDescriptionText} numberOfLines={2}*/}
              {/*>{I18n.t(`translation.${item.title}`)}</Text>*/}
            {/*</View>*/}
          {/*</Row>*/}
        {/*</GradientButton>*/}
      {/*</WhiteBlock>*/}
    {/*</View>*/}
  return (
    <View
      style={{position: 'relative'}}
    >
      <View
        style={{
          flex: 0,
          justifyContent: 'space-between',
          flexDirection: 'row',

          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: 10,
          marginHorizontal: 20,
          marginTop: 10,
          paddingHorizontal: 15,
          paddingVertical: 10,


        }}
      >
        <View
          style={{alignSelf: 'center', maxWidth: '65%'}}
        >
          <Text
            style={[{color: 'black', paddingLeft: 10}, styles.subscriptionListDescriptionText]}
            ellipsizeMode='tail'
          >
            {I18n.t(`translation.${item.title}`, {locale})}
          </Text>
        </View>

        <View
          style={{alignSelf: 'center', width: '35%'}}
        >
          <Text>
            <Text style={styles.subscriptionListPrice}>{item.price + 1000} &#x20aa; &#160;</Text>
            <Text style={styles.subscriptionListText}>{I18n.t(`translation.${item.period_title}`, {locale})}</Text>
          </Text>
        </View>
      </View>
      {
        item.active ? <CheckMark color='#57DD54' width={25} height={12} top={5} left={15} borderWidth={4} /> : null
      }

    </View>
  )
}
const SubscriptionsList = ({list, onSelect}) => (
  <View
    style={{width: '100%'}}
  >
    <FlatList
      keyExtractor={(item, next) => item.id}
      data={list}
      renderItem={({item}) => <SubscriptionItem item={item} onSelect={onSelect} locale={this.props.ln} />}
    />
  </View>
)

class SubscriptionsScreen extends React.Component {
  state = {
    showModal: false,
    subscriptions: [],
    selectedCategories: [],
  }

  componentDidMount() {
    getSubscriptions().then(subscriptions => {
      console.log('subscriptions', subscriptions);
      this.setState({subscriptions});
    });
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
        <PageTitle title={I18n.t('translation.mySubscription', {locale: this.props.ln})} />
        <SubscriptionsList onSelect={this.onSelect} list={this.state.subscriptions} />
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

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsScreen);
