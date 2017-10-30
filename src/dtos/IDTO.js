import UID from '../lib/uid/UID';

class IDTO {
  constructor() {
    this.id = UID.create();
  }
}

export default IDTO