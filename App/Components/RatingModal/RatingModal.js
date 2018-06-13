import React from 'react';
import PropsTypes from 'prop-types';
import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, Image, I18nManager } from 'react-native'
import Stars from '../../Components/Stars';
import isArray from 'lodash/isArray';

import AppConfig from '../../Config/AppConfig'
import styles from './styles'
import I18n from '../../I18n'
import Images from '../../Themes/Images'

import Badge from '../../Components/Badge';

import ModalWrapper from '../../Components/ModalWrapper'

class RatingModal extends React.Component {

  render() {
    const {rating, onClose, modalVisible} = this.props;

    return (
      <ModalWrapper
        onClose={onClose}
        visible={modalVisible}
        contentWrapperStyles={styles.modalWrapper}
      >
        <View
          style={styles.ratingModalWrapper}
        >

          <View
            style={styles.ratingModal}
          >

            {
              rating && isArray(rating) ?
                rating.map((item, i) =>
                  <View style={styles.ratingRow} key={i}>
                    <Text style={styles.ratingTitle}>{item.title}</Text>
                    <Stars rating={item.rating} />
                  </View>
                ) : null
            }
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

RatingModal.propTypes = {
  modalVisible: PropsTypes.bool,
  ln: PropsTypes.any,
  rating: PropsTypes.any,
  onClose: PropsTypes.func,
};

export default RatingModal;
