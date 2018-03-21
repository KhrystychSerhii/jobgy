import indexOf from 'lodash/indexOf'
import without from 'lodash/without'
import { I18nManager } from 'react-native'

export const createGroupedArray = (arr, chunkSize) => {
  const groups = []
  let i
  for (i = 0; i < arr.length; i += chunkSize) {
    groups.push(arr.slice(i, i + chunkSize))
  }
  return groups
}

export function toggleItemInArray (collection, item) {
  const index = indexOf(collection, item)
  if (index !== -1) {
    return without(collection, item)
  }
  return [...collection, item]
}

export function getFormattedDate (date) {
  var year = date.getFullYear()

  var month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  var day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  return month + '/' + day + '/' + year
}

export const isRtl = () => I18nManager.isRTL
export const rightProp = () => isRtl() ? 'right' : 'left';
export const leftProp = () => isRtl() ? 'left' : 'right'
