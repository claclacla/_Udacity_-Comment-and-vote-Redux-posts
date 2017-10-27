import IRESTRepository from './IRESTRepository';

class CategoryRESTRepository extends IRESTRepository {
  get() {
    return fetch(`${this.address}/categories`, { headers: this.headers })
      .then(res => res.json())
      .then(data => data.categories);
  }
}

export default CategoryRESTRepository