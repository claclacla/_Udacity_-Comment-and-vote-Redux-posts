import IRESTRepository from './IRESTRepository';

class PostRESTRepository extends IRESTRepository {
  get() {
    return fetch(`${this.address}/posts`, { headers: this.headers })
      .then(res => res.json());
  }

  add(post) {
    return fetch(`${this.address}/posts`, {
      method: 'POST',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json());
  }

  update(id, post) {
    return fetch(`${this.address}/posts/` + id, {
      method: 'PUT',
      headers: {
        ...this.headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json());
  }

  getById(id) {
    return fetch(`${this.address}/posts/` + id, { headers: this.headers }).then(res => res.json())
  }

  remove(id) {
    return fetch(`${this.address}/posts/` + id, {
      method: 'DELETE',
      headers: this.headers
    }).then(res => res.json());
  }
}

export default PostRESTRepository