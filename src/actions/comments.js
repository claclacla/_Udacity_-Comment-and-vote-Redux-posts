import CommentsRESTRepository from '../repositories/REST/CommentsRESTRepository';

var commentsRESTRepository = new CommentsRESTRepository();

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export function getComments({ postId, comments }) {
  return {
    type: GET_COMMENTS,
    postId,
    comments
  }
}

export function addComment({ comment }) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function updateComment({ comment }) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function deleteComment({ postId, id }) {
  return {
    type: DELETE_COMMENT,
    postId,
    id
  }
}

export function getAsyncComments(postId) {
  return function (dispatch) {
    commentsRESTRepository.get(postId).then(comments => {
      dispatch(getComments({ postId, comments }));
    });
  }
}

export function addAsyncComment(comment) {
  return function (dispatch) {
    commentsRESTRepository.add(comment).then(comment => {
      dispatch(addComment({ comment }));
    });
  }
}

export function updateAsyncComment(comment) {
  return function (dispatch) {
    commentsRESTRepository.update(comment.id, comment).then(comment => {
      dispatch(updateComment({ comment }));
    });
  }
}

export function deleteAsyncComment(postId, id) {
  return function (dispatch) {
    commentsRESTRepository.remove(id).then((res) => {
      dispatch(deleteComment({ postId, id }));
    });
  }
}