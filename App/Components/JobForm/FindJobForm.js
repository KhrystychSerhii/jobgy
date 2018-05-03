import React from 'react'
import PropTypes from 'prop-types'
import { Formik, FormikActions } from 'formik'
import Yup from 'yup'
import { View, ScrollView, I18nManager } from 'react-native'
import isArray from 'lodash/isArray'

import I18n from '../../I18n'
import { Colors } from '../../Themes'
import FormSelectDropdown from '../FormSelectDropdown'
import FormInput from '../FormInput'
import Row from '../Row'
import FormButton from '../FormButton/FormButton'
import FormDatePicker from '../FormInput/FormDatePicker'
import { toggleItemInArray } from '../../Transforms/index'
import lodash from 'lodash'

const validationSchema = Yup.object().shape({
  interest: Yup.number().required(),
  work_period_from: Yup.string().trim(), //.required('Required!'),
  work_period_to: Yup.string().trim(), //.required('Required!'),
  regions_from: Yup.string().trim(), //.required('Required'),
})

class FindJobForm extends React.Component {

  handleSelectRegion = (name, value) => {
    this.setState({[name]: value})
  }

  getCitiesByRegionsId = (regions) => {
    if (!regions) {
      return []
    } else {
      let regionsObj = {};

      for (let i = 0, length = regions.length; i < length; i++ ) {
        regionsObj[regions[i]] = regions[i]
      }
      return Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => !!regionsObj[item.parent_id]);// Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => item.parent_id === regionId)
    }
  }

  componentWillReceiveProps = (e) => {
    if (this.isFiltersEmpty(e.filters)) {
      this.handleResetForm();
    }
  }

  getAction = (formik) => {
    if (formik) this.formik = formik;
  }

  handleResetForm = () => {
    this.formik.handleReset();
  }

  /**
   * if the selected value is an array, the text 'you have selected N elements' is returned
   * if the length of the array is 1 then the name of the first element returned
   * @param selectFrom
   * @param value
   * @returns {*}
   */
  multipleSelectText = (selectFrom, value, ln) => {
    if (isArray(value) && value.length === 1) return selectFrom[value[0]] && selectFrom[value[0]].title;
    if (isArray(value) && value.length > 1) return I18n.t('translation.multiselectSelectedLabel', {count: value.length, locale: ln});
    return null;
  }

  isFiltersEmpty(filters) {
    for (let key in filters) {
      if (!!(typeof filters[key] === 'string' && filters[key])) return true;
      if (!!(isArray(filters[key]) && filters[key].length === 0)) return true;
    }
    return false;
  }

  render () {
    const {onSubmit, interests, filters, regions, ln} = this.props
    // const citiesFrom = this.getCitiesByRegionsId(this.state.regionFrom)
    // const citiesTo = this.getCitiesByRegionsId(this.state.regionTo)
console.log('find job form filters', filters);
    const initialValues = !!filters ? filters : {
      interest: '',

      work_period_from: '',
      work_period_to: '',

      regions_from: [],
      regions_to: [],

      location_from: [],
      location_to: [],
    }
    return (
      <Formik
        ref={this.getAction.bind(this)}
        initialValues={initialValues}
        enableReinitialize={true}
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
            // console.log('values ==> ', values);
            return (
              <View style={{flex: 1}}>
                <ScrollView>
                  <FormSelectDropdown
                    multiple={true}
                    onChange={setFieldValue}
                    selectedItems={values.regions_from}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.multipleSelectText(regions, values.regions_from, ln)}
                    label={I18n.t('translation.selectRegionFrom', {locale: ln})}
                    values={regions}
                    name={'regions_from'}
                    ln={ln}
                  />


                  <FormSelectDropdown
                    multiple={true}
                    invalid={!!errors.location_from && touched.location_from}
                    onChange={setFieldValue}
                    selectedItems={values.location_from}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.multipleSelectText(this.props.cities, values.location_from, ln)}
                    label={I18n.t('translation.selectLocationFrom', {locale: ln})}
                    values={this.getCitiesByRegionsId(values.regions_from)}
                    name={'location_from'}
                    ln={ln}
                  />


                  <FormSelectDropdown
                    multiple={true}
                    onChange={setFieldValue}
                    selectedItems={values.regions_to}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.multipleSelectText(this.props.regions, values.regions_to, ln)}
                    label={I18n.t('translation.selectRegionTo', {locale: ln})}
                    values={this.props.regions}
                    name={'regions_to'}
                    ln={ln}
                  />


                  <FormSelectDropdown
                    multiple={true}
                    onChange={setFieldValue}
                    selectedItems={values.location_to}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.multipleSelectText(this.props.cities, values.location_to, ln)}
                    label={I18n.t('translation.selectLocationTo', {locale: ln})}
                    values={this.getCitiesByRegionsId(values.regions_to)}
                    name={'location_to'}
                    ln={ln}
                  />

                  <Row flexDirection={'row'} justifyContent={'space-between'}>
                    <View style={{width: '48%', marginBottom: 10}}>
                      <FormDatePicker
                        invalid={errors.work_period_from && touched.work_period_from}
                        onChange={setFieldValue}
                        readOnly value={values.work_period_from}
                        name={'work_period_from'}
                        label={I18n.t('translation.beginningOfWork', {locale: ln})}
                      />
                    </View>
                    <View style={{width: '48%', marginBottom: 10}}>
                      <FormDatePicker
                        invalid={errors.work_period_to && touched.work_period_to}
                        onChange={setFieldValue}
                        value={values.work_period_to}
                        readOnly name={'work_period_to'}
                        label={I18n.t('translation.endOfWork', {locale: ln})}
                      />
                    </View>
                  </Row>

                  <FormSelectDropdown
                    invalid={!!errors.interest && touched.interest}
                    onChange={setFieldValue}
                    selectedItems={values.interest}
                    textField={'title'}
                    valueField={'id'}
                    selectedText={this.props.interests.filter(item => values.interest === item.id)[0] && this.props.interests.filter(item => values.interest === item.id)[0].title}
                    label={I18n.t('translation.selectInterest', {locale: ln})}
                    values={interests}
                    name={'interest'}
                    ln={ln}
                  />


                </ScrollView>
                <FormButton
                  style={filters && {backgroundColor: Colors.lightBlue}}
                  // disabled={!filters && (Object.keys(errors).length > 0 || !this.state.regionFrom)}
                  onPress={handleSubmit}
                >{I18n.t('translation.applyFilters', {locale: ln})}</FormButton>
              </View>
            )
          }
        }
      />
    )
  }
}

FindJobForm.propTypes = {
  onSubmit: PropTypes.func,
  interests: PropTypes.array,
  ln: PropTypes.any
}

export default FindJobForm
