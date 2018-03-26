import { StyleSheet, I18nManager } from 'react-native'
import { Colors } from '../../Themes'

export default StyleSheet.create({
  textButton: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    alignSelf: 'center'
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    color: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.white
  }
})
