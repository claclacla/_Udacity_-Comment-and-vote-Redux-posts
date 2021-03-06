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
      .then(res => res.json());
  }

  update(id, comment) {
    return fetch(`${this.address}/comments/` + id, {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then(res => res.json());
  }

  remove(id) {
    return fetch(`${this.address}/comments/` + id, {
      method: 'DELETE',
      headers: this.headers
    }).then(res => res.json());
  }

  vote(id, vote) {
    return fetch(`${this.address}/comments/` + id, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vote)
    })
      .then(res => res.json());
  }
}

export default CommentsRESTRepository