import React from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux'
import { Formik } from 'formik'
import AppConfig from '../../Config/AppConfig';
import Images from '../../Themes/Images';

import FormInput from '../../Components/FormInput'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import InputField from '../../Components/InputField';



import { createStructuredSelector } from 'reselect'

import styles from './style'

import I18n from '../../I18n'

import { getIncomingCallsList, searchIncomingCallsList, selectIncomingCallsList } from '../../Redux/CallsRedux';
import {selectLanguage} from '../../Redux/I18nRedux';

const IconItem = ({rating, premium}) => {
  return (
    <View style={styles.iconWrapper}>
      {
        rating ? <Text style={styles.businessNameText}>{rating}</Text> : null
      }
      {
        premium ? <Image source={Images.premiumIcon} style={styles.icon} resizeMode={'contain'} /> : <Image source={Images.starIcon} style={styles.icon} resizeMode={'contain'} />
      }
    </View>
  )
};

const IncomingCallItem = ({item, ln}) => {
  return (
    <View style={styles.incomingCallWrapper}>
      <View
        style={styles.infoWrapper}
      >
        <Text style={styles.infoText}>
          {`${I18n.t('translation.adNumber', {locale: ln})} ${item.post_id}`}
        </Text>
        <Text style={styles.infoText}>
          {`${I18n.t('translation.publicationDate', {locale: ln})} ${item.publication_date}`}
        </Text>
        <Text style={styles.infoText}>
          {`${I18n.t('translation.subCategory', {locale: ln})} ${item.category.title}`}
        </Text>
      </View>
      <View
        style={styles.numberWrapper}
      >
        <View style={styles.businessNameWrapper}>
          <IconItem rating={item.business_rating} premium={item.is_premium} />
          <Text style={styles.businessNameText}>{item.business_name}</Text>
        </View>
        <View>
          <Text style={styles.businessPhoneText}>
            {item.business_phone}
          </Text>
        </View>

      </View>
    </View>
  );
};

class MyIncomingCallsScreen extends React.Component {
  state = {
    spinner: true,
    searchBy: ''
  }

  componentDidMount() {
    this._getCallsList();
  }

  onSearchByChanged = (name, value) => {
    this.setState({[name]: value});
    this.setState({spinner: true});

    if (value || value === 0) {
      this.props.searchIncomingCalls(value).then(() => {
        this.setState({spinner: false});
      });
    } else {
      this._getCallsList();
    }


  }

  keyExtractor = (item, index) => index;

  ///
  _getCallsList = () => {
    this.setState({spinner: true});
    this.props.getIncomingCallsList().then(() => {
      this.setState({spinner: false});
    });
  }

  render() {
    const {ln, calls} = this.props;
    return (
      <ScreenContainer noPadding={true}>
        <PageTitle title={I18n.t('translation.myIncomingCalls', {locale: ln})} />
        <View style={{flex: 0, width: '100%', paddingHorizontal: '10%', marginVertical: 20}}>

          <InputField
            onChangeText={(value) => { this.onSearchByChanged('searchBy', value); }}
            value={this.state.searchBy}
            placeholder={I18n.t('translation.search', {locale: ln})}
            keyboardType={'phone-pad'}
          />
        </View>
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#fff" /> :
            <FlatList
              numColumns={1}
              style={{width: '100%'}}
              keyExtractor={this.keyExtractor}
              data={calls}
              extraData={this.state}
              renderItem={({item}) =>
                <IncomingCallItem item={item} ln={ln} />
              }
            />
        }
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage(),
  calls: selectIncomingCallsList()
})

const mapDispatchToProps = (dispatch) => {
  return {
    getIncomingCallsList: () => dispatch(getIncomingCallsList()),
    searchIncomingCalls: (phone) => dispatch(searchIncomingCallsList(phone))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyIncomingCallsScreen);

