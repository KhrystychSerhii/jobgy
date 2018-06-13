import { StyleSheet, Dimensions, I18nManager, Platform } from 'react-native'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    minHeight: 60
  },
  enabledWrapper: {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  disabledWrapper: {
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  withValueWrapper: {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  invalidWrapper: {
    borderColor: Colors.red,
    shadowColor: Colors.red,
  },
  selectButton: {
    position: 'relative',
    height: '100%',
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textWrapper: {},
  labelText: {
    ...Fonts.style.h5Bold,
    alignSelf: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  valueText: {
    ...Fonts.style.h5Bold,
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center',
    color: '#35495e',
  },
  requiredSymbol: {
    color: Colors.red
  }
})
