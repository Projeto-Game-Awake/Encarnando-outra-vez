class Player extends Phaser.GameObjects.Container {
  constructor(parent, x, y, index) {
    let sprite = new Phaser.GameObjects.Sprite(
      parent,
      0,
      0,
      "animals_3d",
      index % 5
    );

    super(parent, x, y, [sprite]);

    this.index = index % 5;
    this.parent = parent;
    this.x = x;
    this.y = y - gameOptions.tileHeightHalf * 2;
    this.points = 0;
    
    this.pos = -1;

    sprite.setOrigin(0.5, 0.5);
    this.sprite = sprite;
    this.death = Phaser.Math.Between(20, 120);
    this.age = Phaser.Math.Between(0, 20);

    eventManager.subscribe("player_walk", (data) => {});

    parent.add.existing(this);
  }

  convertPosition(x, y) {
    return coordinate.twoDToIso(x, y);
  }

  gotoPosition(timeLine, x, y, callback) {
    timeLine.add({
      targets: this,
      x: x,
      y: y,
      duration: 300,
      callback: function () {
        if (callback) {
          callback();
        }
      },
    });
  }
  getInitialPosition() {
    const zeroPos = {
      x: coordinate.initX,
      y: coordinate.initY,
    };

    const deltaY = this.convertPosition(0, 1);

    return {
      x: zeroPos.x + deltaY.x,
      y: zeroPos.y + deltaY.y,
    };
  }

  doPath(distance) {
    let path = this.parent.board.path;
    let player = this;

    let timeLine = this.parent.tweens.createTimeline();

    let current = 0;

    let gotoX = this.x;
    let gotoY = this.y;

    if (this.pos == -1 && distance > 0) {
      const initPosition = this.getInitialPosition();

      gotoX = initPosition.x;
      gotoY = initPosition.y;

      this.gotoPosition(timeLine, gotoX, gotoY, function () {});
      timeLine.play();
    }

    timeLine = this.parent.tweens.createTimeline();

    while (current < distance) {
      let direction = path[++this.pos].direction;
      let deltaMove = this.parent.board.direction[direction];

      let move = this.convertPosition(deltaMove.x, deltaMove.y);

      gotoX += move.x;
      gotoY += move.y;

      this.gotoPosition(timeLine, gotoX, gotoY, function () {});
      current++;
    }

    timeLine.add({
      targets: player,
      duration: 300,
      callbackScope: this,
      callback: () => {
        this.parent.scene.pause();
        if (hasDeath && player.death == player.age) {
          this.parent.scene.run("death", {
            player: player,
          });
        } else {
          let sceneName = this.parent.tileScene[this.parent.board.getTileType(player)];
          if(this.parent.scene.isSleeping(sceneName)) {
            this.parent.scene.restart();
          } else {
            this.parent.scene.run(sceneName, {
              player: player,
            }); 
          }
        }
      },
    });
    timeLine.play();
  }
}
