class all_in_one extends question {
  constructor() {
    super("all-in-one");
  }
  init(data) {
    this.player = data.player;
    this.type = 3;
  }
  getItems(json) {
    return json.choice.concat(json.mini_game).concat(json.question);
  }
}
