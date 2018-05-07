import React from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux'
import { Formik } from 'formik'
import AppConfig from '../../Config/AppConfig';
import Images from '../../Themes/Images';

import FormInput from '../../Components/FormInput'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import { getIncomingCallsList } from '../../Redux/CallsRedux';

import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'
import {selectLanguage} from "../../Redux/I18nRedux";

const IncomingCallItem = ({item, ln}) => {
  return (
    <View style={styles.incomingCallWrapper}>
      <View
        style={styles.numberWrapper}
      >
        <Text>
          {`${I18n.t('translation.adNumber', {locale: ln})} ${item.post_id}`}
        </Text>
        <Text>
          {`${I18n.t('translation.publicationDate', {locale: ln})} ${item.publication_date}`}
        </Text>
        <Text>
          {`${I18n.t('translation.subCategory', {locale: ln})} ${item.category.title}`}
        </Text>
      </View>
      <View
        style={styles.infoWrapper}
      >
        <Text>
          {
            item.business_rating ?
              item.business_rating :
              null
          }
          {
            item.is_premium ?
              <Image source={Images.premiumIcon} /> :
              <Image source={Images.starIcon} />
          }
          {item.business_name}
        </Text>
        <Text>
          {item.business_phone}
        </Text>
      </View>
    </View>
  );
};

class MyIncomingCallsScreen extends React.Component {
  state = {
    calls: [],
    spinner: true,
    searchBy: ''
  }

  componentDidMount() {
    this._getCallsList = this._getCallsList.bind(this);
    this._getCallsList();
  }

  onSearchByChanged(name, value) {
    this.setState({[name]: value});
  }

  keyExtractor = (item, index) => index;

  ///
  _getCallsList() {
    this.setState({spinner: true});
    getIncomingCallsList().then((calls) => {
      console.log('calls', calls);
      this.setState({spinner: false});
      this.setState({calls});
    })
  }

  render() {
    return (
      <ScreenContainer noPadding={true}>
        <PageTitle title={I18n.t('translation.myIncomingCalls', {locale: this.props.ln})} />
        <View style={{flex: 0, width: '100%', paddingHorizontal: '10%'}}>
          <FormInput
            name={'searchBy'}
            keyboardType={'phone-pad'}
            onChange={this.onSearchByChanged.bind(this)}
            label={I18n.t('translation.search', {locale: this.props.ln})}
            value={this.state.searchBy}
          />
        </View>
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#fff" /> :
            <FlatList
              numColumns={1}
              style={{width: '100%'}}
              keyExtractor={this.keyExtractor}
              data={this.state.calls.filter(item => item.business_phone ? (item.business_phone.indexOf(this.state.searchBy) === 0) : false)}
              extraData={this.state}
              renderItem={({item}) =>
                <IncomingCallItem item={item} ln={this.props.ln} />
              }
            />
        }
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
})

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MyIncomingCallsScreen);

