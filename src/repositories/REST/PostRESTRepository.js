import IRESTRepository from './IRESTRepository';

class PostRESTRepository extends IRESTRepository {
  get() {
    return fetch(`${this.address}/posts`, { headers: this.headers })
      .then(res => res.json());
  }
}

export default PostRESTRepository