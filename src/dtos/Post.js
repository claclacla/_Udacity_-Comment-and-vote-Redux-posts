import IDTO from './IDTO';

class Post extends IDTO {
  constructor(title) {
    super();

    this.timestamp = Date.now();
    this.title = title;
  }
}

export default Post