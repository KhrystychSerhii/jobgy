import { StyleSheet, Dimentions } from 'react-native';
import { Colors, Fonts } from '../../Themes';


export default StyleSheet.create({
  inputWrapper: {
    minHeight: 60,
    paddingVertical: 10,
    borderWidth: 2
  },
  imagePickerWrapper: {
    height: 60
  },
  textInputWrapper: {
    height: 60,
    borderWidth: 2
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
  button: {
    position: 'relative',
    flex: 0,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 0,
    alignItems: 'center',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 30,
    paddingLeft: 10,
  },
  textWrapper: {
    width: '100%',
    marginRight: 30,
    paddingLeft: 10
  },
  labelText: {
    ...Fonts.style.h5Bold,
    fontSize: 15,
  },
  textInput: {
    ...Fonts.style.h5Bold,
    color: '#35495e',
    textAlign: 'left'
  },
  textArea: {
    ...Fonts.style.h5Bold,
    color: '#35495e',
    textAlign: 'right'
  },
  validCheckmark: {
    height: 20,
    width: 30,
    position: 'absolute',
    right: -2,
    top: 20,
  },
  cameraImage: {
    height: 20,
    width: 30,
    position: 'absolute',
    left: 5,
    top: 20,
  },
  requiredSymbol: {
    color: Colors.red
  }
})
