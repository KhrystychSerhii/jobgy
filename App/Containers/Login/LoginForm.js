import React from 'react'
import { View, Text } from 'react-native'
import { Formik } from 'formik'
import Yup from 'yup'
import FormInput from '../../Components/FormInput'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton'
import TextButton from '../../Components/TextButton';

import images from '../../Themes/Images';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .required('Required')
    .matches(/^(0(([23489]{1}[0-9]{7})|(5[012345689]{1}[0-9]{7})|'.'(79[23579]{1}[0-9]{6})|(718[0-9]{6})|(72[23]{1}[0-9]{6})|'.'(73[237]{1}[0-9]{6})|(747[0-9]{6})|(76[58]{1}[0-9]{6})|'.'(782[0-9]{6})|(77[0-9]{7})))$/, 'Incorrect number'),
  password: Yup.string().matches(/^.{6,}$/).required('Required'),
})
// example phone 027777777
class LoginForm extends React.Component {
  render () {
    return (
      <View style={styles.form}>
        <Formik
          onSubmit={(values, {setSubmitting, setErrors}) => {
            this.props.onSubmit(values)
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
               onCreateAccountPress
             }) => (
              <View>
                <FormInput
                  invalid={!!errors.phone && touched.phone}
                  onChange={setFieldValue}
                  name="phone"
                  value={values.phone}
                  label={I18n.t('translation.phone', { locale: this.props.ln })}
                />
                <FormInput
                  invalid={!!errors.password && touched.password}
                  inputProps={{secureTextEntry: true}}
                  onChange={setFieldValue}
                  name="password"
                  value={values.password}
                  label={I18n.t('translation.password', { locale: this.props.ln })}
                />
                <FormButton onPress={handleSubmit}>{I18n.t('translation.login', { locale: this.props.ln })}</FormButton>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                  <TextButton
                    onPress={this.props.onForgotPasswordPress}
                    text={I18n.t('translation.forgotPassword', { locale: this.props.ln })}
                  />
                  <TextButton
                    onPress={this.props.onCreateAccountPress}
                    icon={
                      <View style={styles.textButtonIcon}>
                        <Text style={styles.textButtonIconText}>+</Text>
                      </View>
                    }
                    text={I18n.t('translation.createNewAccount')}
                  />
                </View>
              </View>
            )
          }
        />
      </View>
    )
  }
}

export default LoginForm
