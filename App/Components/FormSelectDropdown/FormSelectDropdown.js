import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, View } from 'react-native'
import isArray from 'lodash/isArray'

import CheckMark from '../../Components/CheckMark';

import FormBaseItem from '../FormBaseItem'
import Row from '../Row'
import Dropdown from '../Dropdown/Dropdown'
import styles from './styles'
class FormSelectDropdown extends React.Component {
  state = {
    isOpen: false,
    width: null,
    offsetY: null,
    offsetX: null,
  }
  handleFocus = () => {
    this.setState({isOpen: true})
  }
  handleChange = (value) => {
    if (!this.props.multiple) {
      this.props.onChange(this.props.name, value)
      this.onClose()
    }
  }

  handleConfirm = (value) => {
    console.log('value', value);
    if (this.props.multiple) {
      this.props.onChange(this.props.name, value);
    }
    this.onClose()
  }
  onClose = () => {
    this.setState({isOpen: false})
  }
  getMeasurements = () => {
    this.view.measure(
      (fx, fy, width, height, px, py) => {
        this.setState({offsetY: py, offsetX: px, width})
      },
    )
  }

  render () {
    const {label, labelProps, invalid, values, multiple, selectedItems, whiteBlockStyles, selectedText, valueField, textField, disabled, ln} = this.props
    const isValid = !!selectedText;
    const {offsetY, width, offsetX} = this.state
    if (multiple && !isArray(selectedItems)) {
      throw new Error('selected should be array if multiple is true')
    }
    let _whiteBlockStyles = whiteBlockStyles
    if (invalid) {
      _whiteBlockStyles = {...whiteBlockStyles, borderWidth: 1, borderColor: '#f00'}
    }
    if (!isValid) {
      _whiteBlockStyles = {..._whiteBlockStyles, backgroundColor: '#CFD5E1'} // rgba(255, 255, 255, 0.8)
    }
    return (
      <View
        ref={(e) => { this.view = e }}
        style={[{position: 'relative', flex: 1, marginBottom: 10}, disabled ? {opacity: .5} : null]}
        onLayout={event => {
          this.getMeasurements()
        }}
      >
        <FormBaseItem
          whiteBlockStyles={_whiteBlockStyles} label={label} labelProps={labelProps} onFocus={this.handleFocus} disabled={disabled}
        >
          <Row width={'48%'} styles={{flex: 1, flexDirection: 'row-reverse', paddingRight: 15, paddingLeft: 5}} justifyContent={'flex-start'}>
            {!!selectedText && <Text style={[styles.value, {textAlign: 'left', paddingBottom: 4}]} numberOfLines={1} ellipsizeMode='tail'>{selectedText}</Text>}
            {!selectedText && <Icon size={30} color={'#303030'} name='ios-arrow-down' />}
            {isValid && <CheckMark color={'#4bb748'} />}
          </Row>
        </FormBaseItem>
        {this.state.isOpen && <Dropdown
          selectedItems={selectedItems}
          valueField={valueField}
          textField={textField}
          onClose={this.onClose}
          onConfirm={this.handleConfirm}
          offsetY={offsetY}
          offsetX={offsetX}
          header={label}
          values={values}
          onChange={this.handleChange}
          multiple={multiple}
          width={width}
          ln={ln}
        />}
      </View>
    )
  }
}

FormSelectDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  values: PropTypes.array,
  selectedItems: PropTypes.any,
  multiple: PropTypes.bool,
  isValid: PropTypes.bool,
  whiteBlockStyles: PropTypes.any,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  ln: PropTypes.any,
  disabled: PropTypes.bool,
}

export default FormSelectDropdown
