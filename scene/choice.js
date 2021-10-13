class choice extends question {
  constructor() {
    super("choice");
  }
  getItems(json) {
    return json[2].choice;
  }
}
