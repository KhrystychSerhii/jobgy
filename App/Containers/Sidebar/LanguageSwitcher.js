import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Row from '../../Components/Row'
import I18n from '../../I18n'

const LanguageSwitcher = ({languages, onSelectLanguage}) => (
  <View>
    <View style={{alignItems: 'center'}}>
      <Text>{I18n.t('MENU.LANGUAGE')}</Text>
    </View>
    <Row >
      {languages.map(
        item => (
          <TouchableWithoutFeedback
            style={{backgroundColor: '#fff', borderRadius: 4}}
            key={item.id}
            onPress={() => onSelectLanguage(item.id)}
          >
            <View style={{marginVertical: 3, marginHorizontal: 6}}><Text>{item.title}</Text></View>
          </TouchableWithoutFeedback>
        ),
      )}
    </Row>
  </View>
)

export default LanguageSwitcher
