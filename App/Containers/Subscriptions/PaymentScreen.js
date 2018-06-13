import React from 'react'
import { View, Text, WebView, Dimensions, Image } from 'react-native'
import I18n from '../../I18n/index'
import get from 'lodash/get';

import { Images } from '../../Themes';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styles from './styles'
import PageTitle from '../../Components/PageTitle'
import ScreenContainer from '../../Components/ScreenContainer'

// Reducers
import { selectLanguage } from '../../Redux/I18nRedux';


class PaymentScreen extends React.Component {

  render () {
    const {ln} = this.props;
    const sum = get(this.props, 'navigation.state.params.sum')
    const amount = get(this.props, 'navigation.state.params.amount')
    return (
      <ScreenContainer>
        <PageTitle title={I18n.t('translation.paymentSummary', {locale: ln})} />
        <View
          style={styles.subTitleWrapper}>
          <Text style={styles.subTitle}>{I18n.t('translation.monthPlanPaymentDescription', {locale: ln, amount})}</Text>
        </View>
        <View
          style={styles.subTitleWrapper}>
          <Text style={styles.paymentSubTitleBottom}>{I18n.t('translation.categoriesSelected', {locale: ln, categories: sum})}</Text>
        </View>
        <Image source={Images.pageTitleBorder} style={styles.dashedBorder} />

        <WebView
          style={styles.paymentWebView}
          source={{uri: `https://direct.tranzila.com/ttxjobgy/iframe.php?template=custom&lang=heb&currency=1&sum=${sum}&orderid=111&tranmode=AK`}}
        />
        {/*<View>*/}
          {/*<Text>{this.props.navigation.getParam('details', null)}</Text>*/}
        {/*</View>*/}

      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
