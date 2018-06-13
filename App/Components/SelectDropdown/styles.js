import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  // select button
  selectWrapper: {
    borderWidth: 2,
  },
  enabledSelectWrapper: {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  disabledSelectWrapper: {
    borderColor: 'rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  withValueWrapper: {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  selectButton: {
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 30,
  },
  dropdownArrow: {
    height: 12,
    width: 20,
    position: 'absolute',
    left: 5,
    top: 24,
  },
  selectInner: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    borderWidth: 0 // иначе происходит эффект overflow visible
  },
  selectTextWrapper: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
  },
  valueText: {
    ...Fonts.style.h5Bold,
    color: '#35495e',
    paddingRight: 30
  },
  valueSuccessCheckmark: {
    height: 20,
    width: 30,
    position: 'absolute',
    right: 0,
    top: 20,
  },
  labelText: {
    ...Fonts.style.h5Bold,
    alignSelf: 'center',
    fontSize: 15,
  },
  // dropdown modal
  modalWrapper: {
    backgroundColor: Colors.darkTransparent,
    padding: 20
  },
  modal: {
    backgroundColor: Colors.darkTransparent,
    marginLeft: 'auto', marginRight: 'auto'
  },
  headerWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 60,
    paddingHorizontal: 30
  },
  headerText: {
    ...Fonts.style.h5Bold,
    alignSelf: 'center',
    textAlign: 'right',
    fontSize: 15,
  },
  selectedHeaderText: {
    color: '#bbb'
  },
  unselectedHeaderText: {
    color: '#303030'
  },
  searchInputWrapper: {
    paddingHorizontal: 20,
  },
  searchInput: {
    flexGrow: 2,
    flex: 1,
    padding: 0,
    color: Colors.black,
    ...Fonts.style.input,
  },
  itemsWrapper: {

  },

  itemWrapper: {
    position: 'relative',
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    paddingRight: 30
  },
  itemText: {
    ...Fonts.style.h3Bold,
    color: '#303030',
    textAlign: 'center'
  },
  selectedCheckmark: {
    position: 'absolute',
    height: 20,
    width: 30,
    right: 20,
    top: 20,
  },
  buttonsWrapper: {
    height: 60,
    alignSelf: 'center',
    alignItems: 'center',
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#dadada'
  },
  buttonWrapper: {
    // flex: 0,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // marginTop: 'auto',
    // marginBottom: 'auto',
    maxWidth: '33.3%'
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#1E67B7',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  buttonText: {
    ...Fonts.style.h5,
    color: '#fff',
  },
  linkButton: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  linkButtonText: {
    ...Fonts.style.h5,
    color: '#1E67B7',
    borderBottomColor: '#1E67B7',
    borderBottomWidth: 1
  },
  requiredSymbol: {
    color: Colors.red
  },
  invalidWrapper: {
    borderColor: Colors.red,
    shadowColor: Colors.red,
  },

})
