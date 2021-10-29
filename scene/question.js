class question extends Phaser.Scene {
  constructor(name = null) {
    if(name == null) {
      super("question");
    } else {
      super(name);
    }
  }
  init(data) {
    this.player = data.player;
    this.type = 1;
  }
  create() {
    this.scale.mode = Phaser.Scale.NONE;
    const event = "question_ended";

    this.isSelected = false;

    let json = this.cache.json.get("jogo");
    this.items = this.getItems(json);

    this.cardGame = new CardGame(
      this,
      0,
      0,
      0.6,
      this.getSpriteName(),
      this.getSpriteFront(),
      this.getSpriteBack(),
      event,
      this.items,
      this.type
    );

    eventManager.remove(event);

    eventManager.subscribe(event, (data) => {
      this.selectCard();
    });
  }
  getItems(json) {
    return this.getShared() || json.question.actions;
  }
  getShared() {
    if(json.shared) {
      return json.choice.actions.concat(json.mini_game.actions).concat(json.question.actions).concat(json.all_in_one.actions);
    } else {
      return null;
    }
  }
  getName() {
    return this.constructor.name;
  }
  getSpriteName() {
    return "fundoCarta";
  }
  getSpriteFront() {
    return 0;
  }
  getSpriteBack() {
    return 1;
  }
  selectCard() {
    this.scene.resume("main");
    this.cardGame.clear();
    this.scene.stop();
  }
}
