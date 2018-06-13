import React from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import ScreenContainer from '../../Components/ScreenContainer/ScreenContainer';
import PageTitle from '../../Components/PageTitle/PageTitle';
import { selectAdRating, getAdRating } from '../../Redux/AdsRedux';
import { selectQuestions, getQuestions } from '../../Redux/QuestionsRedux';
import { get } from 'lodash';

import { createStructuredSelector } from 'reselect'

import { Images } from '../../Themes'

import styles from './style'

import I18n from '../../I18n'
import { selectLanguage } from '../../Redux/I18nRedux';

const RatingField = ({title, ln}) => {
  return (
    <View
      style={styles.ratingFieldWrapper}>
      <View
        style={styles.ratingFieldTitleWrapper}>
        <Text
          style={styles.ratingFieldTitleText}>
          {title}
        </Text>
      </View>

      <View
        style={styles.ratingFieldStarsWrapper}>
        <Image source={Images.starIcon} style={styles.ratingFieldStar} />
        <Image source={Images.starIcon} style={styles.ratingFieldStar} />
        <Image source={Images.starIcon} style={styles.ratingFieldStar} />
        <Image source={Images.starIcon} style={styles.ratingFieldStar} />
        <Image source={Images.starIcon} style={styles.ratingFieldStar} />
      </View>

      <View
        style={styles.ratingFiledFooterWrapper}>
        <Text style={styles.ratingFiledFooterText}>{I18n.t('translation.selectToGive', { locale: ln })}</Text>
        <Text style={styles.ratingFiledFooterText}>{I18n.t('translation.starsFrom', { locale: ln })}</Text>
      </View>
    </View>
  )
};

class AdRatingScreen extends React.Component {
  state = {
    spinner: true
  };

  componentDidMount() {
    const postId = get(this.props, 'navigation.state.params.postId');
    Promise.all([
      this.props.getQuestions(),
      this.props.getAdRating(postId)
    ]).then(res => {
      this.setState({spinner: false});
      console.log('this.props', this.props)
    });
  }

  render() {
    const { questions, rating, ln } = this.props;
    const postId = get(rating, 'id');
    console.log('rating', rating);
    return (
      <ScreenContainer>
        {
          !this.state.spinner && <PageTitle title={I18n.t('translation.rateHeading', { locale: ln, post: postId })} />
        }
        {
          this.state.spinner ?
            <ActivityIndicator size="large" color="#fff" /> :
            questions.map((item, i) => <RatingField key={i} title={item.title} ln={ln} />)
        }
      </ScreenContainer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  rating: selectAdRating(),
  questions: selectQuestions(),
  ln: selectLanguage()
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAdRating: (id) => dispatch(getAdRating(id)),
    getQuestions: () => dispatch(getQuestions())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdRatingScreen);

