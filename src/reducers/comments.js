import { GET_COMMENTS, ADD_COMMENT } from '../actions/comments';

function comments(state = {}, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign({}, state, {
        [action.postId]: action.comments
      });
    case ADD_COMMENT:
      let postComments = [];

      if(state[action.comment.parentId] !== undefined) {
        postComments = state[action.comment.parentId];
      }

      return Object.assign({}, state, {
        [action.comment.parentId]: postComments.concat(action.comment)
      });
    default:
      return state;
  }
}

export default comments