import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, Text, Linking } from 'react-native'
import { Formik } from 'formik'
import Yup from 'yup'

import FormInput from '../../Components/FormInput'
import I18n from '../../I18n'
import styles from './styles'
import AppConfig from '../../Config/AppConfig';
import FormButton from '../../Components/FormButton'
import FormSelectDropdown from '../../Components/FormSelectDropdown/FormSelectDropdown'
import CheckBox from '../../Components/CheckBox'
import { FormTextInput } from '../../Components/FormTextInput';
import { SingleSelectDropdown } from '../../Components/SelectDropdown'
import { isEmpty } from 'lodash';

const validationSchema = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email address').nullable(),
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
  };

  termsCheckboxHandle = () => {
    this.setState({termsChecked: !this.state.termsChecked});
  };

  openTerms = () => {
    // console.log('termsLink => ', AppConfig.termsLink)
    Linking.openURL(AppConfig.termsLink);
  };

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
                  e.data.errors && setErrors(e.data.errors);
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
               setFieldTouched,
               isValid
             }) => {
              return (
                <View>
                  <FormTextInput
                    invalid={errors.name && touched.name}
                    onChange={(value) => { setFieldValue('name', value);}}
                    onBlur={() => setFieldTouched('name')}
                    placeholder={I18n.t('translation.fullName', {locale: this.props.ln})}
                    value={values.name}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.business_name && touched.business_name}
                    onChange={(value) => { setFieldValue('business_name', value);}}
                    onBlur={() => setFieldTouched('business_name')}
                    placeholder={I18n.t('translation.businessName', {locale: this.props.ln})}
                    value={values.business_name}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.business_number && touched.business_number}
                    onChange={(value) => { setFieldValue('business_number', value);}}
                    onBlur={() => setFieldTouched('business_number')}
                    placeholder={I18n.t('translation.businessNumber', {locale: this.props.ln})}
                    value={values.business_number}
                    keyboardType={'phone-pad'}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.address && touched.address}
                    onChange={(value) => { setFieldValue('address', value);}}
                    onBlur={() => setFieldTouched('address')}
                    placeholder={I18n.t('translation.address', {locale: this.props.ln})}
                    value={values.address}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.phone && touched.phone}
                    onChange={(value) => { setFieldValue('phone', value);}}
                    onBlur={() => setFieldTouched('phone')}
                    placeholder={I18n.t('translation.phone', {locale: this.props.ln})}
                    value={values.phone}
                    keyboardType={'phone-pad'}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.email && touched.email}
                    onChange={(value) => { setFieldValue('email', value);}}
                    onBlur={() => setFieldTouched('email')}
                    placeholder={I18n.t('translation.email', {locale: this.props.ln})}
                    value={values.email}
                    keyboardType={'email-address'}
                  />
                  <SingleSelectDropdown
                    invalid={errors.interest_id && touched.interest_id}
                    items={[].concat(this.props.interests)}
                    onSelect={(selectedItem) => {
                      setFieldValue('interest_id', selectedItem)
                    }}
                    makeTouched={() => {
                      setFieldTouched('interest_in');
                    }}
                    selectedItem={values.interest_id}
                    displayedProperty={'title'}
                    valueProperty={'id'}
                    label={I18n.t('translation.interestedIn', {locale: this.props.ln})}
                    locale={this.props.ln}
                    required={true}
                  />

                  <View style={[styles.termsContainer]}>

                    <Text style={[styles.termsLink]} onPress={this.openTerms}>{I18n.t('translation.termsAndServices', {locale: this.props.ln})}</Text>
                    <Text style={[styles.terms]}>{` ${I18n.t('translation.byRegisteringYouAgree', {locale: this.props.ln})} `}</Text>
                    <CheckBox checked={this.state.termsChecked} onPress={this.termsCheckboxHandle} />
                  </View>
                  <FormButton
                    backgroundColor={'#13326a'}
                    onPress={handleSubmit}
                    disabled={!this.state.termsChecked}
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
