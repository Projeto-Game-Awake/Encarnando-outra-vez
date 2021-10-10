class question extends Phaser.Scene {
  constructor() {
    super("question");
  }
  init(data) {
    this.player = data.player;
  }
  create() {
    const event = "question_ended";

    let json = this.cache.json.get("jogo");
    this.items = json.question;
    let cardGame = new CardGame(
      this,
      0,
      0,
      0.6,
      "fundoCarta",
      1,
      0,
      event,
      this.items
    );

    const scene = this;
    eventManager.subscribe(event, (data) => {
      const result = data.result;
      scene.selectCard(result);
    });
  }
  selectCard(result) {
    this.scene.resume("main");
    this.scene.stop();
  }
}
