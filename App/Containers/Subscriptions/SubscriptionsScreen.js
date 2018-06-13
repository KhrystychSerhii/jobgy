import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import GradientButton from '../../Components/GradientButton/index'
import I18n from '../../I18n/index';
import WhiteBlock from '../../Components/WhiteBlock/WhiteBlock'
import Row from '../../Components/Row/index'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { Images } from '../../Themes';

import styles from './styles'
import Badge from '../../Components/Badge';
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'
import SubscriptionItem from '../../Components/SubscriptionItem'
import CheckMark from '../../Components/CheckMark'
import ChooseCategoriesModal from './ChooseCategoriesModal'

import { toggleItemInArray } from '../../Transforms/index'

import { selectCategoriesList, getCategoriesList, unsubscribeCategoryById } from '../../Redux/CategoriesRedux';
import { getSubscriptionsList, selectSubscriptionsList } from '../../Redux/SubscriptionRedux'
import { selectLanguage } from '../../Redux/I18nRedux'

class SubscriptionsScreen extends React.Component {
  state = {
    showModal: false,
    selectedCategories: [],
  };

  componentDidMount() {
    this.props.getSubscriptions();
  }

  onSelect = (item) => {
    const {navigation} = this.props;
    if (item.id <= 4) {
      navigation.navigate('Payment', {sum: item.price.toFixed(2), amount: 1});
    } else {
      navigation.navigate('ChooseCategories');
    }

    // ChooseCategories
    // this.setState({showModal: true})
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
    const {showModal, selectedCategories} = this.state;
    const { ln, subscriptions} = this.props;
    return (
      <ScreenContainer bgWithPicture>
        <PageTitle title={I18n.t('translation.mySubscription', {locale: ln})} />
        <View
          style={styles.subscriptionsWrapper}
        >
          <FlatList
            keyExtractor={(item, next) => item.id}
            data={subscriptions}
            extraData={this.props}
            renderItem={({item, index}) => {
              return <SubscriptionItem recommended={index === 0} item={item} onSelect={this.onSelect} ln={ln} />
            }}
          />
        </View>
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage(),
  subscriptions: selectSubscriptionsList()
});

const mapDispatchToProps = (dispatch) => {
  return {
    getSubscriptions: () => dispatch(getSubscriptionsList())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsScreen);
