import { GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from '../actions/comments';

function comments(state = {}, action) {
  let postComments = null;

  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign({}, state, {
        [action.postId]: action.comments
      });
    case ADD_COMMENT:
      postComments = [];

      if (state[action.comment.parentId] !== undefined) {
        postComments = state[action.comment.parentId];
      }

      return Object.assign({}, state, {
        [action.comment.parentId]: postComments.concat(action.comment)
      });
    case DELETE_COMMENT:
      postComments = state[action.postId];
      postComments = postComments.filter(comment => comment.id !== action.id);

      return Object.assign({}, state, {
        [action.postId]: postComments
      });
    default:
      return state;
  }
}

export default comments