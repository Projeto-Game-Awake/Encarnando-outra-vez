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
    this.items = this.getItems(json).actions;

    this.cardGame = new CardGame(
      this,
      0,
      0,
      0.6,
      "fundoCarta",
      1,
      0,
      event,
      this.items,
      this.type
    );

    eventManager.subscribe(event, (data) => {
      const result = data.point;
      this.selectCard(result);
    });
  }
  getItems(json) {
    return json.question;
  }
  getName() {
    return "question";
  }
  selectCard(result) {
    this.scene.resume("main");
    this.cardGame.clear();
    this.scene.stop();
  }
}
