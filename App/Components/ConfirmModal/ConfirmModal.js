import React from 'react';
import PropsTypes from 'prop-types';
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image, I18nManager, Dimensions } from 'react-native'

import FormButton from '../FormButton/FormButton'
import styles from './styles'
import I18n from '../../I18n'
import { Colors } from '../../Themes'

import Badge from '../../Components/Badge';

import ModalWrapper from '../../Components/ModalWrapper'

const {width, height} = Dimensions.get('window')

class ConfirmModal extends React.Component {

  render() {
    const { modalVisible, onConfirm, onDismiss, confirmText, dismissText, descriptionText } = this.props;

    return (
      <ModalWrapper
        onClose={onDismiss}
        visible={modalVisible}
        contentWrapperStyles={styles.modalWrapper}
      >
        <View
          style={styles.confirmModalWrapper}
        >

          <View
            style={styles.confirmModal}
          >
            <View style={styles.confirmDescriptionWrapper}>
              <Text style={styles.confirmDescriptionText}>
                {descriptionText}
              </Text>
            </View>

            <View style={styles.buttonsWrapper}>
              <FormButton
                style={[styles.button, styles.confirmButton]}
                backgroundColor={Colors.red}
                onPress={onConfirm}
              >{confirmText}</FormButton>
              <FormButton
                style={[styles.button, styles.dismissButton]}
                backgroundColor={Colors.darkBlue}
                onPress={onDismiss}
              >{dismissText}</FormButton>
            </View>

          </View>

          <Badge
            onPress={onDismiss}
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

ConfirmModal.propTypes = {
  modalVisible: PropsTypes.bool,
  onConfirm: PropsTypes.func,
  onDismiss: PropsTypes.func,
  confirmText: PropsTypes.string,
  dismissText: PropsTypes.string,
  descriptionText: PropsTypes.string
};

export default ConfirmModal;
