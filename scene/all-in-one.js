class all_in_one extends question {
  constructor() {
    super("all-in-one");
  }
  init(data) {
    this.player = data.player;
    this.type = 3;
  }
  getItems(json) {
    return json[2].choice.concat(json[0].mini_game).concat(json[1].question);
  }
}
