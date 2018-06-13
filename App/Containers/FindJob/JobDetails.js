import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, Dimensions } from 'react-native'
import call from 'react-native-phone-call'
import { isArray, sortBy, get } from 'lodash'

import AutoHeightImage from 'react-native-auto-height-image';


import Images from '../../Themes/Images'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton/FormButton'
import TransparentButton from '../../Components/FormButton/TransparentButton'
import AppConfig from '../../Config/AppConfig'
import { Colors } from '../../Themes'

const {width, height} = Dimensions.get('window');
const imageWidth = width - 90;

const JobDetailsItem = ({label, children}) => (
  <View style={styles.jobDetailsItemWrapper}>
    <View style={styles.jobDetailsItemLabelBlock}><Text style={styles.jobDetailsItemLabel}>{label}</Text></View>
    {children}
    <Image source={Images.dashedBorder} style={{width: '100%', height: 1, marginTop: 20}} resizeMode={'cover'} />
  </View>
);

class JobDetails extends React.Component {
  static defaultProps = {
    showCallButton: false,
    attributes: {
      visibilities: []
    }
  };

  state = {
    numberVisible: false,
  };



  onCallPress = () => {
    const { post, callButtonPress, showCallButton } = this.props;
    if (!this.state.numberVisible) {
      this.setState({numberVisible: true});

    } else {
      const number = get(post, 'author.phone');
      if (showCallButton) {
        callButtonPress(post.id);
      }
      call({number: number, prompt: true});
    }
  };


  render() {
    const { post, onShare, ln, showCallButton, attributes } = this.props;
    console.log('POST', post);
    const visibilities = get(attributes, 'visibilities');
    const defaultHiddenFields = visibilities ? visibilities.map(item => {
      return {
        [item['name']]: item.visible
      }
    }).filter(item => {
      let key = Object.keys(item)[0];
      return item[key] === 0;
    }).reduce((result, item, index, array) => {
      let key = Object.keys(item)[0];
      result[key] = true;
      return result;
    }, {}) : {};

    console.log('defaultHiddenFields', defaultHiddenFields);
    return (
      <View style={styles.jobDetailsContainer}>
        <Text style={styles.jobDetailsItemValue}>{`${I18n.t('translation.category', {locale: ln})}: ${post.category.title}` }</Text>
        {
          (post.custom_params && isArray(post.custom_params) && post.custom_params.length > 0) ?
            sortBy(post.custom_params, 'display_order').map((item, i) =>
              <JobDetailsItem key={i} label={I18n.t(`translation.${item.title}`, {locale: ln}).replace('translation.', '')}>
                <View style={styles.jobDetailsItemInner}>
                  {
                    item.type === 2 ?
                      <AutoHeightImage
                        width={imageWidth}
                        source={{uri: AppConfig.baseUrl + item.value}}
                      /> :
                      <Text style={styles.jobDetailsItemValue}>
                        {`${item.value}`}
                      </Text>
                  }
                </View>
              </JobDetailsItem>
            ) : null
        }
        {
          (post && post.service && post.service.title) ?
            <JobDetailsItem label={I18n.t('translation.projectType', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.service.title}
                </Text>
              </View>
            </JobDetailsItem> : null
        }
        {
          !defaultHiddenFields.location_from && (post.region_from && post.region_from.title) ?
            <JobDetailsItem label={I18n.t('translation.regionFrom', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.region_from.title}
                </Text>
              </View>
            </JobDetailsItem> : null
        }
        {
          !defaultHiddenFields.location_from && (post.location_from && post.location_from.title) ?
            <JobDetailsItem label={I18n.t('translation.area', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.location_from.title}
                </Text>
              </View>
            </JobDetailsItem> : null
        }
        {
          !defaultHiddenFields.address_from && (post && !!post.address_from) ?
            <JobDetailsItem label={I18n.t('translation.addressFrom', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.address_from}
                </Text>
              </View>
            </JobDetailsItem> : null
        }

        {
          !defaultHiddenFields.location_to && (post.region_to && post.region_to.title) ?
            <JobDetailsItem label={I18n.t('translation.regionTo', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.region_to.title}
                </Text>
              </View>
            </JobDetailsItem> : null
        }
        {
          !defaultHiddenFields.location_to && (post.location_to && post.location_to.title) ?
            <JobDetailsItem label={I18n.t('translation.areaTo', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.location_to.title}
                </Text>
              </View>
            </JobDetailsItem> : null
        }
        {
          !defaultHiddenFields.address_to && (post && !!post.address_to) ?
            <JobDetailsItem label={I18n.t('translation.addressTo', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.address_to}
                </Text>
              </View>
            </JobDetailsItem> : null
        }
        {
          (!defaultHiddenFields.work_period_to || !defaultHiddenFields.work_period_from) && (post.work_period_to && post.work_period_from) ?
          <JobDetailsItem label={I18n.t('translation.workPeriod', {locale: ln})}>
            <View style={styles.jobDetailsItemInner}>
              <Text style={styles.jobDetailsItemValue}>
                {`${post.work_period_to} - ${post.work_period_from}`}
              </Text>
            </View>
          </JobDetailsItem> : null
        }
        {
          !defaultHiddenFields.notes && post && post.notes ?
            <JobDetailsItem label={I18n.t('translation.notes', {locale: ln})}>
              <View style={styles.jobDetailsItemInner}>
                <Text style={styles.jobDetailsItemValue}>
                  {post.notes}
                </Text>
              </View>
            </JobDetailsItem> : null
        }

        <View style={{alignItems: 'center', marginTop: 25}}>
          {
            showCallButton &&
            <FormButton style={{width: '100%', marginBottom: 10}} textStyle={{color: Colors.black}} backgroundColor={Colors.white} icon={Images.callIcon} onPress={this.onCallPress}>
              {
                this.state.numberVisible ?
                post.author.phone :
                I18n.t('translation.callNow', {locale: ln})
              }
            </FormButton>
          }
          <TransparentButton style={{width: '100%'}} icon={Images.shareIcon} onPress={() => {onShare(post)}}>
            {I18n.t('translation.share', {locale: ln})}
          </TransparentButton>
        </View>
      </View>
    )
  }
}

JobDetails.propTypes = {
  post: PropTypes.object,
  onShare: PropTypes.func,
  ln: PropTypes.string,
  showCallButton: PropTypes.bool
};

export default JobDetails
