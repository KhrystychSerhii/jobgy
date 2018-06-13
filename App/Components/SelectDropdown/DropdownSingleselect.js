import React from 'react';
import PropsTypes from 'prop-types';
import { View, ScrollView, FlatList, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import ModalWrapper from '../ModalWrapper'
import InputField from '../InputField';
import WhiteBlock from '../WhiteBlock';

import { Images, Colors } from '../../Themes';

import styles from './styles'

class DropdownSingleSelect extends React.Component {

  state = {
    items: [],
    searchBy: ''
  };

  componentDidMount() {
    const { items, displayedProperty, valueProperty, selectedItem } = this.props;

    // todo: узнать почему не обновляется объект?
    this.setState({items: items.map(item => {
      return Object.assign({
        [valueProperty]: item[valueProperty],
        [displayedProperty]: item[displayedProperty],
        selected: selectedItem === item[valueProperty]
      });
    })});
  }

  onItemSelect = (item, i) => {
    const { onConfirm, valueProperty, selectedItem } = this.props;
    if (selectedItem === item[valueProperty]) {
      onConfirm(null);
    } else {
      onConfirm(item);
    }

  };

  onSearchInputChange = (searchBy) => {
    this.setState({searchBy});
  };

  keyExtractor = (item, index) => index;

  render() {
    const { onDismiss, visible, label, locale, displayedProperty, valueProperty, required } = this.props;
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
              {
                required &&
                <Text style={styles.requiredSymbol}>*</Text>
              }
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
        </View>
      </ModalWrapper>
    );
  }
}

DropdownSingleSelect.propTypes = {
  onDismiss: PropsTypes.func.isRequired,
  onConfirm: PropsTypes.func.isRequired,
  selectedItem: PropsTypes.any,
  visible: PropsTypes.bool.isRequired,
  items: PropsTypes.array.isRequired,
  displayedProperty: PropsTypes.string.isRequired,
  valueProperty: PropsTypes.string.isRequired,
  label: PropsTypes.string.isRequired,
  locale: PropsTypes.string,
  required: PropsTypes.bool
};
export default DropdownSingleSelect;
