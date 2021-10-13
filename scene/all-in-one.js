class all_in_one extends question {
  constructor() {
    super("all-in-one");
  }
  getItems(json) {
    return json[2].choice.concat(json[0].mini_game).concat(json[1].question);
  }
}
