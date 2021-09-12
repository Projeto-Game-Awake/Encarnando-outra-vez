class Player {
  constructor(x, y, index) {
    this.x = x;
    this.y = y - gameOptions.tileHeightHalf * 2;

    console.log("INIT", this.x, this.y);
    this.pos = -1;
    let sprite = scene.add.sprite(this.x, this.y, "animals_3d", index % 5);

    sprite.setScale(2, 2);

    sprite.setOrigin(0.5, 0.5);
    this.sprite = sprite;
    this.death = Phaser.Math.Between(20, 120);
    this.age = Phaser.Math.Between(0, 20);
    console.log("Idade", this.age);
    console.log("Morte", this.death);

    eventManager.subscribe("player_walk", (data) => {
      console.log(`"WALK", was published with this data: `);
    });
  }

  convertMove(x, y) {
    return coordinate.twoDToIso(x, y);
  }

  doMove() {
    let direction = scene.board.path[++this.pos].direction;
    let current = scene.board.direction[direction];

    console.log("DIRECTION", direction);
    console.log("CURRENT", current);

    let move = this.convertMove(current.x, current.y);

    console.log("MOVE", move);

    console.log("ANTES", this.x, this.y);

    this.x += move.x;
    this.y += move.y;

    console.log("DEPOIS", this.x, this.y);
  }
}
