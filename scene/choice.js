class choice extends Phaser.Scene {
  constructor() {
    super("choice");
  }
  init(data) {
    this.player = data.player;
  }
  create() {
    const event = "choice_ended";
    let cardGame = new CardGame(this, 0, 0, 0.6, "fundoCarta", 3, 2, event);

    const scene = this;
    eventManager.subscribe(event, (data) => {
      console.log(`"anEvent", was published with this data: `);
      scene.selectCard();
    });
  }
  selectCard() {
    console.log("------CLICOU---");
    this.scene.resume("main");
    this.scene.stop();
    scene.board.nextPlayer();
  }
}
