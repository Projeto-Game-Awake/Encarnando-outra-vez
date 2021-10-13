class mini_game extends question {
  constructor() {
    super("mini-game");
  }
  getItems(json) {
    return json[0].mini_game;
  }
}
