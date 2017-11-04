import CommentsRESTRepository from '../repositories/REST/CommentsRESTRepository';

var commentsRESTRepository = new CommentsRESTRepository();

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";

export function getComments({ postId, comments }) {
  return {
    type: GET_COMMENTS,
    postId,
    comments
  }
}

export function addComment({ postId, comment }) {
  return {
    type: ADD_COMMENT,
    comment
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