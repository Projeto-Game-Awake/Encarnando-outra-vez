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
    this.deltaY = gameOptions.tileHeightHalf;
    this.y = y - this.deltaY;
    this.points = 0;

    this.pos = -1;

    sprite.setOrigin(0, 1);
    this.sprite = sprite;
    this.death = Phaser.Math.Between(20, 120);
    this.age = Phaser.Math.Between(0, 20);

    this.changeState("idle");

    this.behavior = {
      moving: this.doMove,
      stopped: this.hasStopped,
    };

    parent.add.existing(this);
  }

  convertPosition(x, y) {
    return coordinate.relativeToAbsolutePosition(x, y);
  }

  gotoPosition(x, y, callback) {
    let timeLine = this.parent.tweens.createTimeline();
    timeLine.add({
      targets: this,
      x: x,
      y: y - this.deltaY,
      scale: 1,
      duration: 300,
      onComplete: function () {
        if (callback) {
          callback();
        }
      },
    });

    this.jumpAnimation.stop();

    timeLine.play();
  }
  getInitialPosition() {
    return {
      x: 0,
      y: 1,
    };
  }

  update() {
    const behaviorMethod = this.behavior[this.state];
    if (behaviorMethod) {
      console.log("Do =>");
      behaviorMethod.call(this);
    }
  }

  startMove(path) {
    this.path = path;
    this.changeState("moving");
  }

  changeState(state) {
    console.log(`${this.state}=>${state}`);
    this.state = state;
  }

  hasDeath() {
    this.parent.scene.run("death", {
      player: player,
    });
    eventManager.puslish("player_finished");
    this.changeState("idle");
  }

  doMove() {
    let player = this;

    if (this.path.length == 0) {
      player.changeState("stopped");
    } else {
      let deltaPosition = this.path.shift().position;
      player.pos++;

      let move = this.convertPosition(deltaPosition.x, deltaPosition.y);

      this.changeState("moved");
      this.age++;

      if (this.age > this.death) {
        this.changeState("death");
      } else {
        console.log("GOTO=>", move);
        this.gotoPosition(move.x, move.y, function () {
          if (player.path.length > 0) {
            player.changeState("moving");
          } else {
            player.changeState("stopped");
          }
        });
      }
    }
  }

  activate() {
    this.jump();
  }

  desactivate() {
    if (this.jumpAnimation) this.jumpAnimation.stop();
  }

  jump() {
    this.jumpAnimation = this.parent.tweens.createTimeline();
    this.jumpAnimation.add({
      targets: this,
      scale: 1.3,
      y: this.y - 20,
      duration: 300,
      ease: "Power1",
      yoyo: true,
      loop: -1,
      delay: 10,
    });

    console.log("A");
    this.jumpAnimation.play();
  }

  hasStopped() {
    this.parent.scene.pause();
    let player = this;

    let sceneName =
      this.parent.tileScene[this.parent.board.getTileType(player)];
    if (this.parent.scene.isSleeping(sceneName)) {
      this.parent.scene.restart();
    } else {
      this.parent.scene.run(sceneName, {
        player: player,
      });
    }

    eventManager.publish("player_finished");
    this.changeState("idle");
  }
}
