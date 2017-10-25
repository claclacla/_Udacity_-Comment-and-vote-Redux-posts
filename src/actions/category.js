import CategoryRESTRepository from '../repositories/REST/CategoryRESTRepository';

export const GET_CATEGORIES = "GET_CATEGORIES";

export function getCategories({ categories }) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function getAsyncCategories() {
  return function (dispatch) {
    var categoryRESTRepository = new CategoryRESTRepository();
    categoryRESTRepository.get().then(categories => {
      dispatch(getCategories({ categories }));
    });
  }
}