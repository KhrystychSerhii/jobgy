import React from 'react'
import { View, Text, FlatList } from 'react-native'
import I18n from '../../I18n/index'

import styles from '../Register/styles'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'
import PaymentForm from './PaymentForm'

class PaymentScreen extends React.Component {

  render () {
    return (
      <ScreenContainer bgWithPicture>
        <PageTitle title={I18n.t('SUBSCRIPTIONS.PAYMENT_SUMMARY')} />
        {/*<View>*/}
          {/*<Text>{this.props.navigation.getParam('details', null)}</Text>*/}
        {/*</View>*/}
        <PaymentForm />
      </ScreenContainer>
    )
  }
}

export default PaymentScreen
