import { StyleSheet, Dimentions } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  incomingCallWrapper: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginBottom: 10,
    paddingHorizontal: '8%',
    paddingTop: 10
  },
  numberWrapper: {
    width: '50%'
  },
  infoWrapper: {
    width: '50%',
    paddingRight: 20,
  },
  infoText: {
    ...Fonts.style.h6Bold,
    color: Colors.black,
    textAlign: 'right',
    marginBottom: 10,
  },
  businessNameWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0
  },
  businessNameText: {
    ...Fonts.style.h5Bold,
    color: Colors.black,
    alignSelf: 'center',
    alignItems: 'center'
  },

  businessPhoneText: {
    ...Fonts.style.h23Bold,
    color: Colors.black,
    textAlign: 'right',
  },

  iconWrapper: {
    flex: 0,
    flexDirection: 'row',
    height: 25
  },


  icon: {
    width: 25,
    aspectRatio: 1,
    marginHorizontal: 5
  }
})
