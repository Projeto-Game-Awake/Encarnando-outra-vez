class result extends Phaser.Scene {
  constructor() {
    super("result");
  }
  init(data) {
    this.players = data.players;
  }
  preload() {
    
  }
  create() {
    let x = 100;
    let y = 50;
    for(let i=0;i<this.players.length;i++) {
      this.add.text(x,y,this.players[i].points, {
        color: "#000000",
      });
      let sprite = this.add.sprite(x,y+50,"animals_3d",this.players[i].index);
      sprite.setScale(2);
      x += 100;
      if(x > 500) {
        x = 100;
        y += 100;
      }
    }
  }
}
