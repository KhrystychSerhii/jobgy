import React from 'react'
import { View, Text, Image } from 'react-native'

import Images from '../../Themes/Images'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton/FormButton'
import AppConfig from '../../Config/AppConfig'

const JobDetailsItem = ({label, children}) => (
  <View style={styles.jobDetailsItemWrapper}>
    <View style={styles.jobDetailsItemLabelBlock}><Text style={styles.jobDetailsItemLabel}>{label}</Text></View>
    {children}
    <Image source={Images.dashedBorder} style={{width: '100%', height: 1, marginTop: 20}} resizeMode={'cover'} />
  </View>
)

const JobDetails = ({post}) => (
  <View style={styles.jobDetailsContainer}>
    <Text style={styles.jobDetailsItemValue}>{`${I18n.t('translation.category')}: ${post.category.title}` }</Text>
    <JobDetailsItem label={I18n.t('translation.workPeriod')}>
      <View style={styles.jobDetailsItemInner}>
        <Text style={styles.jobDetailsItemValue}>
          {`${post.work_period_from} - ${post.work_period_to}`}
        </Text>
      </View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('translation.regionFrom')}>
      <View style={styles.jobDetailsItemInner}>
        <Text style={styles.jobDetailsItemValue}>
          {(post && post.region_from && post.region_from.title) ? post.region_from.title : ''}
        </Text>
      </View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('translation.area')}>
      <View style={styles.jobDetailsItemInner}>
        <Text style={styles.jobDetailsItemValue}>
          {(post && post.location_from && post.location_from.title) ? post.location_from.title : ''}
        </Text>
      </View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('translation.addressFrom')}>
      <View style={styles.jobDetailsItemInner}>
        <Text style={styles.jobDetailsItemValue}>
          {(post && post.address_from) ? post.address_from : ''}
        </Text>
      </View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('translation.regionTo')}>
      <View style={styles.jobDetailsItemInner}><Text style={styles.jobDetailsItemValue}>
        {(post && post.region_to && post.region_to.title) ? post.region_to.title : ''}
      </Text></View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('translation.areaTo')}>
      <View style={styles.jobDetailsItemInner}>
        <Text style={styles.jobDetailsItemValue}>
          {(post && post.location_to && post.location_to.title) ? post.location_to.title : ''}
        </Text>
      </View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('translation.projectType')}>
      <View style={styles.jobDetailsItemInner}>
        <Text style={styles.jobDetailsItemValue}>
          {(post && post.service && post.service.title) ? post.service.title : ''}
        </Text>
      </View>
    </JobDetailsItem>

    {/*<JobDetailsItem label={I18n.t('JOB_DETAILS.PROJECT_TYPE')}>*/}
      {/*<View style={styles.jobDetailsItemInner}>*/}
        {/*/!*source={{uri: AppConfig.baseUrl + post.category.icon_path}}*!/*/}
        {/*<Image source={{uri: post && post.category && post.category.icon_path ? (AppConfig.baseUrl + post.category.icon_path) : Images.jobDetailsImage}} resizeMode={'contain'} style={{height: 200, width: '100%'}} />*/}
      {/*</View>*/}
      {/*/!*<Image source={Images.jobDetailsImage} resizeMode={'cover'} style={{height: 200, width: '100%'}} />*!/*/}

    {/*</JobDetailsItem>*/}
    <View style={{alignItems: 'center'}}>
      <FormButton justifyContent={'space-around'} style={styles.jobDetailsCallBtn} textStyle={styles.jobDetailsCallBtnText} icon={Images.callIcon}>
        {I18n.t('translation.callNow')}
      </FormButton>
      <FormButton justifyContent={'space-around'} style={styles.jobDetailsShareButton} textStyle={styles.jobDetailsCallBtnText} icon={Images.shareIcon}>
        {I18n.t('translation.share')}
      </FormButton>
    </View>
  </View>
)

export default JobDetails
