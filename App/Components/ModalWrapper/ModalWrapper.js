import React from 'react'
import PropTypes from 'prop-types'
import { View, Modal, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'

class ModalWrapper extends React.Component {
  render () {
    const {children, visible, onClose, contentWrapperStyles, contentStyles, withCloseButton, onLayout, dynamicHeight} = this.props
    const _contentStyles = [styles.modalContent, contentStyles]
    if (dynamicHeight) {
      _contentStyles.push({height: dynamicHeight})
    }
    return (
      <View style={{flex: 1}}>
        <Modal
          visible={visible}
          animationType={'slide'}
          onRequestClose={onClose}
          transparent
        >
          <View style={[styles.modalContentWrapper, contentWrapperStyles]} onLayout={onLayout}>
            <View style={_contentStyles}>
              {withCloseButton && <View style={styles.closeBtnStyles}>
                <TouchableWithoutFeedback onPress={onClose}>
                  <Icon name={'ios-close-outline'} size={30} />
                </TouchableWithoutFeedback>
              </View>}

              {children}
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

ModalWrapper.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  contentWrapperStyles: PropTypes.any,
  contentStyles: PropTypes.any,
  withCloseButton: PropTypes.bool,
  onLayout: PropTypes.func,
}

export default ModalWrapper
