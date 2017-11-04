import CategoriesRESTRepository from '../repositories/REST/CategoriesRESTRepository';

var categoriesRESTRepository = new CategoriesRESTRepository();

export const GET_CATEGORIES = "GET_CATEGORIES";

export function getCategories({ categories }) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getAsyncCategories() {
  return function (dispatch) {
    categoriesRESTRepository.get().then(categories => {
      dispatch(getCategories({ categories }));
    });
  }
}