import React from 'react'
import { ScrollView, View } from 'react-native'
import FormInput from '../../Components/FormInput/FormInput'
import Row from '../../Components/Row/Row'
import I18n from '../../I18n'
import FormButton from '../../Components/FormButton/FormButton'

const PaymentForm = ({onMakePayment, ln}) => {
  return (
    <View style={{flex: 1}}>
      <FormInput label={I18n.t('translation.cardHolder', {locale: ln})} />
      <FormInput label={I18n.t('translation.ticketNumber', {locale: ln})} />
      <Row justifyContent={'space-between'}>
        <View style={{width: '49%'}}>
          <FormInput keyboardType={'numeric'} label={I18n.t('translation.year', {locale: ln})} />
        </View>
        <View style={{width: '49%'}}>
          <FormInput keyboardType={'numeric'} label={I18n.t('translation.month', {locale: ln})} />
        </View>
      </Row>
      <FormInput label={I18n.t('translation.cvv', {locale: ln})} />
      <FormButton onPress={onMakePayment}>{I18n.t('translation.makePayment', {locale: ln})}</FormButton>
    </View>
  )
}

export default PaymentForm
