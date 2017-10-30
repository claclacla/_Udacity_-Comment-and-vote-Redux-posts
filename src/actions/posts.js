import PostRESTRepository from '../repositories/REST/PostRESTRepository';

var postRESTRepository = new PostRESTRepository();

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";

export function getPosts({ posts }) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function getAsyncPosts() {
  return function (dispatch) {
    postRESTRepository.get().then(posts => {
      dispatch(getPosts({ posts }));
    });
  }
}

export function addAsyncPost(post) {
  return function (dispatch) {
    postRESTRepository.add(post).then((resPost) => {
      dispatch(addPost(resPost));
    })
  }
}