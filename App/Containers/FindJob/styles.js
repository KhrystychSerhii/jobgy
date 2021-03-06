import { StyleSheet, I18nManager, Dimensions } from 'react-native'
import { Fonts, Colors, ApplicationStyles } from '../../Themes/index'
import { scale } from 'react-native-size-matters'
import { leftProp, rightProp } from '../../Transforms/index'

const {width, height} = Dimensions.get('window');

const imageWidth = width - 90;

export default StyleSheet.create({
  titleWithImagesWrapper: {
    ...ApplicationStyles.titleWithImagesWrapper,
    paddingLeft: 20,
    paddingRight: 20,
  },
  resultsTitleImage: {
    position: 'absolute',
    [rightProp()]: scale(3),
    bottom: -10,
    width: scale(60),
  },
  resultsTitleImageLeft: {
    position: 'absolute',
    [leftProp()]: scale(5),
    bottom: scale(11),
    width: scale(45),
  },
  countText: {
    ...Fonts.style.h3,
    color: Colors.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  btnStyle: {
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 30,
  },
  btnTextStyle: {
    fontWeight: '100',
  },
  modalContentWrapper: {
    marginTop: 65,
  },
  modalContent: {
    backgroundColor: Colors.darkBlue,
    padding: 15,
  },
  modalHeaderText: {
    ...Fonts.style.normal,
    color: Colors.white,
    textAlignVertical: 'center',
  },
  jobDetailsContainer: {
    flex: 1,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  jobDetailsItemLabelBlock: {
    flex: 1,
    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-end',
    paddingBottom: 10,
    paddingTop: 25,
  },
  jobDetailsItemLabel: {
    flex: 1,
    textAlign: 'right',
    color: Colors.white,
    ...Fonts.style.h3,
    opacity: 0.6,
  },
  jobDetailsItemInner: {
    flex: 1,
    // flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
  },
  jobDetailsItemValue: {
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
    ...Fonts.style.medium,
    fontWeight: '500',
  },
  jobDetailsCallBtn: {
    backgroundColor: Colors.transparent,
    width: '90%',
    marginVertical: 15,
    elevation: 5,
  },
  jobDetailsCallBtnText: {
    color: Colors.white,
  },
  jobDetailsShareButton: {
    ...ApplicationStyles.outlineButton,
    width: '90%',
    marginVertical: 15,
    borderColor: Colors.white,
    borderWidth: 2
  },
  jobDetailsShareButtonText: {
    color: Colors.white,
    borderColor: Colors.white,
  },
  jobDetailsImage: {
    width: imageWidth,
    height: imageWidth
  }

})
