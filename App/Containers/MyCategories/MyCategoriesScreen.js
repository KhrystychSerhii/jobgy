import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { connect } from 'react-redux'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import Badge from '../../Components/Badge';
import SubsciptionItem from '../../Components/SubscriptionItem'

import CategoriesListItem from '../../Components/CategoriesList/CategoriesListItem';
import { selectUserInfo } from '../../Redux/UserRedux'
import { selectSubscriptionsList, getSubscriptionsList } from '../../Redux/SubscriptionRedux'
import { selectLanguage } from '../../Redux/I18nRedux'
import findIndex from 'lodash/findIndex';

import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'
import { selectCategoriesList, getCategoriesList, unsubscribeCategoryById } from '../../Redux/CategoriesRedux';
import { DeleteCategoryConfirmModal } from '../../Components/DeleteCategoryConfirmModal/';

// const Badge = ({children, onPress, top, left, right, backgroundColor = 'red', size = 18}) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         styles.badge,
//         {top},
//         (left || left === 0) ? {left} : null,
//         (right || right === 0) ? {right} : null,
//         {width: size, height: size},
//         {backgroundColor}
//       ]}>
//         {children}
//     </TouchableOpacity>
//   )
// };

const CancelCategoriesButton = ({cancelPress, confirmPress, cancelPressed, locale}) => {
  return (
      <TouchableOpacity
        style={[
          styles.button,
          cancelPressed ? styles.redButton : styles.transparentButton
        ]}
        onPress={cancelPressed ? confirmPress : cancelPress}
      >
        <Text style={cancelPressed ? styles.whiteButtonText : styles.transparentButtonText} numberOfLines={1} ellipsiseMode='tail'>
          {
            cancelPressed ?
              I18n.t('translation.confirmCanceling', {locale}) :
              I18n.t('translation.cancelCategories', {locale})
          }
        </Text>
      </TouchableOpacity>

  )
}

class MyCategoriesScreen extends React.Component {
  state = {
    subscription: null,
    cancelPressed: false,
    confirmModalVisible: false,
    deletedCategory: null
  };

  componentDidMount() {
    this.props.getCategoriesList();
    this.props.getSubscriptionsList();

    // getSubscriptions().then(plans => {
    //   const subscriptionPlanId = this.props.userInfo.subscription_plan_id;
    //   const index = findIndex(plans, (item) => {
    //     return item.id === subscriptionPlanId;
    //   });
    //   if (index > -1) {
    //     console.log('subscriptionPlanId', subscriptionPlanId);
    //     console.log('plans[index]', plans[index]);
    //     this.setState({subscription: plans[index]});
    //   }
    // });
  }

  cancelCategories() {
    this.setState({cancelPressed: true}, () => {
     console.log('this.state.cancelPressed', this.state.cancelPressed)
    });
  }

  confirmCanceledCategories() {
    console.log('confirmCanceledCategories')
    this.setState({cancelPressed: false}, () => {
      console.log('this.state.cancelPressed', this.state.cancelPressed)
    });
  }

  keyExtractor = (item, index) => index

  deleteCategory = (category) => {
    this.setState({deletedCategory: category}, () => {
      this.setState({confirmModalVisible: true});
    });
  };

  closeDeleteConfirmModal = () => {
    this.setState({confirmModalVisible: false}, () => {
      this.setState({deletedCategory: null})
    })
  };

  deleteCategoryConfirm = (category) => {
    console.log('call  this.props.unsubscribeCategoryById(category.id) for', category)
    this.props.unsubscribeCategoryById(category.id).then(() => {
     this.closeDeleteConfirmModal();
    });
  };

  onSubscriptionSelect = () => {
    const {navigation, subscriptions} = this.props;
    navigation.navigate('Payment', {sum: subscriptions[0].price.toFixed(2), amount: 1});
  };

  render() {
    const { categories, subscriptions, ln } = this.props;
    return (
        <ScreenContainer noPadding={true}>
          <PageTitle title={I18n.t('translation.myCategories', {locale: ln})} />
          <FlatList
            refreshing={true}
            numColumns={3}
            style={styles.listWrapper}
            keyExtractor={this.keyExtractor}
            columnWrapperStyle={{flex: 0, flexDirection: 'row-reverse', justifyContent: 'center'}}
            data={categories.filter(item => item.is_available && !item.is_always_available)}
            extraData={this.state}
            renderItem={({item}) =>
              <View
                style={{position: 'relative'}}
              >
                <CategoriesListItem
                  item={item}
                  onSelectCategory={() => {console.log('category pressed', this.props)}}
                  buttonActive={true}
                />
                <View style={styles.tillTextContainer}>
                  <Text style={styles.tillText}>{I18n.t('translation.till', {locale: ln})}</Text>
                  <Text style={styles.tillText}>{item.till}</Text>
                </View>
                {
                  this.state.cancelPressed ?
                    <Badge
                      top={0}
                      left={0}
                      onPress={() => { this.deleteCategory(item) }}>
                      <Text style={styles.cancelBadgeText}>&times;</Text>
                    </Badge> : null
                }
              </View>
            }
          />

          <TouchableOpacity style={[styles.button, styles.blueButton]}>
            <Text style={[styles.buttonText, styles.whiteButtonText]}>{I18n.t('translation.addMoreCategories', {locale: ln})}</Text>
          </TouchableOpacity>

          <CancelCategoriesButton
              cancelPress={this.cancelCategories.bind(this)}
              confirmPress={this.confirmCanceledCategories.bind(this)}
              cancelPressed={this.state.cancelPressed}
              locale={ln}
          />

          {
            subscriptions && subscriptions[0] ?
              <View style={{paddingHorizontal: 20}}>
                <SubsciptionItem recommended={true} item={Object.assign(subscriptions[0], {active: false})} onSelect={this.onSubscriptionSelect} ln={ln} />
              </View> : null
          }

          {
            this.state.confirmModalVisible ?
              <DeleteCategoryConfirmModal
                modalVisible={this.state.confirmModalVisible}
                ln={ln}
                category={this.state.deletedCategory}
                onClose={this.closeDeleteConfirmModal}
                onConfirm={this.deleteCategoryConfirm}
              /> : null
          }
        </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList(),
  userInfo: selectUserInfo(),
  ln: selectLanguage(),
  subscriptions: selectSubscriptionsList()
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList()),
    getSubscriptionsList: () => dispatch(getSubscriptionsList()),
    unsubscribeCategoryById: (id) => dispatch(unsubscribeCategoryById(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCategoriesScreen);
