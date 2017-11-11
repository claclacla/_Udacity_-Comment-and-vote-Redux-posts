import PostsRESTRepository from '../repositories/REST/PostsRESTRepository';

var postsRESTRepository = new PostsRESTRepository();

export const GET_POSTS = "GET_POSTS";
export const SET_POST = "SET_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const VOTE_POST = "VOTE_POST";

export function getPosts({ posts }) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function updatePostVote(id, vote) {
  return {
    type: VOTE_POST,
    id, 
    vote
  }
}

export function getAsyncPosts() {
  return function (dispatch) {
    postsRESTRepository.get().then(posts => {
      dispatch(getPosts({ posts }));
    });
  }
}

export function addAsyncPost(post) {
  return function (dispatch) {
    postsRESTRepository.add(post).then((resPost) => {
      dispatch(setPost(resPost));
    })
  }
}

export function updateAsyncPost(post) {
  return function (dispatch) {
    postsRESTRepository.update(post.id, post).then((resPost) => {
      dispatch(updatePost(resPost));
    })
  }
}

export function getAsyncPost(id) {
  return function (dispatch) {
    postsRESTRepository.getById(id).then((post) => {
      dispatch(setPost(post));
    })
  }
}

export function deleteAsyncPost(id) {
  return function (dispatch) {
    postsRESTRepository.remove(id).then(() => {
      dispatch(deletePost(id));
    })
  }
}

export function updateAsyncPostVote(id, vote) {
  return function (dispatch) {
    postsRESTRepository.vote(id, {option: vote}).then(() => {
      dispatch(updatePostVote(id, vote));
    })
  }
}