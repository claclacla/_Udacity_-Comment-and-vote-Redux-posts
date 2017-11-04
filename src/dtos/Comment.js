import IDTO from './IDTO';

class Comment extends IDTO {
  constructor(author, body, parentId) {
    super();

    this.timestamp = Date.now();
    this.author = author;
    this.body = body;
    this.parentId = parentId;
  }
}

export default Comment