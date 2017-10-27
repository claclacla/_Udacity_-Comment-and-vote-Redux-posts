import PostRESTRepository from '../repositories/REST/PostRESTRepository';

export const GET_POSTS = "GET_POSTS";

export function getPosts({ posts }) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function getAsyncPosts() {
  return function (dispatch) {
    var postRESTRepository = new PostRESTRepository();
    postRESTRepository.get().then(posts => {
      dispatch(getPosts({ posts }));
    });
  }
}