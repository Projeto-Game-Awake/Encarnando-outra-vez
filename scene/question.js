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
    const event = "question_ended";

    let json = this.cache.json.get("jogo");
    this.items = this.getItems(json);

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

    const scene = this;
    eventManager.subscribe(event, (data) => {
      const result = data.point;
      scene.selectCard(result);
    });
  }
  getItems(json) {
    return json[1].question;
  }
  selectCard(result) {
    this.scene.resume("main");
    this.cardGame.clear();
    this.scene.stop();
  }
}
