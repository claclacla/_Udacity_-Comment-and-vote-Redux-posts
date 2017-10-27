import { GET_POSTS } from '../actions/posts';

function posts(state = {}, action) {
  switch (action.type) {
    case GET_POSTS:
      return Object.assign({}, state, action.posts.reduce(function (hash, post) {
        hash[post.id] = post;
        return hash;
      }, {}));
    default:
      return state;
  }
}

export default posts