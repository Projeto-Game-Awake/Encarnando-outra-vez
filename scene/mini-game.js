class mini_game extends question {
  constructor() {
    super("mini-game");
  }
  init(data) {
    this.player = data.player;
    this.type = 0;
  }
  getItems(json) {
    return json[0].mini_game;
  }
}
