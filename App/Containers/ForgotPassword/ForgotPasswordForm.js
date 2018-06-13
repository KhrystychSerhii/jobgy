import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, Text } from 'react-native'
import { Formik } from 'formik'
import Yup from 'yup'

import FormInput from '../../Components/FormInput'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton'
import TextButton from '../../Components/TextButton';
import { FormTextInput } from '../../Components/FormTextInput';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .required('Required')
    .matches(/^(0(([23489]{1}[0-9]{7})|(5[012345689]{1}[0-9]{7})|'.'(79[23579]{1}[0-9]{6})|(718[0-9]{6})|(72[23]{1}[0-9]{6})|'.'(73[237]{1}[0-9]{6})|(747[0-9]{6})|(76[58]{1}[0-9]{6})|'.'(782[0-9]{6})|(77[0-9]{7})))$/, 'Incorrect number'),
});

class ForgotPasswordForm extends React.Component {
  render () {
    return (
      <View style={styles.form}>
        <Formik
          initialValues={{
            phone: ''
          }}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, setErrors}) => {
            this.props.onSubmit(values)
          }}
          render={
            ({
              values,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              isValid
            }) => {
              return (
                <View>
                  <FormTextInput
                    valid={!errors.phone && touched.phone}
                    onChange={(value) => { setFieldValue('phone', value);}}
                    placeholder={I18n.t('translation.phoneNumber', {locale: this.props.ln})}
                    value={values.phone}
                    keyboardType={'phone-pad'}
                    required={true}
                  />

                  <FormButton
                    disabled={!isValid}
                    onPress={handleSubmit}
                  >{I18n.t('translation.getNewPassViaSMS', {locale: this.props.ln})}</FormButton>

                  <View style={{flex: 0, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20}}>
                    <TextButton
                      onPress={this.props.onBackPress}
                      text={I18n.t('translation.backToLogin', {locale: this.props.ln})}
                    />
                  </View>
                </View>
              )
            }
          }
        />
      </View>
    )
  }
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ForgotPasswordForm;
