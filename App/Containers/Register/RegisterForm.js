import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import { Formik } from 'formik'
import Yup from 'yup'

import FormInput from '../../Components/FormInput'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton'
import FormSelectDropdown from '../../Components/FormSelectDropdown/FormSelectDropdown'
import CheckBox from '../../Components/CheckBox'

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().required('Email is required!').email('Invalid email address'),
  name: Yup.string().trim().required('Required'),
  business_name: Yup.string().trim().required('Required'),
  business_number: Yup.string().trim().required('Required'),
  address: Yup.string().trim().required('Required'),
  phone: Yup.string()
    .trim()
    .required('Required')
    .matches(/^(0(([23489]{1}[0-9]{7})|(5[012345689]{1}[0-9]{7})|'.'(79[23579]{1}[0-9]{6})|(718[0-9]{6})|(72[23]{1}[0-9]{6})|'.'(73[237]{1}[0-9]{6})|(747[0-9]{6})|(76[58]{1}[0-9]{6})|'.'(782[0-9]{6})|(77[0-9]{7})))$/, 'Incorrect number'),
  interest_id: Yup.number().required('Required'),
})

class RegisterForm extends React.Component {
  state = {
    termsChecked: false
  }

  termsCheckboxHandle() {
    this.setState({termsChecked: !this.state.termsChecked});
  }

  render () {
    return (
      <View style={styles.form}>
        <Formik
          initialValues={{
            // "address": "test Street, 2",
            // "business_name": "test",
            // "business_number": "123",
            // "email": "ironman_1234@mailinator.com",
            // // "interest_id": "1",
            // "name": "test name",
            // "phone": "026666556"
            name: '',
            business_name: '',
            business_number: '',
            address: '',
            phone: '',
            email: '',
            interest_id: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, setErrors}) => {
            if (this.state.termsChecked) {
              this.props.onSubmit(values)
                .catch((e) => {
                  e.data.errors && setErrors(e.data.errors)
                  setSubmitting(false)
                })
            } else {
              console.log('terms is not checked');
            }

          }}
          render={
            ({
               values,
               errors,
               touched,
               handleSubmit,
               isSubmitting,
               setFieldValue,
             }) => {
              return (
                <View>
                  <FormInput
                    invalid={!!errors.name && touched.name}
                    onChange={setFieldValue}
                    name="name"
                    value={values.name}
                    label={I18n.t('translation.fullName', {locale: this.props.ln})}
                  />
                  <FormInput
                    invalid={!!errors.business_name && touched.business_name}
                    onChange={setFieldValue}
                    name="business_name"
                    value={values.business_name}
                    label={I18n.t('translation.businessName', {locale: this.props.ln})}
                  />
                  <FormInput
                    invalid={!!errors.business_number && touched.business_number}
                    onChange={setFieldValue}
                    name="business_number"
                    value={values.business_number}
                    label={I18n.t('translation.businessNumber', {locale: this.props.ln})}
                  />
                  <FormInput
                    invalid={!!errors.address && touched.address}
                    onChange={setFieldValue}
                    name="address"
                    value={values.address}
                    label={I18n.t('translation.address', {locale: this.props.ln})}
                  />
                  <FormInput
                    invalid={!!errors.phone && touched.phone}
                    onChange={setFieldValue}
                    name="phone"
                    value={values.phone}
                    label={I18n.t('translation.phone', {locale: this.props.ln})}
                  />
                  <FormInput
                    invalid={!!errors.email && touched.phone}
                    onChange={setFieldValue}
                    name="email"
                    value={values.email}
                    label={I18n.t('translation.email', {locale: this.props.ln})}
                  />
                  <FormSelectDropdown
                    invalid={!!errors.interest_id && touched.phone}
                    onChange={setFieldValue}
                    selectedItems={values.interest_id}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.props.interestsobj[values.interest_id]}
                    label={I18n.t('translation.interestedIn', {locale: this.props.ln})}
                    values={this.props.interests}
                    name={'interest_id'}
                    ln={this.props.ln}
                  />
                  <View style={[styles.termsContainer]}>
                    <Text style={[styles.terms]}>{I18n.t('translation.byRegisteringYouAgree', {locale: this.props.ln})}</Text>
                    <Text style={[styles.termsLink]}>{I18n.t('translation.termsAndServices', {locale: this.props.ln})}</Text>
                    <CheckBox checked={this.state.termsChecked} onPress={this.termsCheckboxHandle.bind(this)} />
                  </View>
                  <FormButton
                    disabled={isSubmitting} onPress={handleSubmit}
                  >{I18n.t('translation.confirmToPurchase', {locale: this.props.ln})}</FormButton>
                </View>
              )
            }
          }
        />
      </View>
    )
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
}

export default RegisterForm
