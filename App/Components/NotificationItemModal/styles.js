import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

import styles from '../ConfirmModal/styles';

const postItemStyles = {
  paddingHorizontal: 15,
  paddingTop: 15,
  paddingBottom: 10
};
const flexStyles = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'space-between'
};
const verticalAlignFlex = {
  flex: 0,
  flexDirection: 'column',
  justifyContent: 'center'
};

export default StyleSheet.create({
  modalWrapper: {
    backgroundColor: Colors.darkTransparent
  },
  notificationModalWrapper: {
    position: 'relative',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  notificationModal: {
    backgroundColor: '#008fe1',
    padding: 20,
    marginHorizontal: 15,
  },
  headerImage: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  newType: {
    width: 100,
    height: 100
  },
  completedType: {
    width: 100,
    height: 100,
  },
  headerTitle: {
    textAlign: 'center',
    color: Colors.white
  },
  headerSubTitle: {
    textAlign: 'center',
    color: Colors.white,
    marginTop: 15,
    marginBottom: 10
  },
  headerDashedLine: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  postItem: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 10
  },
  contentPost: {
    ...postItemStyles,
  },
  footerPost: {
    ...postItemStyles,
    borderTopWidth: 1,
    borderTopColor: '#4b87c0'
  },
  postRow: {
    ...flexStyles,
  },
  contentLeftPart: {
    width: '65%'
  },
  contentRightPart: {
    width: '35%',
    paddingLeft: 10
  },
  footerPart: {
    width: '50%'
  },
  contentLabelText: {
    textAlign: 'right'
  },
  contentValueText: {
    textAlign: 'right'
  },
  footerText: {
    textAlign: 'right'
  },
  button: {
    ...verticalAlignFlex,
    backgroundColor: '#13326a',
    borderColor: '#13326a',
    borderRadius: 8,
    padding: 10,
    height: 60,

  },
  buttonText: {
    color: Colors.white,
    textAlign: 'center',
  },
  confirmButton: {},
  dismissButton: {}
})
