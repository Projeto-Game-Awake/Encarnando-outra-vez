class mini_game extends Phaser.Scene {
  constructor() {
    super("mini-game");
  }
  init(data) {
    this.player = data.player;
  }
  create() {
    const event = "mini_game_ended";
    let cardGame = new CardGame(this, 0, 0, 0.6, "fundoCarta2", 1, 0, event);

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
