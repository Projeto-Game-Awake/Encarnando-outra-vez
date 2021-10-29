class mini_game extends question {
  constructor() {
    super("mini-game");
  }
  init(data) {
    this.player = data.player;
    this.type = 0;
  }
  getItems(json) {
    return this.getShared() || json.mini_game.actions;
  }
  getSpriteName() {
    return "fundoCarta2";
  }
  getSpriteFront() {
    return 0;
  }
  getSpriteBack() {
    return 1;
  }
}
