class all_in_one extends Phaser.Scene {
  constructor() {
    super("all-in-one");

    this.items = [];
  }
  init(data) {
    this.player = data.player;
  }
  create() {
    const scene = this;
    const event = "all_in_one_ended";
    let cardGame = new CardGame(this, 0, 0, 0.6, "fundoCarta2", 3, 2, event);

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
