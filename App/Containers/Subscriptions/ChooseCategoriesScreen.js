import React from 'react';
import { ScrollView, View, FlatList, Text, Image, ActivityIndicator } from 'react-native';

import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import CategoriesListItem from '../../Components/CategoriesList/CategoriesListItem';
import Button from '../../Components/Button';

import { Images } from '../../Themes';
import styles from './styles';

import I18n from '../../I18n';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Reducers
import { selectCategoriesList, getCategoriesList, unsubscribeCategoryById } from '../../Redux/CategoriesRedux';
import { selectLanguage } from '../../Redux/I18nRedux';
import TextButton from "../../Components/TextButton/TextButton";

class ChooseCategoriesScreen extends React.Component {

  state = {
    spinner: true,
    categories: []
  };

  componentDidMount() {
    this._getCategoriesList();
  }

  onCategoriesPress = (category, index) => {
    let {categories} = this.state;

    categories[index].selected = !categories[index].selected;
    this.setState({categories});
  };

  navigateToPaymentScreen = (sum, amount) => {
    const {navigation} = this.props;
    navigation.navigate('Payment', {sum, amount});
  };


  keyExtractor = (item, index) => index;

  //
  _getCategoriesList = () => {
    const {getCategoriesList} = this.props;
    this.setState({spinner: true});
    getCategoriesList().then(() => {
      let {categories} = this.props;
      categories = [].concat(categories);

      this.setState({spinner: false});
      this.setState({categories: categories.map(item => {
        return Object.assign({
          id: item.id,
          icon_path: item.icon_path,
          title: item.title,
          selected: !!item.selected
        });
      }
      )});
    });
  };

  render() {
    const {ln} = this.props;
    const totalSum = (this.state.categories.filter(item => item.selected).length * 199).toFixed(2);
    const amount = this.state.categories.filter(item => item.selected).length;
    return (
      <ScreenContainer noPadding={true}>
        <PageTitle title={I18n.t('translation.selectCategory', {locale: ln})} />
        <View
          style={styles.subTitleWrapper}>
          <Text style={styles.subTitle}>{I18n.t('translation.firstClickToSelectNextToDeselect', {locale: ln})}</Text>
        </View>
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#fff" /> :
              <FlatList
                refreshing={true}
                numColumns={3}
                style={styles.listWrapper}
                columnWrapperStyle={{flex: 0, flexDirection: 'row-reverse', justifyContent: 'center'}}
                keyExtractor={this.keyExtractor}
                data={this.state.categories}
                extraData={this.state}
                renderItem={({item, index}) =>
                  <View
                    style={{position: 'relative'}}
                  >
                    <CategoriesListItem
                      item={item}
                      border={item.selected}
                      onSelectCategory={() => {this.onCategoriesPress(item, index);}}
                      buttonActive={true}
                    />
                  </View>
                }
              />
        }
        {
          !this.state.spinner ?
          <View>
            <Image source={Images.pageTitleBorder} style={styles.dashedBorder} />
            <View
              style={styles.totalSelectedSum}
            >
              <Text style={styles.totalSelectedSumText}>{I18n.t('translation.categoriesSelected', {locale: ln, categories: totalSum})}</Text>

            </View>
            <Button
              onPress={() => { this.navigateToPaymentScreen(totalSum, amount) }}
              disabled={this.state.categories.filter(item => item.selected).length === 0}
            >
              {I18n.t('translation.confirmToPurchase', {locale: ln})}
            </Button>
          </View> : null
        }
      </ScreenContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList(),
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesList: () => dispatch(getCategoriesList())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCategoriesScreen);
