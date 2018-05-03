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
    paddingVertical: 10
  },
  numberWrapper: {
    width: '50%'
  },
  infoWrapper: {
    width: '50%'
  }
})
