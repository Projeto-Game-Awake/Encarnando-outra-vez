class choice extends question {
  constructor() {
    super("choice");
  }
  init(data) {
    this.player = data.player;
    this.type = 2;
  }
  getItems(json) {   
    return json[2].choice;
  }
}
