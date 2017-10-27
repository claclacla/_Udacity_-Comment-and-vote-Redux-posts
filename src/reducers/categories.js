import { GET_CATEGORIES } from '../actions/categories';

function categories(state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, action.categories.reduce(function(hash, category) { 
        hash[category.name] = category; 
        return hash; 
      }, {}));
    default:
      return state;
  }
}

export default categories