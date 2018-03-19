import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, TouchableOpacity, FlatList, I18nManager } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import FormButton from '../FormButton'
import Row from '../Row'
import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import isArray from 'lodash/isArray'

const DropdownItem = ({text, value, checked, isLast, onSelect}) => (
  <View style={[styles.dropdownItem, isLast && {borderBottomWidth: 0}]}>
    <TouchableOpacity style={{flex: 1}} onPress={() => onSelect(value)}>
      <Row>
        <Text style={styles.dropdownText}>{text}</Text>
        {checked && <Icon size={30} color={'#4bb748'} name='md-checkmark' />}
      </Row>
    </TouchableOpacity>
  </View>
)

const DropdownButtons = ({onConfirm, onCheckAll, onClear}) => (
  <Row styles={styles.dropdownButtonsWrapper} justifyContent='space-around'>
    <LinearGradient colors={Colors.gradient}>
      <FormButton style={{backgroundColor: Colors.lightBlue}} onPress={onConfirm}>
        {I18n.t('FILTER_MODAL.CONFIRM')}
      </FormButton>
    </LinearGradient>
    <TouchableOpacity onPress={onCheckAll}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.dropdownBtnLink}>
          {I18n.t('FILTER_MODAL.CHECK_ALL')}
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onClear}>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.dropdownBtnLink}>
          {I18n.t('FILTER_MODAL.CLEAR_ALL')}
        </Text>
      </View>
    </TouchableOpacity>
  </Row>
)

class Dropdown extends Component {
  keyExtractor = (item, index) => index
  handleCheckAll = () => {
    this.props.onChange(this.props.values)
  }
  handleClear = () => {
    this.props.onChange([])
  }

  render () {
    const {header, values, valueField, textField, offsetX, onChange, multiple, onConfirm, width, onClose} = this.props

    return (
      <Modal
        onBackdropPress={onClose}
        isVisible
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
        animationInTiming={1}
        animationOutTiming={1}
        style={{width: width, zIndex: 100, [!I18nManager.isRTL ? 'right' : 'left']: offsetX, margin: 0}}
        backdropOpacity={0.3}
      >
        <View style={styles.wrapper}>
          <View style={styles.header}><Text style={styles.headerText}>{header}</Text></View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={values}
            renderItem={
              ({item, index}) => {
                const text = textField ? item[textField] : item
                const value = valueField ? item[valueField] : item
                return (<DropdownItem
                  checked={isArray(this.props.selectedItems) ? this.props.selectedItems.indexOf(value) !== -1 : value === this.props.selectedItems}
                  onSelect={onChange}
                  text={text}
                  isLast={(values.length - 1) === index}
                  value={value}
                />)
              }
            }
          />
          {multiple &&
          <DropdownButtons onConfirm={onConfirm} onCheckAll={this.handleCheckAll} onClear={this.handleClear} />}
        </View>
      </Modal>
    )
  }
}

Dropdown.propTypes = {
  header: PropTypes.any,
  values: PropTypes.array,
  selected: PropTypes.any,
  onChange: PropTypes.func,
  onConfirm: PropTypes.func,
  onCheckAll: PropTypes.func,
  onClear: PropTypes.func,
  multiple: PropTypes.bool,

}

export default Dropdown
