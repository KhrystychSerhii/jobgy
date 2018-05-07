import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import I18n from '../../I18n/index'

import styles from '../Register/styles'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'
import PaymentForm from '../../Components/PaymentForm'

import { selectLanguage } from '../../Redux/I18nRedux'

class CategoriesPaymentScreen extends React.Component {

  render () {
    const { ln } = this.props;
    return (
      <ScreenContainer bgWithPicture>
        <PageTitle title={I18n.t('translation.paymentSummary', {locale: ln})} />
        <PageTitle title={I18n.t('translation.premiumPlanPaymentDescription', {locale: ln})} />
        {/*<View>*/}
        {/*<Text>{this.props.navigation.getParam('details', null)}</Text>*/}
        {/*</View>*/}
        <PaymentForm ln={ln} />
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPaymentScreen);
