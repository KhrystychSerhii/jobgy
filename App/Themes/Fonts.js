import { scale } from 'react-native-size-matters'

const type = {
  base: 'Rubik-Light',
  medium: 'Rubik-Medium',
  bold: 'Rubik-Bold',
  emphasis: 'HelveticaNeue-Italic',
}

const size = {
  h1: 40,
  // h1: scale(40),
  h2: scale(26),
  h23: scale(21),
  h3: scale(16), // 30px
  h4: scale(14),
  h5: scale(12),
  h6: scale(10),
  input: scale(18),
  regular: scale(18),
  medium: scale(20), //36px
  small: 12,
  tiny: 8.5,
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1,
    includeFontPadding: false,
  },
  h2: {
    fontFamily: type.base,
    fontSize: size.h2,
    includeFontPadding: false,
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3,
    includeFontPadding: false,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4,
    includeFontPadding: false,
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5,
    includeFontPadding: false,
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6,
    includeFontPadding: false,
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    includeFontPadding: false,
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium,
    includeFontPadding: false,
  },
  input: {
    fontFamily: type.base,
    fontSize: size.input,
    includeFontPadding: false,
  },
  medium: {
    fontFamily: type.base,
    fontSize: size.medium,
    includeFontPadding: false,
  },
  h1Bold: {
    fontFamily: type.bold,
    fontSize: size.h1,
    includeFontPadding: false,
  },
  h2Bold: {
    fontFamily: type.bold,
    fontSize: size.h2,
    includeFontPadding: false,
  },
  h23Bold: {
    fontFamily: type.bold,
    fontSize: size.h23,
    includeFontPadding: false,
  },
  h3Bold: {
    fontFamily: type.bold,
    fontSize: size.h3,
    includeFontPadding: false,
  },
  h4Bold: {
    fontFamily: type.bold,
    fontSize: size.h4,
    includeFontPadding: false,
  },
  h5Bold: {
    fontFamily: type.bold,
    fontSize: size.h5,
    includeFontPadding: false,
  },
  h6Bold: {
    fontFamily: type.bold,
    fontSize: size.h6,
    includeFontPadding: false,
  },
  normalBold: {
    fontFamily: type.bold,
    fontSize: size.regular,
    includeFontPadding: false,
  },
  descriptionBold: {
    fontFamily: type.bold,
    fontSize: size.medium,
    includeFontPadding: false,
  },
  inputBold: {
    fontFamily: type.bold,
    fontSize: size.input,
    includeFontPadding: false,
  },
  mediumBold: {
    fontFamily: type.bold,
    fontSize: size.medium,
    includeFontPadding: false,
  },
}

export default {
  type,
  size,
  style,
}
