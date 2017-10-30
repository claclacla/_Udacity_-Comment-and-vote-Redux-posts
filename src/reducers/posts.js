import { GET_POSTS, ADD_POST } from '../actions/posts';

function posts(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return Object.assign({}, state, action.posts.reduce(function (hash, post) {
        hash[post.id] = post;
        return hash;
      }, {}));
    case ADD_POST:
      return Object.assign({}, state, {
        [action.post.id]: action.post
      });
    default:
      return state;
  }
}

export default posts