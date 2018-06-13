import React from 'react'
import PropTypes from 'prop-types'
import { Formik, FormikActions } from 'formik'
import Yup from 'yup'
import { View, ScrollView, I18nManager } from 'react-native'

import I18n from '../../I18n'
import { Colors } from '../../Themes'
import FormSelectDropdown from '../../Components/FormSelectDropdown'
import FormInput from '../../Components/FormInput'
import FormButton from '../../Components/FormButton/FormButton'
import { FormTextInput, FormTextArea } from '../../Components/FormTextInput';
import { SingleSelectDropdown } from '../../Components/SelectDropdown';
import { toggleItemInArray } from '../../Transforms/index'
import { isArray, isEmpty } from 'lodash'

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  business_name: Yup.string().required('Required'),
  business_number: Yup.number().required('Required'),
  description: Yup.string(),
  email: Yup.string().email('Invalid email address').nullable(),
  interest_id: Yup.number().required('Required'),
  name: Yup.string().required('Required'),
});

class SettingsForm extends React.Component {

  render () {
    const {onSubmit, userInfo, interests, ln} = this.props;

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
          onSubmit(values)
            .catch((e) => {
              e.data.errors && setErrors(e.data.errors);
              setSubmitting(false);
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
             setFieldTouched,
             isValid
           }) => {
            return (
              <View style={{flex: 1, width: '90%'}}>
                <ScrollView>
                  <FormTextInput
                    invalid={errors.name && touched.name}
                    onChange={(value) => { setFieldValue('name', value);}}
                    onBlur={() => setFieldTouched('name')}
                    placeholder={I18n.t('translation.fullName', {locale: ln})}
                    value={values.name}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.business_name && touched.business_name}
                    onChange={(value) => { setFieldValue('business_name', value);}}
                    onBlur={() => setFieldTouched('business_name')}
                    placeholder={I18n.t('translation.businessName', {locale: ln})}
                    value={values.business_name}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.business_number && touched.business_number}
                    onChange={(value) => { setFieldValue('business_number', value.replace(/\D/g, '')); }}
                    onBlur={() => setFieldTouched('business_number')}
                    placeholder={I18n.t('translation.businessNumber', {locale: ln})}
                    value={values.business_number}
                    required={true}
                    keyboardType={'phone-pad'}
                  />
                  <FormTextInput
                    invalid={errors.address && touched.address}
                    onChange={(value) => { setFieldValue('address', value);}}
                    onBlur={() => setFieldTouched('address')}
                    placeholder={I18n.t('translation.address', {locale: ln})}
                    value={values.address}
                    required={true}
                  />
                  <FormTextInput
                    invalid={errors.email && touched.email}
                    onChange={(value) => { setFieldValue('email', value);}}
                    onBlur={() => setFieldTouched('email')}
                    placeholder={I18n.t('translation.email', {locale: ln})}
                    value={values.email}
                    keyboardType={'email-address'}
                  />

                  {/*<FormSelectDropdown*/}
                    {/*invalid={!!errors.interest_id && touched.interest_id}*/}
                    {/*onChange={setFieldValue}*/}
                    {/*selectedItems={values.interest_id}*/}
                    {/*textField={'title'}*/}
                    {/*valueField={'id'}*/}
                    {/*selectedText={interests.filter(item => item.id === values.interest_id)[0].title}*/}
                    {/*label={I18n.t('translation.interestedIn', {locale: ln})}*/}
                    {/*values={interests}*/}
                    {/*name={'interest_id'}*/}
                    {/*ln={ln}*/}
                  {/*/>*/}

                  <SingleSelectDropdown
                    invalid={errors.interest_id && touched.interest_id}
                    items={[].concat(interests)}
                    onSelect={(selectedItem) => {
                      setFieldValue('interest_id', selectedItem)
                    }}
                    makeTouched={() => {
                      setFieldTouched('interest_id')
                    }}
                    selectedItem={values.interest_id}
                    displayedProperty={'title'}
                    valueProperty={'id'}
                    label={I18n.t('translation.interestedIn', {locale: ln})}
                    locale={ln}
                    required={true}
                  />

                  <FormTextArea
                    invalid={errors.description && touched.description}
                    onBlur={() => setFieldTouched('description')}
                    onChange={(value) => { setFieldValue('description', value) }}
                    value={values.description}
                    placeholder={I18n.t('translation.description', {locale: ln})}
                  />
                </ScrollView>
                <FormButton
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
// handleSubmit

SettingsForm.propTypes = {
  userInfo: PropTypes.any,
  interests: PropTypes.array,
  onSubmit: PropTypes.func,
}

export default SettingsForm
