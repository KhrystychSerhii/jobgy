import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, View } from 'react-native'
import isArray from 'lodash/isArray'

import FormBaseItem from '../FormBaseItem'
import Row from '../Row'
import Dropdown from '../Dropdown/Dropdown'

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
    console.log('value')
    console.log(value)
    this.props.onChange(this.props.name, value)
    if (!this.props.multiple) {
      this.onClose()
    }
  }

  handleConfirm = () => {
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
    const {label, labelProps, invalid, values, multiple, selectedItems, whiteBlockStyles, selectedText, valueField, textField} = this.props
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
      _whiteBlockStyles = {..._whiteBlockStyles, backgroundColor: 'rgba(255, 255, 255, 0.8)'}
    }
    return (
      <View
        ref={e => this.view = e}
        style={[{position: 'relative', flex: 1, marginBottom: 10}]}
        onLayout={event => {
          this.getMeasurements()
        }}
      >
        <FormBaseItem
          whiteBlockStyles={_whiteBlockStyles} label={label} labelProps={labelProps} onFocus={this.handleFocus}
        >
          <Row>
            {!!selectedText && <Text>{selectedText}</Text>}
            {isValid && <Icon size={30} color={'#4bb748'} name='md-checkmark' />}
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
}

export default FormSelectDropdown
