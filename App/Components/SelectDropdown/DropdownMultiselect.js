import React from 'react';
import PropsTypes from 'prop-types';
import { View, ScrollView, FlatList, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import I18n from '../../I18n'


import ModalWrapper from '../ModalWrapper';
import WhiteBlock from '../WhiteBlock';
import InputField from '../InputField';

import { Images, Colors, Fonts } from '../../Themes';

import styles from './styles'

class DropdownMultiSelect extends React.Component {

  state = {
    items: [],
    searchBy: ''
  };

  componentDidMount() {
    const { items, displayedProperty, valueProperty } = this.props;
    const selectedItemsObj = this.props.selectedItems.reduce((result, item, index, array) => {
      result[item] = item;
      return result;
    }, {});
    // todo: узнать почему не обновляется объект?
    this.setState({items: items.map(item => {
      return Object.assign({
        [valueProperty]: item[valueProperty],
        [displayedProperty]: item[displayedProperty],
        selected: !!selectedItemsObj[item[valueProperty]]
      });
    })});
  }

  onItemSelect = (item, i) => {
    let { items } = this.state;
    items[i].selected = !items[i].selected;
    this.setState({items});
  };

  selectAll = () => {
    let { items } = this.state;
    items.forEach(item => {
      item.selected = true;
    });
    this.setState({items});
  };

  deselectAll = () => {
    let { items } = this.state;
    items.forEach(item => {
      item.selected = false;
    });
    this.setState({items});
  };

  confirmSelected = (valueProperty) => {
    const { items } = this.state;
    const selectedItems = items.filter(item => item.selected).map(item => item[valueProperty]);
    this.props.onConfirm(selectedItems);
  };

  onSearchInputChange = (searchBy) => {
    this.setState({searchBy});
  };

  keyExtractor = (item, index) => index;

  render() {
    const { onDismiss, visible, label, locale, displayedProperty, valueProperty } = this.props;
    const itemsSelected = this.state.items.filter(item => item.selected).length > 0;

    return (
      <ModalWrapper
        onClose={onDismiss}
        visible={visible}
        contentWrapperStyles={styles.modalWrapper}
      >
        <View style={{flex: 1, backgroundColor: 'white', borderRadius: 8,}}>
          <View
            style={styles.headerWrapper}
          >
            <Text
              style={[styles.headerText, itemsSelected ? styles.selectedHeaderText : styles.unselectedHeaderText]}
            >
              {label}
            </Text>
          </View>

          <View
            style={[styles.searchInputWrapper]}>
            <InputField
              onChangeText={this.onSearchInputChange}
              value={this.state.searchBy}
              backgroundColor={'#f5f5f5'}
              borderColor={'#d9d9d9'}
              color={Colors.black}
            />
          </View>
          <ScrollView
            style={styles.itemsWrapper}
          >
            <FlatList
              style={styles.listWrapper}
              keyExtractor={this.keyExtractor}
              data={this.state.items.filter(item => {
                if (!item[displayedProperty]) return false;
                if (!this.state.searchBy) return true;

                const searchBy = ('' + this.state.searchBy).toLowerCase();
                const searchIn = ('' + item[displayedProperty]).toLowerCase();
                return searchIn.indexOf(searchBy) >= 0;
              })}
              extraData={this.state}
              renderItem={({item, index}) =>
                <TouchableOpacity style={styles.itemWrapper} onPress={() => { this.onItemSelect(item, index) }}>
                  <Text style={styles.itemText}>{item[displayedProperty]}</Text>
                  {
                    item.selected ?
                      <Image
                        style={styles.selectedCheckmark}
                        resizeMode={'contain'}
                        source={Images.successCheckIcon}
                      /> : null
                  }
                </TouchableOpacity>
              }
            />
          </ScrollView>

          <View
            style={styles.buttonsWrapper}
          >
            <TouchableOpacity
              onPress={() => { this.confirmSelected(valueProperty) }}
              style={[styles.buttonWrapper, styles.button]}
            >
              <Text style={styles.buttonText}>
                {I18n.t('translation.confirmBtn', {locale})}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.selectAll}
              style={[styles.buttonWrapper, styles.linkButton]}
            >
              <Text style={styles.linkButtonText}>
                {I18n.t('translation.selectAllBtn', {locale})}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.deselectAll}
              style={[styles.buttonWrapper, styles.linkButton]}
            >
              <Text style={styles.linkButtonText}>
                {I18n.t('translation.deselectAllBtn', {locale})}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalWrapper>
    );
  }
}

DropdownMultiSelect.propTypes = {
  onDismiss: PropsTypes.func.isRequired,
  onConfirm: PropsTypes.func.isRequired,
  selectedItems: PropsTypes.array.isRequired,
  visible: PropsTypes.bool.isRequired,
  items: PropsTypes.array.isRequired,
  displayedProperty: PropsTypes.string.isRequired,
  valueProperty: PropsTypes.string.isRequired,
  label: PropsTypes.string.isRequired,
  locale: PropsTypes.string
};
export default DropdownMultiSelect;
