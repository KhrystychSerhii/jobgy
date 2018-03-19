import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import Yup from 'yup'
import { View, ScrollView } from 'react-native'

import I18n from '../../I18n'
import { Colors } from '../../Themes'
import FormSelectDropdown from '../FormSelectDropdown'
import FormInput from '../FormInput'
import Row from '../Row'
import FormButton from '../FormButton/FormButton'
import FormDatePicker from '../FormInput/FormDatePicker'
import { toggleItemInArray } from '../../Transforms/index'

const validationSchema = Yup.object().shape({
  interest_id: Yup.number().required(),
  work_period_from: Yup.string().trim().required('Required!'),
  work_period_to: Yup.string().trim().required('Required!'),
  address_from: Yup.string().trim().required('Required'),
})

class JobForm extends React.Component {
  state = {
    regionFrom: null,
    regionTo: null,
  }

  handleSelectRegion = (name, value) => {
    this.setState({[name]: value})
  }

  getCitiesByRegionId = (regionId) => {
    if (!regionId) {
      return []
    }
    return Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => item.parent_id === regionId)
  }

  render () {
    const {onSubmit, interests, filters} = this.props
    const citiesFrom = this.getCitiesByRegionId(this.state.regionFrom)
    const citiesTo = this.getCitiesByRegionId(this.state.regionTo)
    const initialValues = !!filters ? filters : {
      interest_id: '',
      work_period_from: '',
      work_period_to: '',
      address_from: '',
      location_from: '',
      location_to: '',
    }
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {setSubmitting, setErrors}) => {
          onSubmit(values)
            .catch((e) => {
              e.data.errors && setErrors(e.data.errors)
              setSubmitting(false)
            })
        }}
        {...(!filters ? {validationSchema: validationSchema} : {})}
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
              <View style={{flex: 1}}>
                <ScrollView>
                  <FormSelectDropdown
                    invalid={!!errors.interest_id && touched.interest_id}
                    onChange={setFieldValue}
                    selectedItems={values.interest_id}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.props.interests[values.interest_id] && this.props.interests[values.interest_id].title}
                    label={I18n.t('FILTER_MODAL.SELECT_BLOCK_SIZE')}
                    values={interests}
                    name={'interest_id'}
                  />
                  <Row justifyContent={'space-between'}>
                    <View style={{width: '49%'}}>
                      <FormDatePicker
                        invalid={errors.work_period_from && touched.work_period_from}
                        onChange={setFieldValue}
                        readOnly value={values.work_period_from}
                        name={'work_period_from'}
                        label={I18n.t('JOB_FORM.START_WORK')}
                      />
                    </View>
                    <View style={{width: '49%'}}>
                      <FormDatePicker
                        invalid={errors.work_period_to && touched.work_period_to}
                        onChange={setFieldValue}
                        value={values.work_period_to}
                        readOnly name={'work_period_to'}
                        label={I18n.t('JOB_FORM.END_WORK')}
                      />
                    </View>
                  </Row>
                  <FormSelectDropdown
                    onChange={this.handleSelectRegion}
                    selectedItems={this.state.regionFrom}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.props.regionsObj[this.state.regionFrom] && this.props.regionsObj[this.state.regionFrom].title}
                    label={'Region From'}
                    values={this.props.regions}
                    name={'regionFrom'}
                  />
                  <FormSelectDropdown
                    multiple={!!filters}
                    invalid={!!errors.location_from && touched.location_from}
                    onChange={(name, value) => !!filters ? setFieldValue(name, toggleItemInArray(values[name], value)) : setFieldValue(name, value)}
                    selectedItems={values.location_from}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={
                      !filters
                        ? this.props.cities[values.location_from] && this.props.cities[values.location_from].title
                        : values.location_from.map(item => this.props.cities[item].title).join(', ')
                    }
                    label={'Location From'}
                    values={citiesFrom}
                    name={'location_from'}
                  />
                  {!!values.location_from && <FormSelectDropdown
                    onChange={this.handleSelectRegion}
                    selectedItems={this.state.regionTo}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.props.regionsObj[this.state.regionTo] && this.props.regionsObj[this.state.regionTo].title}
                    label={'Region To'}
                    values={this.props.regions}
                    name={'regionTo'}
                  />}
                  {!!this.state.regionTo && <FormSelectDropdown
                    multiple={!!filters}
                    onChange={(name, value) => !!filters ? setFieldValue(name, toggleItemInArray(values[name], value)) : setFieldValue(name, value)}
                    selectedItems={values.location_to}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={
                      !filters
                        ? this.props.cities[values.location_to] && this.props.cities[values.location_to].title
                        : values.location_to.map(item => this.props.cities[item].title).join(', ')
                    }
                    label={'Location to'}
                    values={citiesTo}
                    name={'location_to'}
                  />}
                  {!filters && <FormInput
                    invalid={!!errors.address_from && touched.address_from}
                    name={'address_from'}
                    onChange={setFieldValue}
                    label={I18n.t('JOB_FORM.ADDRESS_FROM')} value={values.address_from}
                  />}
                </ScrollView>
                <FormButton
                  style={filters && {backgroundColor: Colors.lightBlue}}
                  // disabled={!filters && (Object.keys(errors).length > 0 || !this.state.regionFrom)}
                  onPress={handleSubmit}
                >{I18n.t('JOB_FORM.POST')}</FormButton>
              </View>
            )
          }
        }
      />
    )
  }
}

JobForm.propTypes = {
  onSubmit: PropTypes.func,
  interests: PropTypes.array,
}

export default JobForm
