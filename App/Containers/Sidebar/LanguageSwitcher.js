import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import Row from '../../Components/Row'
import I18n from '../../I18n/I18n'

const LanguageSwitcher = ({languages, ln, onSelectLanguage}) => (
  <View>
    <View style={{alignItems: 'center'}}>
      <Text>{I18n.t('translation.language', {locale: ln})}</Text>
    </View>
    <Row >
      {languages.map(
        item => (
          <TouchableWithoutFeedback
            style={{backgroundColor: '#fff', borderRadius: 4}}
            key={item.id}
            onPress={() => onSelectLanguage(item)}
          >
            <View style={{marginVertical: 10, marginHorizontal: 6}}>
              <Text>{I18n.t(`translation.${item.abbr}`, {locale: ln})}</Text>
            </View>
          </TouchableWithoutFeedback>
        ),
      )}
    </Row>
  </View>
)

export default LanguageSwitcher
