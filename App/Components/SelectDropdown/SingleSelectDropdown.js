import React from 'react';
import PropsTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import findIndex from 'lodash/findIndex';
import I18n from '../../I18n'

import WhiteBlock from '../WhiteBlock'
import DropdownSingleSelect from './DropdownSingleselect'

import { Colors, Fonts, Images } from '../../Themes'


import styles from './styles'

class SingleSelectDropdown extends React.Component {
  static defaultProps = {
    selectedItem: null
  };

  state = {
    listOpened: false,
    selectedItem: null
  };

  listOpen = () => {
    this.setState({listOpened: true});
  };

  listClose = () => {
    this.setState({listOpened: false});
  };

  confirm = (selectedItem) => {
    const { valueProperty } = this.props;
    this.listClose();
    if (!!selectedItem && (!!selectedItem[valueProperty] || selectedItem[valueProperty] === 0)) {
      this.props.onSelect(selectedItem[valueProperty]);
    } else {
      this.props.onSelect('');
    }
  };

  //
  _getItemByValue = (value, items, valueProperty) => {
    if (!!value || value === 0) {
      const index = findIndex(items, (item) => {
        return item[valueProperty] === value;
      });
      return index >= 0 ? items[index] : {};
    } else {
      return {};
    }
  };

  render() {
    const { invalid, items, selectedItem, displayedProperty, valueProperty, label, locale, disabled, required, makeTouched } = this.props;
    return (
      <WhiteBlock
        style={[styles.selectWrapper, (!!selectedItem && !invalid) ? styles.withValueWrapper : disabled ? styles.disabledSelectWrapper : styles.enabledSelectWrapper, invalid ? styles.invalidWrapper : null]}
      >
        <TouchableOpacity
          activeOpacity={disabled ? 1 : .2}
          onPress={!disabled ? () => { this.listOpen(); !!makeTouched ? makeTouched() : null; } : null}
          style={styles.selectButton}
        >
          {
            !selectedItem ?
              <Image
                style={styles.dropdownArrow}
                resizeMode={'contain'}
                source={Images.arrowDropdown}
              /> : null
          }
          <View
            style={[styles.selectInner]}
          >

            <View
              style={[styles.selectTextWrapper, {minWidth: '50%'}]}>
              {
                !!selectedItem ?
                  <Text
                    style={[styles.valueText, {textAlign: 'left'}]}
                    numberOfLines={1}>
                    { this._getItemByValue(selectedItem, items, valueProperty)[displayedProperty] }
                  </Text> : null
              }
              {
                !!selectedItem ?
                  <Image
                    style={styles.valueSuccessCheckmark}
                    resizeMode={'contain'}
                    source={Images.successCheckIcon}
                  /> : null
              }
            </View>

            <View
              style={[{flex: 0, flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'flex-end'}]}
            >
              {
                required &&
                <Text style={[styles.requiredSymbol, {alignSelf: 'center', alignItems: 'center'}]}>*</Text>
              }
              <Text
                numberOfLines={1}
                style={[styles.labelText, !!selectedItem ? {color: '#bbb'} : {color: '#303030'}]}>
                {label}
              </Text>
            </View>
          </View>

        </TouchableOpacity>

        {
          this.state.listOpened ?
            <DropdownSingleSelect
              onDismiss={this.listClose}
              onConfirm={this.confirm}
              selectedItem={selectedItem}
              visible={this.state.listOpened}
              items={items}
              displayedProperty={displayedProperty}
              valueProperty={valueProperty}
              label={label}
              locale={locale}
              required={required}
            /> : null
        }
      </WhiteBlock>
    );
  }
}

SingleSelectDropdown.propTypes = {
  onSelect: PropsTypes.func.isRequired,
  selectedItem: PropsTypes.any,
  items: PropsTypes.any,
  locale: PropsTypes.string,
  displayedProperty: PropsTypes.string.isRequired,
  valueProperty: PropsTypes.string.isRequired,
  label: PropsTypes.string.isRequired,
  disabled: PropsTypes.bool,
  required: PropsTypes.bool,
  makeTouched: PropsTypes.func,
  invalid: PropsTypes.bool
};

export default SingleSelectDropdown;
