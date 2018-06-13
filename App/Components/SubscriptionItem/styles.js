import { StyleSheet, Dimentions } from 'react-native';
import { Colors, Fonts } from '../../Themes';


export default StyleSheet.create({
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
})
