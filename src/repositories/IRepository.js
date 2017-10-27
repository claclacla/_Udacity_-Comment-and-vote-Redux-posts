class IRepository {
  constructor() {
    if (this.get === undefined) {
      throw new Error("Must override .get() method");
    }
  }
}

export default IRepository