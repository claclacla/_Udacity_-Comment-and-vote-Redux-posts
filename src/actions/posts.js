import PostRESTRepository from '../repositories/REST/PostRESTRepository';

var postRESTRepository = new PostRESTRepository();

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const GET_POST = "GET_POST";
export const DELETE_POST = "DELETE_POST";

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

export function getPost(post) {
  return {
    type: GET_POST,
    post
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
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

export function getAsyncPost(id) {
  return function (dispatch) {
    postRESTRepository.getById(id).then((post) => {
      dispatch(getPost(post));
    })
  }
}

export function deleteAsyncPost(id) {
  return function (dispatch) {
    postRESTRepository.remove(id).then(() => {
      dispatch(deletePost(id));
    })
  }
}