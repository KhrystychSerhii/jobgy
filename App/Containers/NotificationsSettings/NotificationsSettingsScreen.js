import React from 'react';
import { View, TouchableOpacity, Text, FlatList, Switch } from 'react-native';
import { connect } from 'react-redux'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import CategoriesListItem from '../../Components/CategoriesList/CategoriesListItem';
import findIndex from 'lodash/findIndex';

import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'
import { selectCategories } from '../../Redux/SettingsRedux';
import {selectLanguage} from "../../Redux/I18nRedux";

class NotificationsSettingsScreen extends React.Component {
  state = {}

  keyExtractor = (item, index) => index

  render() {
    console.log('this.props.categories', this.props.categories);
    return (
      <ScreenContainer>
        <PageTitle title={I18n.t('translation.notificationSettings', {locale: this.props.ln})} />
        <FlatList
          refreshing={true}
          numColumns={3}
          keyExtractor={this.keyExtractor}
          data={this.props.categories}
          extraData={this.state}
          renderItem={({item}) =>
            <View
              style={{position: 'relative', marginBottom: 10}}
            >
              <CategoriesListItem
                item={item}
                onSelectCategory={() => {console.log('category pressed', this.props)}}
                buttonActive={true}
              />
              <View
                style={{flex: 0, alignItems: 'center', justifyContent: 'center'}}
              >
                <Switch
                  onTintColor={'#64d677'}
                  thumbTintColor={'#fff'}
                  tintColor={'#cf4534'} />
              </View>

            </View>
          }
        />


      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategories(),
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSettingsScreen);
