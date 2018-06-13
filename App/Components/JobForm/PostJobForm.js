import React from 'react'

import { TouchableOpacity, Image, Text } from 'react-native';
import { Images, Fonts } from '../../Themes'


import PropTypes from 'prop-types'
import { Formik, FormikActions } from 'formik'
import Yup from 'yup'
import { View, ScrollView, I18nManager } from 'react-native'

import I18n from '../../I18n'
import { Colors } from '../../Themes'
import FormSelectDropdown from '../FormSelectDropdown'
import FormInput from '../FormInput'
import Row from '../Row'
import FormButton from '../FormButton/FormButton'
import FormDatePicker from '../FormInput/FormDatePicker'

import { FormTextArea, FormTextInput, FormImagePicker } from '../FormTextInput';
import {SingleSelectDropdown} from '../SelectDropdown';
import DatePicker from '../DatePicker';

import { toggleItemInArray } from '../../Transforms/index'
import {sortBy, isArray, findIndex, get, isEmpty} from 'lodash'

const OptionalAttributesFields = ({attribute, values, errors, touched, ln, setFieldValue, setFieldTouched}) => {
  switch (attribute.attribute_type_id) {
    case 1:
      return (
        <SingleSelectDropdown
          invalid={!!errors[`${attribute.id}&#91;id&#93;`] && touched[`${attribute.id}&#91;id&#93;`]}
          items={[].concat(attribute.entries)}
          onSelect={(selectedItem) => {
            const index = findIndex(attribute.entries, (item) => {
              return item.id === selectedItem;
            });

            if (index >= 0) {
              setFieldValue(`${attribute.id}&#91;id&#93;`, attribute.entries[index].id);
              setFieldValue(`${attribute.id}&#91;title&#93;`, attribute.entries[index].title);
              setFieldValue(`${attribute.id}&#91;text&#93;`, attribute.entries[index].text);
            }
          }}
          makeTouched={() => {
            setFieldTouched(`${attribute.id}&#91;id&#93;`)
          }}
          selectedItem={values[`${attribute.id}&#91;id&#93;`]}
          displayedProperty={'title'}
          valueProperty={'id'}
          label={attribute.title}
          locale={ln}
          required={attribute.required}
        />
      );
      break;

    case 2:
      return (
        <FormImagePicker
          onChange={(file) => { setFieldValue('' + attribute.id, file) }}
          makeTouched={() => {
            setFieldTouched(`${attribute.id}`)
          }}
          placeholder={attribute.title}
          ln={ln}
          required={attribute.required}
        />
      );
      break;

    case 3:
      return (
        <DatePicker
          invalid={!!errors[`${attribute.id}`] && touched[`${attribute.id}`]}
          onSelect={(value) => { setFieldValue('' + attribute.id, value) }}
          makeTouched={() => {
            setFieldTouched(`${attribute.id}`)
          }}
          label={attribute.title}
          value={values[attribute.id]}
          required={attribute.required}
        />
      );
      break;

    case 4:
      return (
        <FormTextArea
          invalid={!!errors[`${attribute.id}`] && touched[`${attribute.id}`]}
          onChange={(value) => { setFieldValue('' + attribute.id, value) }}
          onBlur={() => {
            setFieldTouched(`${attribute.id}`)
          }}
          value={values[attribute.id]}
          placeholder={attribute.title}
          required={attribute.required}
        />
      );
      break;

    case 5:
      return (
        <FormTextArea
          invalid={!!errors[`${attribute.id}`] && touched[`${attribute.id}`]}
          onChange={(value) => { setFieldValue('' + attribute.id, value.replace(/\D/g, '') )}}
          onBlur={() => {
            setFieldTouched(`${attribute.id}`)
          }}
          value={values[attribute.id]}
          placeholder={attribute.title}
          keyboardType={'numeric'}
          required={attribute.required}
        />
      );
      break;

    case 6:
      return (
        <View
          style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}
        >
          <View
            style={{width: '49.5%'}}
          >
            <FormTextArea
              invalid={!!errors[`${attribute.id}&#91;amount&#93;`] && touched[`${attribute.id}&#91;amount&#93;`]}
              disabled={!values[`${attribute.id}&#91;id&#93;`]}
              onChange={(value) => { setFieldValue(`${attribute.id}&#91;amount&#93;`, value) }}
              onBlur={() => {
                setFieldTouched(`${attribute.id}&#91;amount&#93;`)
              }}
              value={values[`${attribute.id}&#91;amount&#93;`]}
              keyboardType={'numeric'}
              placeholder={I18n.t('translation.amount', {locale: ln})}
              required={attribute.required}
            />
          </View>
          <View
            style={{width: '49.5%'}}
          >
            <SingleSelectDropdown
              invalid={!!errors[`${attribute.id}&#91;id&#93;`] && touched[`${attribute.id}&#91;id&#93;`]}
              items={[].concat(attribute.entries)}
              onSelect={(selectedItem) => {
                setFieldValue(`${attribute.id}&#91;id&#93;`, selectedItem)
              }}
              makeTouched={() => {
                setFieldTouched(`${attribute.id}&#91;id&#93;`)
              }}
              selectedItem={values[`${attribute.id}&#91;id&#93;`]}
              displayedProperty={'title'}
              valueProperty={'id'}
              label={attribute.title}
              locale={ln}
              required={attribute.required}
            />
          </View>
        </View>
      );
      break;

    default:
      console.log('incorrect attribute_type_id value', attribute.attribute_type_id);
      return null;
      break;
  }
};

// let validationObject = {
//   interest: Yup.number().required(),
//   work_period_from: Yup.string().trim().required(), //.required('Required!'),
//   work_period_to: Yup.string().trim().required(), //.required('Required!'),
//   address_from: Yup.string().trim(), //.required('Required'),
// };


class PostJobForm extends React.Component {
  static defaultProps = {
    attributes: {
      attributes: [],
      visibilities: []
    }
  };

  state = {
    regionFrom: '',
    regionTo: '',
    ///
  };

  _getAdditionalFormData = (obj, isUserPremium) => {
    const attributes = get(obj, 'attributes');
    const visibilities = get(obj, 'visibilities');

    let validationObject = {
      interest: Yup.number().required(),
      region_from: Yup.number().required(),
      location_from: Yup.number().required(),
      region_to: Yup.number().required(),
      location_to: Yup.number().required(),
      work_period_from: Yup.string().trim().required(), //.required('Required!'),
      work_period_to: Yup.string().trim().required(), //.required('Required!'),
      addr_from: Yup.string().trim(), //.required('Required'),
      addr_to: Yup.string().trim(), //.required('Required'),
      notes: Yup.string().nullable(),
    };

    let initialValues = {
      // location from
      region_from: '',
      location_from: '',
      // address_from
      addr_from: '',

      // location to
      region_to: '',
      location_to: '',
      // address_to
      addr_to: '',

      // work_period_from
      work_period_from: '',
      // work_period_to
      work_period_to: '',

      // interest
      interest: '',

      // post_phone
      phone_number: '',
      // notes
      notes: ''
    };

    if (isUserPremium) {
      validationObject.phone_number = Yup.string()
        .trim()
        .required('Required')
        .matches(/^(0(([23489]{1}[0-9]{7})|(5[012345689]{1}[0-9]{7})|'.'(79[23579]{1}[0-9]{6})|(718[0-9]{6})|(72[23]{1}[0-9]{6})|'.'(73[237]{1}[0-9]{6})|(747[0-9]{6})|(76[58]{1}[0-9]{6})|'.'(782[0-9]{6})|(77[0-9]{7})))$/, 'Incorrect number')
      initialValues.phone_number = '';
    }

    attributes
      .map(item => {
        switch (item.attribute_type_id) {
          case 1:
            initialValues[`${item.id}&#91;id&#93;`] = '';
            initialValues[`${item.id}&#91;title&#93;`] = '';
            initialValues[`${item.id}&#91;text&#93;`] = '';

            if (item.required) {
              validationObject[`${item.id}&#91;id&#93;`] = Yup.string().required();
            } else {
              validationObject[`${item.id}&#91;id&#93;`] = Yup.string();
            }
            break;

          case 2:
          case 3:
          case 4:
          case 5:
            initialValues[item.id] = '';

            if (item.required) {
              validationObject[item.id] = Yup.string().required();
            } else {
              validationObject[item.id] = Yup.string();
            }
            break;

          case 6:
            initialValues[`${item.id}&#91;id&#93;`] = '';
            initialValues[`${item.id}&#91;amount&#93;`] = '';

            if (item.required) {
              validationObject[`${item.id}&#91;id&#93;`] = Yup.string().required();
              validationObject[`${item.id}&#91;amount&#93;`] = Yup.number().required();
            } else {
              validationObject[`${item.id}&#91;id&#93;`] = Yup.string();
              validationObject[`${item.id}&#91;amount&#93;`] = Yup.number();
            }
            break;

          default:
            break;
        }
        return item;
      });

    let defaultHiddenFields = visibilities
      .map(item => {
        return {
          [item['name']]: item.visible
        }
      }).filter(item => {
        let key = Object.keys(item)[0];
        return item[key] === 0;
      }).reduce((result, item, index, array) => {
        let key = Object.keys(item)[0];
        result[key] = true;
        switch (key) {
          case 'location_from':
            delete validationObject.region_from;
            delete initialValues.location_from;
            break;
          case 'location_to':
            delete validationObject.region_to;
            delete initialValues.location_to;
            break;
          case 'address_from':
            delete validationObject.addr_from;
            delete initialValues.addr_from;
            break;
          case 'address_to':
            delete validationObject.addr_to;
            delete initialValues.addr_to;
            break;
          case 'post_phone':
            delete validationObject.phone_number;
            delete initialValues.phone_number;
            break;
          case 'notes':
            delete validationObject.notes;
            delete initialValues.notes;
            break;
          case 'interest':
            delete validationObject.interest;
            delete initialValues.interest;
            break;
          case 'work_period_from':
            delete validationObject.work_period_from;
            delete initialValues.work_period_from;
            break;
          case 'work_period_to':
            delete validationObject.work_period_to;
            delete initialValues.work_period_to;
            break;
        }

        return result;
      }, {});

    return {
      validationSchema: Yup.object().shape(validationObject),
      initialValues: initialValues,
      defaultHiddenFields: defaultHiddenFields
    }
  };


  handleSelectRegion = (name, value) => {
    this.setState({[name]: value})
  };

  submitForm = (values) => {
    const formData = new FormData();
    for (let key in values) {
      console.log('key', key);
      const property = key.replace('&#91;', '[').replace('&#93;', ']');
      formData.append(property, values[key]);
    }

    this.props.onSubmit(formData);
  };

  getCitiesByRegionsId = (regions) => {
    if (!regions) {
      return []
    } else if (isArray(regions)) {
      let regionsObj = {};

      for (let i = 0, length = regions.length; i < length; i++ ) {
        regionsObj[regions[i]] = regions[i];
      }
      return Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => !!regionsObj[item.parent_id]);// Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => item.parent_id === regionId)
    } else {
      return Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => item.parent_id === regions);// Object.keys(this.props.cities).map(key => this.props.cities[key]).filter(item => item.parent_id === regionId)
    }
  };

  handleResetForm = () => {
    this.formik.handleReset();
    this.setState({
      regionFrom: '',
      regionTo: ''
    });
  };

  singleItemSelectedText = (array, value, by, name) => {
    if (array && isArray(array) && array.length > 0 && (value || value === 0) && name) {
      const item = array.filter(item => { return item[by] === value })[0];
      return item[name]
    } else {
      return ''
    }
  };

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
  };

  ////

  render () {
    const {isUserPremium, onSubmit, interests, filters, attributes, ln, regions, cities} = this.props;
    const citiesFrom = this.getCitiesByRegionsId(this.state.regionFrom);
    const citiesTo = this.getCitiesByRegionsId(this.state.regionTo);


    const {validationSchema, initialValues, defaultHiddenFields} = this._getAdditionalFormData(attributes);

    return <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values, {setSubmitting, setErrors}) => {
               console.log('onsubmit');
               // onSubmit(values)
               //   .catch((e) => {
               //     e.data.errors && setErrors(e.data.errors)
               //     setSubmitting(false)
               //   })
            }}
            validationSchema={validationSchema}
            render={
              ({
                 values,
                 errors,
                 touched,
                 handleSubmit,
                 isSubmitting,
                 setFieldValue,
                 setFieldTouched,
                 isValid,
               }) => {
                console.log('values', values);
                return (
                  <View style={{flex: 1}}>
                    <ScrollView>
                      {

                        sortBy(attributes.attributes, 'display_order')
                          .map((item, i) => (
                            <OptionalAttributesFields
                              key={i}
                              attribute={item}
                              values={values}
                              errors={errors}
                              touched={touched}
                              ln={ln}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                            />
                          ))
                      }
                      {
                        !defaultHiddenFields.location_from ?
                          <SingleSelectDropdown
                            invalid={errors.region_from && touched.region_from}
                            items={[].concat(regions)}
                            onSelect={(value) => { console.log('value => ', value); setFieldValue('region_from', value); setFieldValue('location_from', ''); }}
                            makeTouched={() => {
                              setFieldTouched('region_from')
                            }}
                            displayedProperty={'title'}
                            selectedItem={values.region_from}
                            valueProperty={'id'}
                            label={I18n.t('translation.selectRegionFrom', {locale: ln})}
                            locale={ln}
                            required={true}
                          /> : null
                      }
                      {
                        !defaultHiddenFields.location_from ?
                          <SingleSelectDropdown
                            invalid={errors.location_from && touched.location_from}
                            items={[].concat(this.getCitiesByRegionsId(values.region_from))}
                            onSelect={(value) => { setFieldValue('location_from', value); }}
                            makeTouched={() => {
                              setFieldTouched('location_from')
                            }}
                            displayedProperty={'title'}
                            selectedItem={values.location_from}
                            valueProperty={'id'}
                            label={I18n.t('translation.selectLocationFrom', {locale: ln})}
                            locale={ln}
                            disabled={!values.region_from}
                            required={true}
                          /> : null
                      }
                      {
                        !defaultHiddenFields.address_from ?
                          <FormTextArea
                            invalid={errors.addr_from && touched.addr_from}
                            onChange={(value) => { setFieldValue('addr_from', value) }}
                            onBlur={() => {
                              setFieldTouched('address_from')
                            }}
                            value={values.addr_from}
                            placeholder={I18n.t('translation.addressFrom', {locale: ln})}
                          /> : null
                      }
                      {
                        !defaultHiddenFields.location_to ?
                          <SingleSelectDropdown
                            invalid={errors.region_to && touched.region_to}
                            items={[].concat(regions)}
                            onSelect={(value) => { setFieldValue('region_to', value); setFieldValue('location_to', ''); }}
                            makeTouched={() => {
                              setFieldTouched('region_to')
                            }}
                            displayedProperty={'title'}
                            selectedItem={values.region_to}
                            valueProperty={'id'}
                            label={I18n.t('translation.selectRegionTo', {locale: ln})}
                            locale={ln}
                            required={true}
                          /> : null
                      }
                      {
                        !defaultHiddenFields.location_to ?
                          <SingleSelectDropdown
                            invalid={errors.location_to && touched.location_to}
                            items={[].concat(this.getCitiesByRegionsId(values.region_to))}
                            onSelect={(value) => { setFieldValue('location_to', value); }}
                            makeTouched={() => {
                              setFieldTouched('location_to')
                            }}
                            displayedProperty={'title'}
                            selectedItem={values.location_to}
                            valueProperty={'id'}
                            label={I18n.t('translation.selectLocationTo', {locale: ln})}
                            locale={ln}
                            disabled={!values.region_to}
                            required={true}
                          /> : null
                      }
                      {
                        !defaultHiddenFields.address_to ?
                          <FormTextArea
                            invalid={errors.addr_to && touched.addr_to}
                            onChange={(value) => { setFieldValue('addr_to', value) }}
                            onBlur={() => {
                              setFieldTouched('addr_to')
                            }}
                            value={values.addr_to}
                            placeholder={I18n.t('translation.addressTo', {locale: ln})}
                          /> : null
                      }
                      {/*//////*/}

                      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-between'}}>
                        {
                          !defaultHiddenFields.work_period_to ?
                            <View style={(defaultHiddenFields.work_period_to || defaultHiddenFields.work_period_from) ? {width: '100%'} : {width: '48%'}}>
                              <DatePicker
                                invalid={errors.work_period_to && touched.work_period_to}
                                onSelect={(value) => { setFieldValue('work_period_to', value) }}
                                makeTouched={() => {
                                  setFieldTouched('work_period_to')
                                }}
                                label={I18n.t('translation.endOfWork', {locale: ln})}
                                value={values.work_period_to}
                                required={true}
                              />
                            </View> : null
                        }
                        {
                          !defaultHiddenFields.work_period_from ?
                            <View style={(defaultHiddenFields.work_period_to || defaultHiddenFields.work_period_from) ? {width: '100%'} : {width: '48%'}}>
                              <DatePicker
                                invalid={errors.work_period_from && touched.work_period_from}
                                onSelect={(value) => { setFieldValue('work_period_from', value) }}
                                makeTouched={() => {
                                  setFieldTouched('work_period_from')
                                }}
                                label={I18n.t('translation.beginningOfWork', {locale: ln})}
                                value={values.work_period_from}
                                required={true}
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
                            invalid={errors.interest && touched.interest}
                            items={[].concat(interests)}
                            onSelect={(selectedItem) => {
                              setFieldValue('interest', selectedItem)
                            }}
                            makeTouched={() => {
                              setFieldTouched('interest')
                            }}
                            selectedItem={values.interest}
                            displayedProperty={'title'}
                            valueProperty={'id'}
                            label={I18n.t('translation.selectInterest', {locale: ln})}
                            locale={ln}
                            required={true}
                          /> : null
                      }

                      {
                        !defaultHiddenFields.notes ?
                          <FormTextArea
                            onChange={(value) => { setFieldValue('notes', value) }}
                            value={values.notes}
                            placeholder={I18n.t('translation.notes', {locale: ln})}
                          /> : null
                      }
                    </ScrollView>
                    <FormButton
                      style={{backgroundColor: Colors.lightBlue}}
                      disabled={!isValid}
                      onPress={() => {
                        // console.log('submitted!');
                         this.submitForm(values)
                      }}
                    >{I18n.t('translation.postAnAdd', { locale: ln })}</FormButton>
                  </View>
                )
              }
            }
          />
  }
}

PostJobForm.propTypes = {
  isUserPremium: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func,
  interests: PropTypes.array,
  ln: PropTypes.any,
  cities: PropTypes.any,
  regions: PropTypes.any,
  attributes: PropTypes.object,
};

export default PostJobForm
