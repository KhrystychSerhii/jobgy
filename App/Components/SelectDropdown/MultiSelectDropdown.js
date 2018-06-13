import React from 'react';
import PropsTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import I18n from '../../I18n'

import WhiteBlock from '../WhiteBlock'
import DropdownMultiSelect from './DropdownMultiselect'

import { Colors, Fonts, Images } from '../../Themes'


import styles from './styles'

class MultiSelectDropdown extends React.Component {
  static defaultProps = {
    selectedItems: [],
    disabled: false
  };

  state = {
    listOpened: false,
  };

  listOpen = () => {
    this.setState({listOpened: true});
  };

  listClose = () => {
    this.setState({listOpened: false});
  };

  confirm = (selectedItems) => {
    this.listClose();
    this.props.onSelect(selectedItems);
  };

  //
  _arrayToObject = (array) => {

  }

  _onListOpened = () => {

  }

  render() {
    const { items, selectedItems, displayedProperty, valueProperty, label, locale, disabled } = this.props;

    return (
      <WhiteBlock
        style={[styles.selectWrapper, (selectedItems.length !== 0) ? styles.withValueWrapper : disabled ? styles.disabledSelectWrapper : styles.enabledSelectWrapper]}
      >
        <TouchableOpacity
          activeOpacity={disabled ? 1 : .2}
          onPress={!disabled ? this.listOpen : null}
          style={styles.selectButton}
        >
          {
            selectedItems.length === 0 ?
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
                selectedItems.length > 0 ?
                  <Text
                    style={[styles.valueText]}
                    numberOfLines={1}>
                    { I18n.t('translation.multiselectSelectedLabel', {locale: locale, count: selectedItems.length})}
                  </Text> : null
              }
              {
                selectedItems.length > 0 ?
                  <Image
                    style={styles.valueSuccessCheckmark}
                    resizeMode={'contain'}
                    source={Images.successCheckIcon}
                  /> : null
              }
            </View>

            <View
              style={styles.selectTextWrapper}
            >
              <Text
                numberOfLines={1}
                style={[styles.labelText, (selectedItems.length > 0) ? {color: '#bbb'} : {color: '#303030'}]}
              >{label}</Text>
            </View>
          </View>

        </TouchableOpacity>

        {
          this.state.listOpened ?
            <DropdownMultiSelect
              onDismiss={this.listClose}
              onConfirm={this.confirm}
              selectedItems={selectedItems}
              visible={this.state.listOpened}
              items={items}
              displayedProperty={displayedProperty}
              valueProperty={valueProperty}
              label={label}
              locale={locale}
            /> : null
        }
      </WhiteBlock>
    );
  }
}

MultiSelectDropdown.propTypes = {
  onSelect: PropsTypes.func.isRequired,
  selectedItems: PropsTypes.array.isRequired,
  locale: PropsTypes.string,
  displayedProperty: PropsTypes.string.isRequired,
  valueProperty: PropsTypes.string.isRequired,
  label: PropsTypes.string.isRequired,
  disabled: PropsTypes.bool
};

export default MultiSelectDropdown;
