import React from 'react'
import PropTypes from 'prop-types'
import { Formik, FormikActions } from 'formik'
import Yup from 'yup'
import { View, ScrollView, I18nManager } from 'react-native'
import { isArray, sortBy } from 'lodash'

import I18n from '../../I18n'
import { Colors } from '../../Themes'
import FormSelectDropdown from '../FormSelectDropdown'
import FormInput from '../FormInput'
import Row from '../Row'
import FormButton from '../FormButton/FormButton'
import FormDatePicker from '../FormInput/FormDatePicker'
import DatePicker from '../../Components/DatePicker';
import { MultiSelectDropdown, SingleSelectDropdown } from '../../Components/SelectDropdown'
import { FormTextArea, FormTextInput } from '../FormTextInput';
import { toggleItemInArray } from '../../Transforms/index'

const validationSchema = Yup.object().shape({
  interest: Yup.number().required(),
  work_period_from: Yup.string().trim(), //.required('Required!'),
  work_period_to: Yup.string().trim(), //.required('Required!'),
  regions_from: Yup.string().trim(), //.required('Required'),
});

class FindJobForm extends React.Component {
  static defaultProps = {
    attributes: {
      attributes: [],
      visibilities: []
    }
  };

  handleSelectRegion = (name, value) => {
    this.setState({[name]: value})
  }

  getCitiesByRegionsId = (regions) => {
    console.log('regions => ', regions);
    if (!regions) {
      console.log('return empty array');
      return [];
    } else {
      let regionsObj = {};

      for (let i = 0, length = regions.length; i < length; i++ ) {
        regionsObj[regions[i]] = regions[i]
      }
      return Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => !!regionsObj[item.parent_id]);// Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => item.parent_id === regionId)
    }
  };

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

  isFiltersEmpty = (filters) => {
    for (let key in filters) {
      if (!!(typeof filters[key] === 'string' && filters[key])) return true;
      if (!!(isArray(filters[key]) && filters[key].length === 0)) return true;
    }
    return false;
  };

  //
  _isArrayCheck = (object, field) => {
    return object && isArray(object[field]);
  };

  _isStringCheck = (object, field) => {
    return object && (!!object[field] || object[field] === 0);
  };

  render () {
    const {onSubmit, interests, attributes, filters, regions, ln, isUserPremium} = this.props;
    // const citiesFrom = this.getCitiesByRegionsId(this.state.regionFrom)
    // const citiesTo = this.getCitiesByRegionsId(this.state.regionTo)
    let initialValues = {
      // location_from
      region_from: this._isArrayCheck(filters, 'region_from') ? filters.region_from : [],
      location_from: this._isArrayCheck(filters, 'location_from') ? filters.location_from : [],

      // location_to
      region_to: this._isArrayCheck(filters, 'region_to') ? filters.region_to : [],
      location_to: this._isArrayCheck(filters, 'location_to') ? filters.location_to : [],

      // address_from
      addr_from: this._isStringCheck(filters, 'location_to') ? filters.addr_from : '',
      // address_to
      addr_to: this._isStringCheck(filters, 'addr_to') ? filters.addr_to : '',

      // work_period_from
      work_period_from: this._isStringCheck(filters, 'work_period_from') ? filters.work_period_from : '',
      // work_period_to
      work_period_to: this._isStringCheck(filters, 'work_period_to') ? filters.work_period_to : '',

      // interest
      interest: this._isStringCheck(filters, 'interest') ? filters.interest : '',
    };

    const dynamicVisibleAttributes = sortBy(
      attributes.attributes
        .filter(item => (item.attribute_type_id === 3 || item.attribute_type_id === 1))
        .map(item => {
          switch (item.attribute_type_id) {
            case 1:
              initialValues[item.id] = [];
              break;
            case 3:
              initialValues[item.id] = '';
              break;
            default:
              break;
          }
          return item;
        }),
        'display_order'
    );
    const defaultHiddenFields = attributes.visibilities.map(item => {
      return {
        [item['name']]: item.visible
      }
    }).filter(item => {
      let key = Object.keys(item)[0];
      return item[key] === 0;
    }).reduce((result, item, index, array) => {
      let key = Object.keys(item)[0];
      result[key] = true;
      delete initialValues[key];
      return result;
    }, {});

    // {...(!filters ? {validationSchema: validationSchema} : {})}
    return (

      <Formik
        ref={this.getAction.bind(this)}
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, {setSubmitting, setErrors}) => {
          onSubmit(values)
            .catch((e) => {
              e.data.errors && setErrors(e.data.errors);
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
             setFieldTouched
           }) => {
            return (
              <View style={{flex: 1}}>
                <ScrollView>
                  {
                    dynamicVisibleAttributes.map((field, index) => {
                      return field.attribute_type_id === 1 ?
                        <MultiSelectDropdown
                          key={index}
                          items={[].concat(field.entries)}
                          onSelect={(selectedItems) => { setFieldValue('' + field.id, selectedItems); }}
                          selectedItems={values['' + field.id]}
                          displayedProperty={'title'}
                          valueProperty={'id'}
                          label={field.title}
                          locale={ln}
                        /> : null
                    })
                  }

                  {
                    !defaultHiddenFields.location_from ?
                      <MultiSelectDropdown
                        items={[].concat(regions)}
                        onSelect={(selectedItems) => { setFieldValue('region_from', selectedItems) }}
                        displayedProperty={'title'}
                        selectedItems={values.region_from}
                        valueProperty={'id'}
                        label={I18n.t('translation.selectRegionFrom', {locale: ln})}
                        locale={ln}
                      /> : null
                  }

                  {
                    !defaultHiddenFields.location_from ?
                      <MultiSelectDropdown
                        items={[].concat(this.getCitiesByRegionsId(values.region_from))}
                        onSelect={(selectedItems) => { setFieldValue('location_from', selectedItems) }}
                        displayedProperty={'title'}
                        selectedItems={values.location_from}
                        valueProperty={'id'}
                        label={I18n.t('translation.selectLocationFrom', {locale: ln})}
                        locale={ln}
                        disabled={values.region_from.length === 0}
                      /> : null
                  }

                  {/*{*/}
                    {/*!defaultHiddenFields.address_from ?*/}
                      {/*<MultiSelectDropdown*/}
                        {/*items={[].concat(regions)}*/}
                        {/*onSelect={(selectedItems) => { setFieldValue('addr_from', selectedItems); }}*/}
                        {/*displayedProperty={'title'}*/}
                        {/*selectedItems={values.addr_from}*/}
                        {/*valueProperty={'id'}*/}
                        {/*label={I18n.t('translation.selectRegionFrom', {locale: ln})}*/}
                        {/*locale={ln}*/}
                      {/*/> : null*/}
                  {/*}*/}

                  {
                    !defaultHiddenFields.location_to ?
                      <MultiSelectDropdown
                        items={[].concat(regions)}
                        onSelect={(selectedItems) => { setFieldValue('region_to', selectedItems) }}
                        displayedProperty={'title'}
                        selectedItems={values.region_to}
                        valueProperty={'id'}
                        label={I18n.t('translation.selectRegionTo', {locale: ln})}
                        locale={ln}
                      /> : null
                  }

                  {
                    !defaultHiddenFields.location_to ?
                      <MultiSelectDropdown
                        items={[].concat(this.getCitiesByRegionsId(values.region_to))}
                        onSelect={(selectedItems) => { setFieldValue('location_to', selectedItems) }}
                        displayedProperty={'title'}
                        selectedItems={values.location_to}
                        valueProperty={'id'}
                        label={I18n.t('translation.selectLocationTo', {locale: ln})}
                        locale={ln}
                        disabled={values.region_to.length === 0}
                      /> : null
                  }



                  <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {
                      !defaultHiddenFields.work_period_to ?
                        <View style={(defaultHiddenFields.work_period_to || defaultHiddenFields.work_period_from) ? {width: '100%'} : {width: '48%'}}>
                          <DatePicker
                            onSelect={(value) => { setFieldValue('work_period_to', value) }}
                            label={I18n.t('translation.endOfWork', {locale: ln})}
                            value={values.work_period_to}
                          />
                        </View> : null
                    }
                    {
                      !defaultHiddenFields.work_period_from ?
                        <View style={(defaultHiddenFields.work_period_to || defaultHiddenFields.work_period_from) ? {width: '100%'} : {width: '48%'}}>
                          <DatePicker
                            onSelect={(value) => { setFieldValue('work_period_from', value) }}
                            label={I18n.t('translation.beginningOfWork', {locale: ln})}
                            value={values.work_period_from}
                          />
                        </View> : null
                    }
                  </View>

                  {
                    !defaultHiddenFields.post_phone && isUserPremium ?
                      <FormTextInput
                        invalid={errors.phone_number && touched.phone_number}
                        onChange={(value) => { setFieldValue('phone_number', value.replace(/\D/g, '')); }}
                        onBlur={() => setFieldTouched('phone_number')}
                        placeholder={I18n.t('translation.businessNumber', {locale: ln})}
                        value={values.phone_number}
                        required={true}
                        keyboardType={'phone-pad'}
                      /> : null
                  }

                  {
                    !defaultHiddenFields.interest ?
                      <SingleSelectDropdown
                        items={[].concat(interests)}
                        onSelect={(selectedItem) => {
                          setFieldValue('interest', selectedItem)
                        }}
                        selectedItem={values.interest}
                        displayedProperty={'title'}
                        valueProperty={'id'}
                        label={I18n.t('translation.selectInterest', {locale: ln})}
                        locale={ln}
                      /> : null
                  }

                </ScrollView>
                <FormButton
                  style={filters && {backgroundColor: Colors.lightBlue}}
                  backgroundColor={'#428cdd'}
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
  isUserPremium: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  interests: PropTypes.array,
  attributes: PropTypes.object,
  ln: PropTypes.any,
};

export default FindJobForm
