import React from 'react'
import { View, TouchableWithoutFeedback, Image, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'
import uniq from 'lodash/uniq'

import ModalWrapper from '../../Components/ModalWrapper'
import Row from '../../Components/Row'
import { Colors, Images } from '../../Themes'
import I18n from '../../I18n'

import styles from './styles'
import FormSelectDropdown from '../../Components/FormSelectDropdown/FormSelectDropdown'
import DropdownList from '../../Components/FormSelectDropdown/DropdownList'
import FindJobForm from '../../Components/JobForm/FindJobForm'

class FilterModal extends React.Component {
  render () {
    const {interests, regions, regionsObj, filters, cities, onSubmit, onReset, ln} = this.props;
    return (
      <ModalWrapper
        onClose={this.props.onModalClose}
        visible={this.props.modalVisible}
        contentStyles={styles.modalContent}
        contentWrapperStyles={styles.modalContentWrapper}
      >
        <Row justifyContent='space-between'>
          <TouchableWithoutFeedback onPress={this.props.onModalClose}>
            <View style={{justifyContent: 'center'}}>
              <Row justifyContent='space-around' width={150}>
                <Icon name='ios-arrow-back' size={40} color={Colors.white} />
                <Image source={Images.filterIcon} style={{width: 25}} resizeMode={'contain'} />
                <Text style={styles.modalHeaderText}>{I18n.t('translation.filterAd', {locale: ln})}</Text>
              </Row>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onReset}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={[styles.modalHeaderText, {textDecorationLine: 'underline'}]}
              >{I18n.t('translation.resetFilters', {locale: ln})}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Row>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}>
          <FindJobForm onSubmit={onSubmit} onReset={onReset} cities={cities} filters={filters} interests={interests} regions={regions} regionsObj={regionsObj} ln={ln} />
        </ScrollView>
      </ModalWrapper>
    )
  }
}

FilterModal.propTypes = {
  modalVisible: PropTypes.bool,
  onModalClose: PropTypes.func,
  interests: PropTypes.array,
  ln: PropTypes.any
}

export default FilterModal
