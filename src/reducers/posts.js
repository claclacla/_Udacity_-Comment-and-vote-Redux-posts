import { GET_POSTS, ADD_POST, UPDATE_POST, GET_POST, DELETE_POST } from '../actions/posts';

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
    case UPDATE_POST:
      return Object.assign({}, state, {
        [action.post.id]: action.post
      });
    case GET_POST:
      return Object.assign({}, state, {
        [action.post.id]: action.post
      });  
    case DELETE_POST:
      let posts = Object.assign({}, state);
      delete posts[action.id];

      return posts;  
    default:
      return state;
  }
}

export default posts