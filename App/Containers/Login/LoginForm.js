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
  password: Yup.string().required('Required'),
})

class LoginForm extends React.Component {
  render () {
    return (
      <View style={styles.form}>
        <Formik
          onSubmit={(values, {setSubmitting, setErrors}) => {
            this.props.onSubmit(values)
          }}
          initialValues={{
            'phone': this.props.phone || '',
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
             }) => (
              <View>
                <FormInput
                  invalid={!!errors.phone && touched.phone}
                  onChange={setFieldValue}
                  name="phone"
                  value={values.phone}
                  label={I18n.t('LOGIN.PHONE')}
                />
                <FormInput
                  invalid={!!errors.password && touched.password}
                  inputProps={{secureTextEntry: true}}
                  onChange={setFieldValue}
                  name="password"
                  value={values.password}
                  label={I18n.t('LOGIN.PASSWORD')}
                />
                <FormButton onPress={handleSubmit}>{I18n.t('LOGIN.SUBMIT')}</FormButton>
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15, marginTop: 30}}>
                  <TextButton
                    onPress={() => {console.log('press button 2')}}
                    text={'forgot password?'}
                  />
                  <TextButton
                    onPress={() => {console.log('press button 1')}}
                    icon={
                      <View style={styles.textButtonIcon}>
                        <Text style={styles.textButtonIconText}>+</Text>
                      </View>
                    }
                    text={'create account'}
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
