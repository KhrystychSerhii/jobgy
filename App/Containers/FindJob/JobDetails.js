import React from 'react'
import { View, Text, Image } from 'react-native'

import Images from '../../Themes/Images'
import I18n from '../../I18n'
import styles from './styles'
import FormButton from '../../Components/FormButton/FormButton'

const JobDetailsItem = ({label, children}) => (
  <View style={styles.jobDetailsItemWrapper}>
    <View style={styles.jobDetailsItemLabelBlock}><Text style={styles.jobDetailsItemLabel}>{label}</Text></View>
    {children}
    <Image source={Images.dashedBorder} style={{width: '100%', height: 1, marginTop: 20}} resizeMode={'cover'} />
  </View>
)

const JobDetails = ({post}) => (
  <View style={styles.jobDetailsContainer}>
    <Text style={styles.jobDetailsItemValue}>{I18n.t('JOB_DETAILS.FIELD_BLOCK')}</Text>
    <JobDetailsItem label={I18n.t('JOB_DETAILS.TYPE')}>
      <View style={{flex: 1}}><Text style={styles.jobDetailsItemValue}>בלוק</Text></View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('JOB_DETAILS.COUNT')}>
      <View style={{flex: 1}}><Text style={styles.jobDetailsItemValue}>מ”ר 10</Text></View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('JOB_DETAILS.PROJECT_FEATURE')}>
      <View style={{flex: 1}}><Text style={styles.jobDetailsItemValue}>ציבורי</Text></View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('JOB_DETAILS.DUE_TIME')}>
      <View style={{flex: 1}}><Text style={styles.jobDetailsItemValue}>12.12.18-01.01.18</Text></View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('JOB_DETAILS.DESCRIPTION')}>
      <View style={{flex: 1}}><Text style={styles.jobDetailsItemValue}>עבודות בניה ושיפוצים באתר בניה
        בחסות קבלן בכיר</Text></View>
    </JobDetailsItem>
    <JobDetailsItem label={I18n.t('JOB_DETAILS.IMAGE')}>
      <View style={{flex: 1}}>
        <Image source={Images.jobDetailsImage} resizeMode={'cover'} style={{height: 200, width: '100%'}} />
      </View>
    </JobDetailsItem>
    <View style={{alignItems: 'center'}}>
      <FormButton justifyContent={'space-around'} style={styles.jobDetailsCallBtn} textStyle={styles.jobDetailsCallBtnText} icon={Images.callIcon}>
        {I18n.t('JOB_DETAILS.CALL_NOW')}
      </FormButton>
      <FormButton justifyContent={'space-around'} style={styles.jobDetailsShareButton} textStyle={styles.jobDetailsCallBtnText} icon={Images.shareIcon}>
        {I18n.t('JOB_DETAILS.SHARE')}
      </FormButton>
    </View>
  </View>
)

export default JobDetails
