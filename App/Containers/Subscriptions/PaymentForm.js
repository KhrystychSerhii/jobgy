import React from 'react'
import { ScrollView, View } from 'react-native'
import FormInput from '../../Components/FormInput/FormInput'
import Row from '../../Components/Row/Row'
import I18n from '../../I18n'
import FormButton from '../../Components/FormButton/FormButton'

const PaymentForm = ({onMakePayment}) => {
  return (
    <View style={{flex: 1}}>
      <FormInput label={I18n.t('SUBSCRIPTIONS.CARD_HOLDER')} />
      <FormInput label={I18n.t('SUBSCRIPTIONS.CARD_NUMBER')} />
      <Row justifyContent={'space-between'}>
        <View style={{width: '49%'}}>
          <FormInput keyboardType={'numeric'} label={I18n.t('SUBSCRIPTIONS.CARD_SECURITY_CODE')} />
        </View>
        <View style={{width: '49%'}}>
          <FormInput keyboardType={'numeric'} label={I18n.t('SUBSCRIPTIONS.CARD_VALIDITY')} />
        </View>
      </Row>
      <FormButton onPress={onMakePayment}>{I18n.t('SUBSCRIPTIONS.MAKE_PAYMENT')}</FormButton>
    </View>
  )
}

export default PaymentForm
