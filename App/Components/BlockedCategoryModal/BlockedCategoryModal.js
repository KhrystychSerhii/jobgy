import React from 'react';
import PropsTypes from 'prop-types';
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image, I18nManager, Dimensions } from 'react-native'

import CategoriesListItem from '../CategoriesList/CategoriesListItem';
import FormButton from '../FormButton/FormButton'
import AppConfig from '../../Config/AppConfig'
import styles from './styles'
import I18n from '../../I18n'
import Images from '../../Themes/Images'

import Badge from '../../Components/Badge';

import ModalWrapper from '../../Components/ModalWrapper'

const {width, height} = Dimensions.get('window')

class BlockedCategoryModal extends React.Component {

  render() {
    const { category, onClose, modalVisible, ln } = this.props;
    console.log('category ==> ', category);
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
              style={styles.buyAccessButtonWrapper}
            >
              <FormButton
                style={styles.buyAccessButton}
                // disabled={!filters && (Object.keys(errors).length > 0 || !this.state.regionFrom)}
                onPress={() => {console.log('clicked!')}}
              >{I18n.t('translation.buyAccess', {locale: ln})}</FormButton>
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

BlockedCategoryModal.propTypes = {
  modalVisible: PropsTypes.bool,
  ln: PropsTypes.any,
  category: PropsTypes.any,
  onClose: PropsTypes.func,
};

export default BlockedCategoryModal;
