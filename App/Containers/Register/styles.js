import { StyleSheet, I18nManager } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/index'
import Fonts from '../../Themes/Fonts'
import { scale } from 'react-native-size-matters'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  form: {flex: 1, width: '90%'},
  termsContainer: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 15,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  terms: {
    color: Colors.white,
    ...Fonts.style.h4Bold
  },
  termsLink: {
    textDecorationStyle: 'solid',
    color: Colors.white,
    textDecorationColor: Colors.white,
    textDecorationLine: 'underline',
    ...Fonts.style.h4Bold

  },
  subscriptionItem: {
    position: 'relative',
    flex: 1,
    width: '100%',
    paddingHorizontal: 10
  },
  subscriptionItemDescription: {
    width: '70%',
  },
  subscriptionItemPrice: {
    width: '30%',
  },
  subscriptionListPrice: {
    ...Fonts.style.h3,
    fontWeight: '500',
    color: Colors.black,
  },
  subscriptionListDescriptionText: {
    ...Fonts.style.h4,
    fontWeight: '500',
    color: Colors.black,
  },
  subscriptionListText: {
    ...Fonts.style.h5,
    fontWeight: '500',
    textAlignVertical: 'center',
    color: Colors.black,
  },
  subscriptionListTextSmall: {
    ...Fonts.style.h6,
    color: Colors.black,
  },
  bestChoiceBlock: {
    marginBottom: -15,
    [I18nManager.isRTL ? 'marginLeft' : 'marginRight']: -10,
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5
  },
  bestChoiceText: {
    ...Fonts.style.h5,
    color: Colors.white,
    fontWeight: '500',

  },
})
