import React from 'react';
import PropsTypes from 'prop-types';
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image, I18nManager, Dimensions } from 'react-native'

import CategoriesListItem from '../CategoriesList/CategoriesListItem';
import FormButton from '../FormButton/FormButton'
import AppConfig from '../../Config/AppConfig'
import styles from './styles'
import I18n from '../../I18n'
import { Images, Colors } from '../../Themes'

import Badge from '../../Components/Badge';

import ModalWrapper from '../../Components/ModalWrapper'

const {width, height} = Dimensions.get('window')

class DeleteCategoryConfirmModal extends React.Component {

  render() {
    const { category, onClose, onConfirm, modalVisible, ln } = this.props;
    return (
      <ModalWrapper
        onClose={onClose}
        visible={modalVisible}
        contentWrapperStyles={styles.modalWrapper}
      >
        <View
          style={styles.categoryModalWrapper}
        >

          <View
            style={styles.categoryModal}
          >
            <View
              style={styles.categoryWrapper}
            >
              <CategoriesListItem
                item={category}
                parentWidth={width * 1.5}
                onSelectCategory={() => null}
                buttonActive={true}
              />
            </View>

            <Text
              style={styles.modalDescription}
            >
              {I18n.t('translation.youDontHaveAccessToThisCategory', {locale: ln})}
            </Text>

            <View
              style={styles.buttonsWrapper}
            >
              <FormButton
                style={[styles.button]}
                backgroundColor={Colors.red}
                // disabled={!filters && (Object.keys(errors).length > 0 || !this.state.regionFrom)}
                onPress={() => {onConfirm(category)}}
              >{I18n.t('translation.yesButton', {locale: ln})}</FormButton>
              <FormButton
                style={[styles.button]}
                backgroundColor={Colors.darkBlue}
                // disabled={!filters && (Object.keys(errors).length > 0 || !this.state.regionFrom)}
                onPress={onClose}
              >{I18n.t('translation.noButton', {locale: ln})}</FormButton>
            </View>

          </View>

          <Badge
            onPress={onClose}
            backgroundColor={'#fff'}
            size={26}
            top={-13}
            right={0}
          >
            <Text style={{fontSize: 26, fontWeight: '700'}}>&times;</Text>
          </Badge>
        </View>
      </ModalWrapper>
    )
  }
}

DeleteCategoryConfirmModal.propTypes = {
  modalVisible: PropsTypes.bool,
  ln: PropsTypes.any,
  category: PropsTypes.any,
  onClose: PropsTypes.func,
  onConfirm: PropsTypes.func
};

export default DeleteCategoryConfirmModal;
