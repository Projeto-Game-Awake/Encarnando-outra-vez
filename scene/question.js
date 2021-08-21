class question extends Phaser.Scene {
  constructor() {
    super("question");
  }
  init(data) {
    this.player = data.player;
  }
  create() {
    const event = "question_ended";

    let cardGame = new CardGame(this, 0, 0, 0.6, "fundoCarta", 1, 0, event);

    const scene = this;
    eventManager.subscribe(event, (data) => {
      console.log(`"anEvent", was published with this data: `);
      scene.selectCard();
    });
  }

  selectCard() {
    this.scene.resume("main");
    this.scene.stop();
    scene.board.nextPlayer();
  }
}
