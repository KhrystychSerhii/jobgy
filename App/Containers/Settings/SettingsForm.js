import React from 'react'
import PropTypes from 'prop-types'
import { Formik, FormikActions } from 'formik'
import Yup from 'yup'
import { View, ScrollView, I18nManager } from 'react-native'
import isArray from 'lodash/isArray'

import I18n from '../../I18n'
import { Colors } from '../../Themes'
import FormSelectDropdown from '../../Components/FormSelectDropdown'
import FormInput from '../../Components/FormInput'
import FormButton from '../../Components/FormButton/FormButton'
import { toggleItemInArray } from '../../Transforms/index'
import lodash from 'lodash'

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  business_name: Yup.string().required('Required'),
  business_number: Yup.string().required('Required'),
  description: Yup.string(),
  email: Yup.string().required('Email is required!').email('Invalid email address'),
  interest_id: Yup.number().required('Required'),
  name: Yup.string().required('Required'),
});

class SettingsForm extends React.Component {

  render () {
    const {onSubmit, userInfo, interests, ln} = this.props
    console.log('userInfo', userInfo);
    console.log('interests', interests);
    const initialValues = {
      address: userInfo.address,
      business_name: userInfo.business_name,
      business_number: userInfo.business_number,
      description: userInfo.description,
      email: userInfo.email,
      id: userInfo.id,
      interest_id: userInfo.interest.id,
      name: userInfo.name
    };
    return (
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, {setSubmitting, setErrors}) => {
          console.log('values => ', values);
          onSubmit(values)
            .catch((e) => {
              e.data.errors && setErrors(e.data.errors)
              setSubmitting(false)
            })
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
            // console.log('values ==> ', values);
            return (
              <View style={{flex: 1, width: '90%'}}>
                <ScrollView>
                  <FormInput
                    invalid={!!errors.name && touched.name}
                    name={'name'}
                    onChange={setFieldValue}
                    label={I18n.t('translation.fullName', {locale: ln})}
                    value={values.name}
                  />

                  <FormInput
                    invalid={!!errors.business_name && touched.business_name}
                    name={'business_name'}
                    onChange={setFieldValue}
                    label={I18n.t('translation.businessName', {locale: ln})}
                    value={values.business_name}
                  />
                  <FormInput
                    invalid={!!errors.business_number && touched.business_number}
                    name={'business_number'}
                    onChange={setFieldValue}
                    label={I18n.t('translation.businessNumber', {locale: ln})}
                    value={values.business_number}
                  />
                  <FormInput
                    invalid={!!errors.address && touched.address}
                    name={'address'}
                    onChange={setFieldValue}
                    label={I18n.t('translation.address', {locale: ln})}
                    value={values.address}
                  />
                  <FormInput
                    invalid={!!errors.email && touched.email}
                    name={'email'}
                    onChange={setFieldValue}
                    label={I18n.t('translation.email', {locale: ln})}
                    value={values.email}
                  />
                  <FormSelectDropdown
                    invalid={!!errors.interest_id && touched.interest_id}
                    onChange={setFieldValue}
                    selectedItems={values.interest_id}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={interests.filter(item => item.id === values.interest_id)[0].title}
                    label={I18n.t('translation.interestedIn', {locale: ln})}
                    values={interests}
                    name={'interest_id'}
                    ln={ln}
                  />
                  <FormInput
                    invalid={!!errors.description && touched.description}
                    name={'description'}
                    onChange={setFieldValue}
                    label={I18n.t('translation.description', {locale: ln})}
                    value={values.description}
                  />


                </ScrollView>
                <FormButton
                  style={{backgroundColor: Colors.lightBlue}}
                  // disabled={!filters && (Object.keys(errors).length > 0 || !this.state.regionFrom)}
                  onPress={handleSubmit}
                >{I18n.t('translation.saveChanges', {locale: ln})}</FormButton>
              </View>
            )
          }
        }
      />
    )
  }
}

SettingsForm.propTypes = {
  userInfo: PropTypes.any,
  interests: PropTypes.array,
  onSubmit: PropTypes.func,
}

export default SettingsForm
