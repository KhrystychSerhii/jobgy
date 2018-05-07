import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import { View, Text, TextInput, TouchableOpacity, FlatList, I18nManager } from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import FormButton from '../FormButton'
import Row from '../Row'
import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import isArray from 'lodash/isArray'
import findIndex from 'lodash/findIndex';

import CheckMark from '../CheckMark';

const DropdownItem = ({text, value, checked, isLast, onSelect}) => (
  <View style={[styles.dropdownItem, isLast && {borderBottomWidth: 0}]}>
    <TouchableOpacity style={{flex: 1, width: '100%', justifyContent: 'center', flexDirection: 'row', flexWrap: 'nowrap'}} onPress={() => onSelect(value)}>
      <Row justifyContent={'center'}>
        <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode={'tail'}>{text}{'\u00A0'}</Text>
        {checked && <CheckMark color={'#4bb748'} />}
      </Row>
    </TouchableOpacity>
  </View>
)

const DropdownButtons = ({selectedItems, onConfirm, onCheckAll, onClear, ln}) => (
  <Row styles={[styles.dropdownButtonsWrapper, {justifyContent: 'space-between', alignItems: 'center'}]}>
    <View style={styles.footerElement}>
      {/*<LinearGradient colors={Colors.gradient}>*/}
        <FormButton style={{backgroundColor: Colors.lightBlue}} onPress={() => onConfirm(selectedItems)}>
          {I18n.t('translation.confirmBtn', {locale: ln})}
        </FormButton>
      {/*</LinearGradient>*/}
    </View>
    <TouchableOpacity style={styles.footerElement} onPress={onCheckAll}>
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text style={styles.dropdownBtnLink}>
          {I18n.t('translation.selectAllBtn', {locale: ln})}
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity style={styles.footerElement} onPress={onClear}>
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text style={styles.dropdownBtnLink}>
          {I18n.t('translation.deselectAllBtn', {locale: ln})}
        </Text>
      </View>
    </TouchableOpacity>
  </Row>
)

class Dropdown extends Component {
  state = {
    searchBy: '',
    selectedItems: this.selectedItemParse(this.props.selectedItems)
  };

  keyExtractor = (item, index) => index
  handleCheck = (value) => {

    let selectedItems = this.state.selectedItems;
    console.log('value ==> ', value);
    console.log('selectedItems ==> ', selectedItems);

    if (selectedItems[value]) {
      delete selectedItems[value];
    } else {
      selectedItems[value] = value;
    }

    this.setState({selectedItems}, () => {
      if (!this.props.multiple) {
        this.props.onChange(Object.values(this.state.selectedItems)[0]);
      }
    });


    console.log('this.state.selectedItems', this.state.selectedItems);
    // let selectedItems;
    // if (this.props.multiple) {
    //   selectedItems = this.state.selectedItems && isArray(this.state.selectedItems) ? [...this.state.selectedItems, value] : [value]
    // } else {
    //   selectedItems = {[value]: value};
    // }
  }
  handleCheckAll = () => {
    let selectedItems = this.props.values.map(item => this.props.valueField ? item[this.props.valueField] : item);
    this.setState({selectedItems});
  }

  handleClear = () => {
    this.setState({selectedItems: []}, () => {
      this.props.onChange(this.state.selectedItems)
    });
  }

  changeSearchInputText = (searchBy) => {
    this.setState({searchBy});
  }

  ////
  selectedItemParse(selectedItems) {
    if (!selectedItems || (isArray(selectedItems) && selectedItems.length === 0)) return {};

    if (isArray(selectedItems)) {
      console.log('selected item array', selectedItems);
      return selectedItems.reduce((result, item) => {
        result[item] = item;
        return result;
      }, {});
    } else {
      return {[selectedItems]: selectedItems};
    }
  }

  render () {
    const {header, values, valueField, textField, offsetX, onChange, multiple, onConfirm, width, onClose, ln} = this.props
    console.log('this.state.selectedItems ==> ', this.state.selectedItems);
    return (
      <Modal
        onBackdropPress={onClose}
        isVisible
        backdropTransitionInTiming={1}
        backdropTransitionOutTiming={1}
        animationInTiming={1}
        animationOutTiming={1}
        style={[{width: width}, styles.modal]}
        backdropOpacity={0.3}
      >
        <View style={styles.wrapper}>
          <View
            style={styles.headerWrapper}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{header}</Text>
            </View>
            <TextInput
              placeholder={'Type Search Here'}
              underlineColorAndroid='transparent'
              onChangeText={this.changeSearchInputText}
              style={styles.headerInput}
              value={this.state.searchBy}
            />
          </View>
          <View
            style={styles.contentWrapper}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.searchBy && textField ? values.filter(item => (item[textField] && item[textField].toLowerCase()) ? (item[textField].toLowerCase().indexOf(this.state.searchBy) === 0) : false) : values}
              renderItem={
                ({item, index}) => {
                  const text = textField ? item[textField] : item
                  const value = valueField ? item[valueField] : item
                  return (<DropdownItem
                    // checked={isArray(this.state.selectedItems) ? findIndex(this.state.selectedItems, (el) => el === value) > -1 : value === this.state.selectedItems}
                    checked={this.state.selectedItems && this.state.selectedItems[value]}
                    onSelect={this.handleCheck.bind(this)}
                    text={text}
                    isLast={(values.length - 1) === index}
                    value={value}
                  />)
                }
              }
            />
          </View>
          {multiple &&
          <View
            style={styles.footerWrapper}>
               <DropdownButtons selectedItems={Object.values(this.state.selectedItems)} onConfirm={onConfirm} onCheckAll={this.handleCheckAll} onClear={this.handleClear} ln={ln} />
          </View>}
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
  searchProperty: PropTypes.string,
  ln: PropTypes.any
}

export default Dropdown
