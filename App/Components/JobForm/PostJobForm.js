import React from 'react'

import { TouchableOpacity, Image, Text } from 'react-native';
import { Images, Fonts } from '../../Themes'


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

const OptionalAttributesFields = ({attribute, values, errors, touched, ln, setFieldValue}) => {
  switch (attribute.attribute_type_id) {
    case 1:
      return null;
      break;

    case 2:
      return (
        <TouchableOpacity
          style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: '#fff', backgroundColor: '#fff', borderWidth: 1, marginBottom: 10, padding: 20, borderRadius: 8}}
        >
          <Image resizeMode={'contain'} source={Images.camera} style={{height: 30}} />
          <Text
            style={{
              color: Colors.black,
              ...Fonts.style.input,
              fontWeight: '500',
              alignSelf: 'center'
            }}
          >
            { attribute.title }
          </Text>
        </TouchableOpacity>
      )
      break;

    case 3:
      return null
      break;

    case 4:
      return (
        <FormInput
          invalid={!!errors.text && touched.text}
          name={'text'}
          onChange={setFieldValue}
          label={attribute.title}
        />
      )
      break;

    case 5:
      return (
        <FormInput
          invalid={!!errors.number && touched.number}
          name={'number'}
          onChange={setFieldValue}
          label={attribute.title}
          value={values.number}
        />
      )
      break;

    case 6:
      return (
        <View
          style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}
        >
          <View
            style={{width: '49.5%'}}
          >
            <FormInput
              invalid={!!errors.text && touched.text}
              name={'text'}
              onChange={setFieldValue}
              keyboardType={'number'}
              label={I18n.t('translation.amount', {locale: ln})}
            />
          </View>
          <View
            style={{width: '49.5%'}}
          >
            <FormSelectDropdown
              invalid={!!errors.interest_id && touched.interest_id}
              onChange={setFieldValue}
              selectedItems={values.interest_id}
              textField={'title'}
              valueField={'id'}
              selectedText={attribute.entries.filter(item => values.interest_id === item.id)[0] && attribute.entries.filter(item => values.interest_id === item.id)[0].title}
              label={attribute.title}
              values={attribute.entries}
              name={'interest_id'}
              ln={ln}
            />
          </View>
        </View>
      )
      break;

    default:
      console.log('incorrect attribute_type_id value', attribute.attribute_type_id);
      return null;
      break;
  }
};

const DefaultFields = ({values, errors, touched, ln, regions, cities, interests, citiesTo, citiesFrom, regionFrom, regionTo, setFieldValue, handleSelectRegion, singleItemSelectedText}) => {
  return (
    <View>
      <FormSelectDropdown

        onChange={handleSelectRegion}
        selectedItems={regionFrom}
        textField={'title'}
        valueField={'id'}
        selectedText={singleItemSelectedText(regions, regionFrom, 'id', 'title')}
        label={I18n.t('translation.selectRegionFrom', {locale: ln})}
        values={regions}
        name={'regionFrom'}
        ln={ln}
      />

      <FormSelectDropdown

        invalid={!!errors.location_from && touched.location_from}
        onChange={setFieldValue}
        selectedItems={values.location_from}
        textField={'title'}
        valueField={'id'}
        selectedText={singleItemSelectedText(!regionFrom ? [] : Object.keys(cities).map(key => cities[key]).filter(item => regionFrom === item.parent_id), values.location_from, 'id', 'title')}
        label={I18n.t('translation.selectLocationFrom', {locale: ln})}
        values={!regionFrom ? [] : Object.keys(cities).map(key => cities[key]).filter(item => regionFrom === item.parent_id)}
        name={'location_from'}
        ln={ln}
      />

      <FormInput
        invalid={!!errors.address_from && touched.address_from}
        name={'address_from'}
        onChange={setFieldValue}
        label={I18n.t('translation.addressFrom', {locale: ln})} value={values.address_from}
      />

      <FormSelectDropdown

        onChange={handleSelectRegion}
        selectedItems={regionTo}
        textField={'title'}
        valueField={'id'}
        selectedText={singleItemSelectedText(regions, regionTo, 'id', 'title')}
        label={I18n.t('translation.selectRegionTo', {locale: ln})}
        values={regions}
        name={'regionTo'}
        ln={ln}
      />


      <FormSelectDropdown

        onChange={setFieldValue}
        selectedItems={values.location_to}
        textField={'title'}
        valueField={'id'}
        selectedText={singleItemSelectedText(!regionFrom ? [] : Object.keys(cities).map(key => cities[key]).filter(item => regionTo === item.parent_id), values.location_to, 'id', 'title')}
        label={I18n.t('translation.selectLocationTo', {locale: ln})}
        values={!regionFrom ? [] : Object.keys(cities).map(key => cities[key]).filter(item => regionTo === item.parent_id)}
        name={'location_to'}
        ln={ln}
      />

      <FormInput
        invalid={!!errors.address_to && touched.address_to}
        name={'address_to'}
        onChange={setFieldValue}
        label={I18n.t('translation.addressTo', {locale: ln})}
        value={values.address_to}
      />

      <Row flexDirection={'row'} justifyContent={'space-between'}>
        <View style={{width: '48%', marginBottom: 10}}>
          <FormDatePicker
            invalid={errors.work_period_from && touched.work_period_from}
            onChange={setFieldValue}
            readOnly value={values.work_period_from}
            name={'work_period_from'}
            label={I18n.t('translation.beginningOfWork')}
          />
        </View>
        <View style={{width: '48%', marginBottom: 10}}>
          <FormDatePicker
            invalid={errors.work_period_to && touched.work_period_to}
            onChange={setFieldValue}
            value={values.work_period_to}
            readOnly name={'work_period_to'}
            label={I18n.t('translation.endOfWork')}
          />
        </View>
      </Row>

      <FormSelectDropdown
        invalid={!!errors.interest_id && touched.interest_id}
        onChange={setFieldValue}
        selectedItems={values.interest_id}
        textField={'title'}
        valueField={'id'}
        selectedText={singleItemSelectedText(interests, values.interest_id, 'id', 'title')}
        label={I18n.t('translation.selectInterest', {locale: ln})}
        values={interests}
        name={'interest_id'}
        ln={ln}
      />

      {/*<FormInput*/}
        {/*invalid={!!errors.address_to && touched.address_to}*/}
        {/*name={'notes'}*/}
        {/*onChange={setFieldValue}*/}
        {/*label={I18n.t('translation.notes', {locale: ln})}*/}
        {/*value={values.address_to}*/}
      {/*/>*/}

    </View>
  )
}

const validationSchema = Yup.object().shape({
  interest_id: Yup.number().required(),
  work_period_from: Yup.string().trim(), //.required('Required!'),
  work_period_to: Yup.string().trim(), //.required('Required!'),
  address_from: Yup.string().trim(), //.required('Required'),
})

class PostJobForm extends React.Component {
  state = {
    regionFrom: '',
    regionTo: ''
  }

  handleSelectRegion = (name, value) => {
    this.setState({[name]: value})
  }

  getCitiesByRegionsId = (region) => {
    console.log('this.props.cities', this.props.cities);
    console.log('region', region);
    if (!region) {
      return []
    } else {
      return Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => region.id === item.parent_id);// Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => item.parent_id === regionId)
    }
  }

  handleResetForm = () => {
    this.formik.handleReset();
    this.setState({
      regionFrom: '',
      regionTo: ''
    });
  }

  singleItemSelectedText = (array, value, by, name) => {
    if (array && isArray(array) && array.length > 0 && (value || value === 0) && name) {
      const item = array.filter(item => { return item[by] === value })[0];
      return item[name]
    } else {
      return ''
    }
  }

  /**
   * if the selected value is an array, the text 'you have selected N elements' is returned
   * if the length of the array is 1 then the name of the first element returned
   * @param selectFrom
   * @param value
   * @returns {*}
   */
  multipleSelectText = (selectFrom, value) => {
    if (isArray(value) && value.length === 1) return selectFrom[value[0]] && selectFrom[value[0]].title;
    if (isArray(value) && value.length > 1) return I18n.t('translation.multiselectSelectedLabel', {count: value.length});
    return null;
  }

  render () {
    const {onSubmit, interests, filters, attributes, ln, regions, cities} = this.props
    const citiesFrom = this.getCitiesByRegionsId(this.state.regionFrom)
    const citiesTo = this.getCitiesByRegionsId(this.state.regionTo)

    console.log('attributes', attributes)

    const initialValues = !!filters ? filters : {
      interest_id: '',
      work_period_from: '',
      work_period_to: '',
      address_from: '',
      address_to: '',
      location_from: '',
      location_to: '',
    }
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, {setSubmitting, setErrors}) => {
          const formValues = Object.assign({
            regions_from: this.state.regionFrom,
            regions_to: this.state.regionTo
          }, values);
          onSubmit(formValues)
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
                  {/*{*/}
                    {/*(attributes && attributes.attributes && attributes.attributes.length && attributes.attributes.length > 0) ?*/}
                      {/*attributes*/}
                        {/*.attributes*/}
                        {/*.map((item, i) => (*/}
                          {/*<OptionalAttributesFields*/}
                            {/*key={i}*/}
                            {/*attribute={item}*/}
                            {/*values={values}*/}
                            {/*errors={errors}*/}
                            {/*touched={touched}*/}
                            {/*ln={ln}*/}
                            {/*setFieldValue={setFieldValue}*/}
                          {/*/>*/}
                        {/*)) : null*/}
                  {/*}*/}

                  <DefaultFields
                    values={values}
                    errors={errors}
                    touched={touched}
                    ln={ln}
                    regions={regions}
                    cities={cities}
                    interests={interests}
                    citiesTo={citiesTo}
                    citiesFrom={citiesFrom}
                    regionFrom={this.state.regionFrom}
                    regionTo={this.state.regionTo}
                    setFieldValue={setFieldValue}
                    handleSelectRegion={this.handleSelectRegion.bind(this)}
                    singleItemSelectedText={this.singleItemSelectedText.bind(this)}
                  />
                </ScrollView>
                <FormButton
                  style={filters && {backgroundColor: Colors.lightBlue}}
                  // disabled={!filters && (Object.keys(errors).length > 0 || !this.state.regionFrom)}
                  onPress={handleSubmit}
                >{I18n.t('translation.applyFilters', { locale: ln })}</FormButton>
              </View>
            )
          }
        }
      />
    )
  }
}

PostJobForm.propTypes = {
  onSubmit: PropTypes.func,
  interests: PropTypes.array,
  ln: PropTypes.any,
  cities: PropTypes.any,
  regions: PropTypes.any
}

export default PostJobForm
