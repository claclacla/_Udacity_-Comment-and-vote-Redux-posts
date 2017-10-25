import { GET_CATEGORIES } from '../actions/category';

function category(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, { categories: action.categories });
    default:
      return state;
  }
}

export default category