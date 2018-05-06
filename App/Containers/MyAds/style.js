import { StyleSheet, Dimentions } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  buttonsWrapper: {
    width: '100%',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: '10%'
  },
  button: {
    width: '40%',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeButton: {
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.lightBlue,
    borderWidth: 2,
  },
  inactiveButton: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  buttonText: {
    ...Fonts.style.h4,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center'
  },

  adItemWrapper: {
    width: '100%',
    backgroundColor: Colors.white,
    marginBottom: 10
  },
  adItemContent: {

    padding: 10,

    borderBottomColor: Colors.lightBlue,
    borderBottomWidth: 1
  },
  adItemContentRow: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  activeAdItemContentButton: {
    width: '20%'
  },
  activeAdItemContentInfo: {
    width: '40%',
    paddingHorizontal: 5
  },
  adItemButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  redButton: {
    backgroundColor: Colors.red
  },
  greenButton: {
    // backgroundColor: Colors.green
    backgroundColor: '#28a745'
  },
  disabledGreenButton: {
    backgroundColor: '#52b558'
  },
  blueButton: {
    backgroundColor: Colors.darkBlue
  },
  adItemFooter: {
    flex: 0,
    flexDirection: 'row',
    padding: 10
  },
  adItemFooterInnerPart: {
    width: '40%'
  },

  ratingFieldWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white,
    marginBottom: 20
  },
  ratingFieldTitleWrapper: {
    marginBottom: 10
  },
  ratingFieldTitleText: {
    ...Fonts.style.h3,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center'
  },
  ratingFieldStarsWrapper: {
    flex: 0,
    flexDirection: 'row',
    marginBottom: 20
  },
  ratingFieldStar: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    opacity: .2
  },
  ratingFiledFooterWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    marginBottom: 20
  },
  ratingFiledFooterText: {
    ...Fonts.style.h4,
    fontWeight: '600',
    color: Colors.white,
  }
})
