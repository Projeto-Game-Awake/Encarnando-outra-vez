class choice extends question {
  constructor() {
    super("choice");
  }
  init(data) {
    this.player = data.player;
    this.type = 2;
  }
  getItems(json) {   
    return this.getShared() || json.choice.actions;
  }
  getSpriteName() {
    return "fundoCarta";
  }
  getSpriteFront() {
    return 2;
  }
  getSpriteBack() {
    return 3;
  }
}
