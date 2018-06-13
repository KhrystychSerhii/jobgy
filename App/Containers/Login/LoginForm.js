import React from 'react'
import { View, Text } from 'react-native'
import { Formik } from 'formik'
import Yup from 'yup'
import FormInput from '../../Components/FormInput'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton'
import TextButton from '../../Components/TextButton';
import { FormTextInput } from '../../Components/FormTextInput';

import images from '../../Themes/Images';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .required('Required')
    .matches(/^(0(([23489]{1}[0-9]{7})|(5[012345689]{1}[0-9]{7})|'.'(79[23579]{1}[0-9]{6})|(718[0-9]{6})|(72[23]{1}[0-9]{6})|'.'(73[237]{1}[0-9]{6})|(747[0-9]{6})|(76[58]{1}[0-9]{6})|'.'(782[0-9]{6})|(77[0-9]{7})))$/, 'Incorrect number'),
  password: Yup.string().matches(/^.{6,}$/).required('Required'),
});
// example phone 027777777
class LoginForm extends React.Component {
  render () {
    return (
      <View style={styles.form}>
        <Formik
          onSubmit={(values, {setSubmitting, setErrors, setFieldError}) => {
            this.props.onSubmit(values)
              .catch(err => {
                setFieldError('password', err.message);
              });
          }}
          initialValues={{
            'phone': this.props.phone || '027777777',
            // 'password': 'secret',
            // phone: '',
            password: '',
          }}
          validationSchema={validationSchema}
          render={
            ({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
               setFieldValue,
               onCreateAccountPress,
               setFieldTouched,
               isValid
             }) => {
              console.log('errors ==> ', errors);
              return (
                <View>
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
                    invalid={errors.password && touched.password}
                    onChange={(value) => { setFieldValue('password', value);}}
                    onBlur={() => setFieldTouched('password')}
                    placeholder={I18n.t('translation.password', {locale: this.props.ln})}
                    value={values.password}
                    secureTextEntry={true}
                    required={true}
                  />

                  <FormButton
                    disabled={!isValid}
                    onPress={handleSubmit}>{I18n.t('translation.login', { locale: this.props.ln })}</FormButton>

                  <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                    <TextButton
                      onPress={this.props.onCreateAccountPress}
                      icon={
                        <View style={styles.textButtonIcon}>
                          <Text style={styles.textButtonIconText}>+</Text>
                        </View>
                      }
                      text={I18n.t('translation.createNewAccount', { locale: this.props.ln })}
                    />
                    <TextButton
                      onPress={this.props.onForgotPasswordPress}
                      text={I18n.t('translation.forgotPassword', { locale: this.props.ln })}
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

export default LoginForm
