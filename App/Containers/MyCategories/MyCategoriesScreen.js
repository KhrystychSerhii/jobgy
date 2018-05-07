import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { connect } from 'react-redux'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import CategoriesListItem from '../../Components/CategoriesList/CategoriesListItem';
import { selectUserInfo } from '../../Redux/UserRedux'
import { getSubscriptions } from '../../Redux/SubscriptionRedux'
import { selectLanguage } from '../../Redux/I18nRedux'
import findIndex from 'lodash/findIndex';

import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'
import { selectCategoriesList, getCategoriesList, unsubscribeCategoryById } from '../../Redux/CategoriesRedux';

const Badge = ({children, onPress, top, left, right, backgroundColor = 'red', size = 18}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.badge,
        {top},
        (left || left === 0) ? {left} : null,
        (right || right === 0) ? {right} : null,
        {width: size, height: size},
        {backgroundColor}
      ]}>
        {children}
    </TouchableOpacity>
  )
};

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
    cancelPressed: false
  }

  componentDidMount() {
    this.props.getCategoriesList();

    getSubscriptions().then(plans => {
      const subscriptionPlanId = this.props.userInfo.subscription_plan_id;
      const index = findIndex(plans, (item) => {
        return item.id === subscriptionPlanId;
      });
      if (index > -1) {
        this.setState({subscription: plans[index]});
      }
    });
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

  goToPaymentScreen() {
    console.log('this.state', this.state)
    console.log('this.props', this.props)
    this.props.navigation.navigate('Payment', {subscription: this.state.subscription})
  }

  render() {
    console.log('my categories props', this.props)
    return (
        <ScreenContainer noPadding={true}>
          <PageTitle title={I18n.t('translation.myCategories', {locale: this.props.ln})} />
          <FlatList
            refreshing={true}
            numColumns={3}
            style={styles.listWrapper}
            keyExtractor={this.keyExtractor}
            data={this.props.categories.filter(item => item.is_available)}
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
                  <Text style={styles.tillText}>{I18n.t('translation.till', {locale: this.props.ln})}</Text>
                  <Text style={styles.tillText}>{item.till}</Text>
                </View>
                {
                  this.state.cancelPressed ?
                    <Badge
                      top={0}
                      left={0}
                      onPress={() => { this.props.unsubscribeCategoryById(item.id) }}
                    >
                      <Text style={styles.cancelBadgeText}>&times;</Text>
                    </Badge> : null
                }
              </View>
            }
          />

          <TouchableOpacity style={[styles.button, styles.blueButton]}>
            <Text style={[styles.buttonText, styles.whiteButtonText]}>{I18n.t('translation.addMoreCategories', {locale: this.props.ln})}</Text>
          </TouchableOpacity>

          <CancelCategoriesButton
              cancelPress={this.cancelCategories.bind(this)}
              confirmPress={this.confirmCanceledCategories.bind(this)}
              cancelPressed={this.state.cancelPressed}
              locale={this.props.ln}
          />

          {
            this.state.subscription ?
              <View style={styles.fullWidth}>
                <TouchableOpacity onPress={this.goToPaymentScreen.bind(this)} style={[styles.planButton, styles.button]}>
                  <View style={{alignSelf: 'center', maxWidth: '65%'}}>
                    <Text>
                      {I18n.t(`translation.${this.state.subscription.title}`, {locale: this.props.ln})}
                    </Text>
                  </View>
                  <View style={{alignSelf: 'center', width: '35%'}}>
                    <Text>
                      {this.state.subscription.price}
                    </Text>
                    <Text>
                      {I18n.t(`translation.${this.state.subscription.period_title}`, {locale: this.props.ln})}
                    </Text>
                    {/*<Text>*/}
                    {/*{I18n.t('translation.freeAdPosts')}*/}
                    {/*</Text>*/}
                  </View>
                </TouchableOpacity>
                <Badge
                  top={10}
                  right={10}
                  size={30}
                >
                  <Text style={styles.tryBadgeText}>
                    {I18n.t('translation.recommended', {locale: this.props.ln})}
                  </Text>
                </Badge>
              </View> : null

          }
        </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList(),
  userInfo: selectUserInfo(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList()),
    unsubscribeCategoryById: (id) => dispatch(unsubscribeCategoryById(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCategoriesScreen);
