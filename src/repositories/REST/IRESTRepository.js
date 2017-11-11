import IRepository from '../IRepository';

class IRESTRepository extends IRepository {
  constructor() {
    super();
    
    let token = Math.random().toString(36).substr(-8);

    this.address = "http://localhost:3001";
    this.headers = {
      'Accept': 'application/json',
      'Authorization': token
    }
  }
}

export default IRESTRepository