class gameplay extends Phaser.Scene {
  constructor() {
    super("main");
  }
  preload() {
    this.load.spritesheet("logo", "static/sprites/logo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("animals", "static/sprites/animals.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("animals_3d", "static/sprites/animals-3D.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("fundoCarta", "static/sprites/fundoCarta.png", {
      frameWidth: 240,
      frameHeight: 338,
    });
    this.load.spritesheet("fundoCarta2", "static/sprites/fundoCarta2.png", {
      frameWidth: 240,
      frameHeight: 338,
    });

    this.load.atlas(
      "isoblocks",
      "static/atlas/isoblocks.png",
      "static/atlas/isoblocks.json"
    );

    this.objects = {};
  }
  create() {
    scene = this;
    let json = this.cache.json.get("jogo");

    var frames = this.textures.get("isoblocks").getFrameNames();

    this.tileScene = ["question", "choice", "mini-game", "all-in-one"];
    this.board = new Board(scene, {
      items: [0, 1, 2, 3, 4],
      x: 0,
      y: 1,
    });

    this.well = new Wheel(scene, 1100, 300);

    this.objects.camera = this.cameras.add(0, 0, width, height);
    this.objects.camera.setBackgroundColor("rgba(255, 255, 255, 0.5)");

    this.board.generateField();
    this.drawField();

    this.board.start();

    let gameplay = this;

    eventManager.subscribe("wheel_finished", (data) => {
      console.log(
        `"anEvent", was published with this data: ${JSON.stringify(data)}`
      );
      gameplay.doPlayerMove(data);
    });
  }
  update(time, delta) {}
  doPlayerMove(data) {
    let value = data.distance;
    let player = this.board.getCurrentPlayer();

    player.age += value;
    if (player.age > player.death) {
      value -= player.age - player.death;
      player.age = player.death;
    }

    player.doPath(value);
  }
  drawField() {
    this.poolArray = [];

    this.board.addLine(4, Direction.DOWN);
    this.board.addLine(6, Direction.RIGHT);
    this.board.addLine(3, Direction.DOWN);
    this.board.addLine(5, Direction.RIGHT);
    this.board.addLine(5, Direction.DOWN);
    this.board.addLine(3, Direction.RIGHT);
    this.board.addLine(8, Direction.UP);
    this.board.addLine(4, Direction.LEFT);
    this.board.addLine(4, Direction.UP);

    this.board.drawBoard();

    for (let i = 0; i < gameOptions.players; i++) {
      scene.children.bringToTop(scene.board.players[i]);
    }
  }
}
