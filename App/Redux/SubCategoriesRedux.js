import { normalize, schema } from 'normalizr'
import { fetchSubCategories } from '../Services/Api'

export const SUB_CATEGORIES_LIST_SUCCESS = 'jobjy/subCategories/SUB_CATEGORIES_LIST_SUCCESS';

export const subCategoriesListSuccess = (list) => ({type: SUB_CATEGORIES_LIST_SUCCESS, list});

export const getSubCategoriesList = (id) => fetchSubCategories(id).then((response) => {
  console.log(response);
  if (response.ok) {
    return response.data.data.subcategories;
  } else {
    return null;
  }
});
