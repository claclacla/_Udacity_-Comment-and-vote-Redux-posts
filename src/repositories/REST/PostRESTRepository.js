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
}

export default PostRESTRepository