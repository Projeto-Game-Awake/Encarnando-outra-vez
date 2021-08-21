class death extends Phaser.Scene {
  constructor() {
    super("death");
  }
  init(data) {
    this.player = data.player;
  }
  create() {
    alert("Jogador desencarnou com " + this.player.age);
    this.selectCard();
  }
  selectCard() {
    console.log("------CLICOU---");
    this.scene.resume("main");
    this.scene.stop();
    scene.board.nextPlayer();
  }
}
