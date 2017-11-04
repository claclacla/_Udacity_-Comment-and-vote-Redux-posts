import IRESTRepository from './IRESTRepository';

class CommentsRESTRepository extends IRESTRepository {
  get(postId) {
    return fetch(`${this.address}/posts/` + postId + `/comments`, { headers: this.headers })
      .then(res => res.json())
      .then(comments => comments);
  }

  add(comment) {
    return fetch(`${this.address}/comments`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then(res => { console.log(res); return res.json() });
  }
}

export default CommentsRESTRepository