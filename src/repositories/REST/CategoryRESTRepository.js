class CategoryRESTRepository {
  constructor() {
    let token = Math.random().toString(36).substr(-8);

    this.address = "http://localhost:3001";
    this.headers = {
      'Accept': 'application/json',
      'Authorization': token
    }
  }

  get() {
    return fetch(`${this.address}/categories`, { headers: this.headers })
      .then(res => res.json())
      .then(data => data.categories);
  }
}

export default CategoryRESTRepository