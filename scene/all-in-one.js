class all_in_one extends question {
  constructor() {
    super("all-in-one");
  }
  init(data) {
    this.player = data.player;
    this.type = 3;
  }
  getItems(json) {
    return this.getShared() || json.all_in_one.actions;
  }
  getSpriteName() {
    return "fundoCarta2";
  }
  getSpriteFront() {
    return 2;
  }
  getSpriteBack() {
    return 3;
  }
}
