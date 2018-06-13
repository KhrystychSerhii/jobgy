import { StyleSheet, I18nManager } from 'react-native'
import { scale } from 'react-native-size-matters'
import { Colors, Fonts } from '../../Themes'

const row = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'space-between'
}

export default StyleSheet.create({
  itemWrapper: {
    width: '100%',
    backgroundColor: Colors.white,
    marginBottom: 10,
  },
  itemInner: {
    ...row
  },
  top: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4b87c0'
  },
  bottom: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contentContainer_75: {
    width: '75%',
    ...row
  },
  contentContainer_50: {
    width: '50%',
    ...row,
    flexWrap: 'wrap'
  },
  contentContainer_25: {
    width: '25%',
    ...row

  },


  propertyWrapper: {
    width: '100%',
    paddingHorizontal: 5
  },
  label: {
    ...Fonts.style.h5,
    textAlign: 'right',
    color: '#969696'
  },
  text: {
    ...Fonts.style.h5,
    textAlign: 'right',
    color: Colors.black
  },
  footerText: {
    ...Fonts.style.h5Bold,
    color: Colors.black,
    textAlign: 'right'
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 10
  },
  jumpButton: {
    backgroundColor: '#28a745',
    borderColor: '#28a745'
  },
  disabledJumpButton: {
    backgroundColor: '#52b558',
    borderColor: '#52b558'
  },
  closeButton: {
    backgroundColor: '#f03c3c',
    borderColor: '#f03c3c'
  },
  ratingButton: {
    backgroundColor: '#13326a',
    borderColor: '#13326a',
  },
  buttonText: {
    ...Fonts.style.h5,
    color: Colors.white,
  }
})
