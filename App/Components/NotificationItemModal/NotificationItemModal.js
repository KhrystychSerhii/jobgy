import React from 'react';
import { View, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
import PropsTypes from 'prop-types'
import get from 'lodash/get'


import { Images } from '../../Themes';
import styles from './styles';

import I18n from '../../I18n'

import Badge from '../../Components/Badge';

import ModalWrapper from '../../Components/ModalWrapper'

const {width, height} = Dimensions.get('window');

const PostItem = ({notification, locale}) => {
  const service = get(notification, 'post.service.title');
  const domain = get(notification, 'post.category.title');
  const area = get(notification, 'post.location_from.title');
  const workPeriodTo = get(notification, 'post.work_period_to');
  const workPeriodFrom = get(notification, 'post.work_period_from');
  const datePublished = get(notification, 'post.created_at');
  const adNumber = get(notification, 'post.id');

  return (
    <View style={styles.postItem}>
      <View style={styles.contentPost}>
        <View style={styles.postRow}>
          <View style={styles.contentLeftPart}>
            <Text style={styles.contentLabelText}>
              {I18n.t('translation.typeOfServce', {locale})}
            </Text>
            <Text style={styles.contentValueText}>
              {service}
            </Text>
          </View>
          <View style={styles.contentRightPart}>
            <Text style={styles.contentLabelText}>
              {I18n.t('translation.domain', {locale})}
            </Text>
            <Text style={styles.contentValueText}>
              {domain}
            </Text>
          </View>
        </View>
        <View style={styles.postRow}>
          <View style={styles.contentLeftPart}>
            <Text style={styles.contentLabelText}>
              {I18n.t('translation.workPeriod', {locale})}
            </Text>
            <Text style={styles.contentValueText}>
              {`${workPeriodTo} - ${workPeriodFrom}`}
            </Text>
          </View>
          <View style={styles.contentRightPart}>
            <Text style={styles.contentLabelText}>
              {I18n.t('translation.area', {locale})}
            </Text>
            <Text style={styles.contentValueText}>
              {area}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footerPost}>
        <View style={styles.postRow}>
          <View style={styles.footerPart}>
            <Text style={styles.footerText}>
              {I18n.t('translation.datePublished', {locale})}
            </Text>
            <Text style={styles.footerText}>
              {datePublished}
            </Text>
          </View>
          <View style={styles.footerPart}>
            <Text style={styles.footerText}>
              {I18n.t('translation.adNumber', {locale})}
            </Text>
            <Text style={styles.footerText}>
              {adNumber}
            </Text>
          </View>
        </View>
      </View>

    </View>
  )
};

const Header = ({notification, locale}) => {
  const type = get(notification, 'type');
  console.log('notification', notification);
  console.log('type', type);
  return (
    <View>
      {
        type.id === 1 ?
          <Image
            source={Images.dude2}
            resizeMode={'contain'}
            style={[styles.headerImage, styles.completedType]}
          /> :
          <Image
            source={Images.dude4}
            resizeMode={'contain'}
            style={[styles.headerImage, styles.newType]}
          />
      }

      <Text style={styles.headerTitle}>
        {I18n.t('translation.workPeriodHasEnded', {locale})}
      </Text>
      <Image source={Images.pageTitleBorder} resizeMode={'contain'} style={styles.headerDashedLine} />
      <Text style={styles.headerSubTitle}>
        {I18n.t('translation.rateTheServiceProvider', {locale})}
      </Text>
    </View>
  )
}

class NotificationItemModal extends React.Component {
  render() {
    const {onButtonPress, modalVisible, onDismiss, notification, locale} = this.props;
    return (
      <ModalWrapper
        onClose={onDismiss}
        visible={modalVisible}
        contentWrapperStyles={styles.modalWrapper}>
        <View style={styles.notificationModalWrapper}>

          <View style={styles.notificationModal}>

            <Header
              notification={notification}
              locale={locale}
            />

            <PostItem
              notification={notification}
              locale={locale}
            />

            <TouchableOpacity style={styles.button} onPress={onButtonPress}>
              <Text style={styles.buttonText}>
                {
                  notification.type.id === 1 ?
                    I18n.t('translation.readAd', {locale}) :
                    I18n.t('translation.rateTheService', {locale})
                }
              </Text>
            </TouchableOpacity>
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

NotificationItemModal.propTypes = {
  onButtonPress: PropsTypes.func,
  modalVisible: PropsTypes.bool,
  onDismiss: PropsTypes.func,
  notification: PropsTypes.object,
  locale: PropsTypes.string
};

export default NotificationItemModal;
