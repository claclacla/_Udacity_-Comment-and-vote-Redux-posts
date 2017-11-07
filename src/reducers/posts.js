import { UP_VOTE } from '../data';
import { GET_POSTS, ADD_POST, UPDATE_POST, GET_POST, DELETE_POST, VOTE_POST } from '../actions/posts';

function posts(state = {}, action) {
  let posts = null;

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
      posts = Object.assign({}, state);
      delete posts[action.id];

      return posts;
    case VOTE_POST:
      posts = Object.assign({}, state);

      let post = posts[action.id];
      post.voteScore += action.vote === UP_VOTE ? 1 : -1;

      return posts;
    default:
      return state;
  }
}

export default posts