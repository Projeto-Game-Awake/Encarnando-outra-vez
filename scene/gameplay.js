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
    
    this.load.image("wheel", "static/images/wheel.png");
    this.load.image("pin", "static/images/pin.png");

    this.load.atlas(
      "isoblocks",
      "static/atlas/isoblocks.png",
      "static/atlas/isoblocks.json"
    );

    this.objects = {};
  }
  create() {
    json = this.cache.json.get("jogo");

    var frames = this.textures.get("isoblocks").getFrameNames();

    this.tileScene = ["question", "choice", "mini-game", "all-in-one"];
    this.board = new Board(this, {
      items: [0, 1, 2, 3, 4],
      x: 0,
      y: 1,
    });

    this.well = new Wheel(this, 1000, 300);

    this.endButton = this.add.text(20,20,"Encerrar", {
      fontSize: 60,
      backgroundColor: "#00ff00"
    });
    this.endButton.setInteractive();
    this.endButton.on("pointerdown",this.showResult,this);

    this.objects.camera = this.cameras.add(0, 0, width, height);
    this.objects.camera.setBackgroundColor("rgba(255, 255, 255, 0.5)");

    this.board.generateField();
    this.drawField();

    this.board.start();

    let gameplay = this;

    eventManager.subscribe("wheel_finished", (data) => {
      gameplay.doPlayerMove(data);
    });
  }
  showResult() {
    this.endButton.alpha = 0;
    this.scene.launch("result", {players:this.board.getPlayers()});
  }
  update(time, delta) {}
  doPlayerMove(data) {
    let value = data.distance;
    let player = this.board.getCurrentPlayer();

    if(hasDeath) {
      player.age += value;
      if (player.age > player.death) {
        value -= player.age - player.death;
        player.age = player.death;
      }
    }

    player.doPath(value);
  }
  drawField() {
    this.poolArray = [];

    this.board.addLine(4, Direction.DOWN);
    this.board.addLine(6, Direction.RIGHT);
    this.board.addLine(3, Direction.DOWN);
    this.board.addLine(3, Direction.LEFT);
    this.board.addLine(4, Direction.DOWN);
    this.board.addLine(2, Direction.LEFT);
    this.board.addLine(2, Direction.DOWN);
    this.board.addLine(8, Direction.RIGHT);
    this.board.addLine(11, Direction.UP);
    this.board.addLine(2, Direction.RIGHT);
    this.board.addLine(5, Direction.DOWN);
    this.board.addLine(1, Direction.RIGHT);
    this.board.addLine(5, Direction.DOWN);
    this.board.addLine(2, Direction.RIGHT);

    this.board.drawBoard();

    for (let i = 0; i < gameOptions.players; i++) {
      this.children.bringToTop(this.board.players[i]);
    }
  }
}
