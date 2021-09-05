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
    this.scene.resume("main");
    this.scene.stop();

    eventManager.publish("player_dead");
  }
}
