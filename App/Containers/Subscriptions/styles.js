import { StyleSheet, I18nManager, Dimensions } from 'react-native'
import { Fonts, ApplicationStyles, Colors } from '../../Themes'
const {width, height} = Dimensions.get('window')
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  modalContentWrapper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: 65,
  },
  modalContent: {
    backgroundColor: Colors.lightBlue,
    padding: 15,
  },
  modalHeaderText: {
    ...Fonts.style.normal,
    color: Colors.white,
    textAlignVertical: 'center',
  },
  subtitle: {
    ...Fonts.style.h5,
    color: Colors.white,
  },
  whiteText: {
    ...Fonts.style.medium,
    color: Colors.white,
    fontWeight: '500'
  },
  // subscriptions page
  subscriptionsWrapper: {
    width: '100%'
  },
  subscriptionItemWrapper: {
    position: 'relative',
    paddingTop: 20
  },
  subscriptionItem: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',

    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 0,
  },
  activeSubscriptionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  priceWrapper: {
    alignSelf: 'center',
    width: '34%',
    flex: 0
  },
  priceText: {
    ...Fonts.style.h5Bold,
    color: Colors.black,
    textAlign: 'right',
  },
  periodText: {
    ...Fonts.style.h6Bold,
    color: Colors.black,
    textAlign: 'right',
  },
  descriptionWrapper: {
    alignSelf: 'center',
    maxWidth: '66%'
  },
  descriptionText: {
    ...Fonts.style.h5Bold,
    color: Colors.black,
    paddingLeft: 10,
    textAlign: 'right',
  },
  activeCheckmark: {
    position: 'absolute',
    height: 20,
    width: 30,
    right: 10,
    top: 15,
  },
  badgeText: {
    ...Fonts.style.h6Bold,
    color: Colors.white
  },
  // chose category page
  subTitleWrapper: {
    width: '80%',
  },
  subTitle: {
    ...Fonts.style.h4,
    color: Colors.white,
    marginBottom: 20,
  },
  listWrapper: {
    marginBottom: 20
  },
  dashedBorder: {
    marginBottom: 20,
    maxWidth: '80%',
    height: 5
  },
  totalSelectedSum: {
    marginBottom: 20
  },
  totalSelectedSumText: {
    ...Fonts.style.h4Bold,
    color: Colors.white,
    textAlign: 'center'
  },
  // Payment screen
  paymentSubTitleBottom: {
    ...Fonts.style.h4Bold,
    color: Colors.white,
    marginBottom: 20,
  },
  paymentWebView: {
    flex: 1,
    backgroundColor: Colors.transparent,
    width: width,
    aspectRatio: 1
  }
})
