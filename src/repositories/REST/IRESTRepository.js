import IRepository from '../IRepository';

class IRESTRepository extends IRepository {
  constructor() {
    super();
    
    let token = "A-Valid-Token";

    this.address = "http://localhost:3001";
    this.headers = {
      'Accept': 'application/json',
      'Authorization': token
    }
  }
}

export default IRESTRepository