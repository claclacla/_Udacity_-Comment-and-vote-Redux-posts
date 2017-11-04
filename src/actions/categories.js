import CategoriesRESTRepository from '../repositories/REST/CategoriesRESTRepository';

export const GET_CATEGORIES = "GET_CATEGORIES";

export function getCategories({ categories }) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getAsyncCategories() {
  return function (dispatch) {
    var categoriesRESTRepository = new CategoriesRESTRepository();
    categoriesRESTRepository.get().then(categories => {
      dispatch(getCategories({ categories }));
    });
  }
}