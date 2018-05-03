import { normalize, schema } from 'normalizr'
import { fetchCategories, fetchCities, fetchInterests, fetchLanguages, fetchRegions } from '../Services/Api'
import {
  categoriesListSuccess, citiesListSuccess, getCitiesList, getRegionsList, getLanguagesList, interestsListSuccess, languagesListSuccess,
  regionsListSuccess,
} from './SettingsRedux'
import httpClient from '../Services/Http'
import { getCurrentUser } from './UserRedux'

const subcategory = new schema.Entity('subcategories', {},
  {
    processStrategy: (value, parent, key) => {
      return {...value, category: parent.id}
    },
  })
const category = new schema.Entity('categories', {subcategories: [subcategory]})

const interest = new schema.Entity('interests')
export const startup = () => async (dispatch) => {
  httpClient.getToken().then(token => {
    if (token) {
      dispatch(getCurrentUser())
    }
  })
  try {
    const [categoriesResponse, interestsResponse, languagesResponse] = await Promise.all([
      fetchCategories(),
      fetchInterests(),
      fetchLanguages(),
    ])

    if (categoriesResponse.ok) {
      const normalizedCategories = normalize(categoriesResponse.data.data, [category])
      dispatch(categoriesListSuccess(normalizedCategories.entities, normalizedCategories.result))
    }
    if (interestsResponse.ok) {
      const normalizedInterests = normalize(interestsResponse.data.data, [interest])
      dispatch(interestsListSuccess(normalizedInterests.entities, normalizedInterests.result))
    }
    if (languagesResponse.ok) {
      dispatch(languagesListSuccess(languagesResponse.data.data))
    }
    dispatch(getCitiesList())
    dispatch(getRegionsList())
    dispatch(getLanguagesList())

  } catch (e) {
    console.log('e')
    console.log(e)
  }
}
