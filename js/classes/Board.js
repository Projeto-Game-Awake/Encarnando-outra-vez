class Board extends Phaser.GameObjects.Container {
  // Construtor
  constructor(parent, obj) {
    if (obj == undefined) {
      obj = {};
    }

    super(parent, 600, 600, []);
    this.rows = obj.rows != undefined ? obj.rows : 5;
    this.columns = obj.columns != undefined ? obj.columns : 2;
    this.items = obj.items != undefined ? obj.items : [0, 1, 2, 3, 4];
    this.x = obj.x;
    this.y = obj.y;
    this.parent = parent;
    this.mapWidth = 15;
    this.mapHeight = 15;
    this.direction = [];
    this.path = [];
    this.blocks = {};
    this.initBlockTypes();

    this.initX = 300 + (this.mapWidth / 2) * gameOptions.tileWidthHalf;
    this.initY = 100;

    this.players = [];
    this.currentPlayerIndex = 0;

    const board = this;
    eventManager.subscribe("right_answer", (data) => {
      console.log(`"Event right_answer", was published`);
    });

    eventManager.subscribe("wrong_answer", (data) => {
      console.log(`"Event wrong_answer", was published `);
      board.nextPlayer();
    });

    eventManager.subscribe("player_dead", (data) => {
      console.log(`"Event player_dead", was published `);
      board.nextPlayer();
    });

    parent.add.existing(this);
  }

  initBlockTypes() {
    for (let y = 0; y < this.mapWidth; y++) {
      this.blocks[y] = {};
      for (let x = 0; x < this.mapHeight; x++) {
        this.blocks[y][x] = 4;
      }
    }
  }

  drawBoard() {
    var tileWidthHalf = gameOptions.tileWidthHalf;

    var initX = 300 + (this.mapWidth / 2) * tileWidthHalf;
    var initY = 100;

    for (var y = 0; y < this.mapHeight; y++) {
      for (var x = 0; x < this.mapWidth; x++) {
        let deltaPos = coordinate.twoDToIso(x, y);

        var tx = deltaPos.x;
        var ty = deltaPos.y;

        let block;
        let type = this.blocks[y][x];
        block = new Block(this.parent, initX + tx, initY + ty, type);

        if (x == 0 && y == 0) {
          console.log("0,0", block.x, block.y);
        }
        if (x == 1 && y == 0) {
          console.log("1,0", block.x, block.y);
        }

        if (x == 2 && y == 0) {
          console.log("0,1", block.x, block.y);
        }

        block.setData("row", x);
        block.setData("col", y);

        block.setDepth(initY + ty);

        this.blocks[y][x] = type;

        this.add([block]);
      }
    }
  }
  // Cria o campo do jogo.
  generateField() {
    this.direction[Direction.DOWN] = {
      x: 0,
      y: 1,
    };
    this.direction[Direction.LEFT] = {
      x: -1,
      y: 0,
    };
    this.direction[Direction.RIGHT] = {
      x: 1,
      y: 0,
    };
    this.direction[Direction.UP] = {
      x: 0,
      y: -1,
    };
    this.selectedItem = -1;
    this.foundCount = 0;
    this.x = 0;
    this.y = 0;
  }
  addLine(count, direction) {
    let current = this.direction[direction];
    if (this.path.length > 0) {
      this.path[this.path.length - 1].direction = direction;
    }
    for (let i = 0; i < count; i++) {
      this.x += current.x;
      this.y += current.y;

      this.updatePlace(this.y, this.x, direction);
    }
  }
  generateType() {
    return Phaser.Math.Between(0, 3);
  }
  getTileType(player) {
    return this.path[player.pos + 1].type;
  }
  getCurrentPlayer() {
    console.log("Players", this.players);
    console.log(this.currentPlayerIndex);
    return this.players[this.currentPlayerIndex];
  }
  nextPlayer() {
    console.log("VAI DAR NEXT", this.currentPlayerIndex);
    this.currentPlayerIndex++;

    this.currentPlayerIndex = this.currentPlayerIndex % gameOptions.players;
    console.log("NEXT", this.currentPlayerIndex);
  }
  updatePlace(y, x, direction) {
    let type = this.generateType();
    this.path.push({
      type,
      direction,
    });

    this.blocks[y][x] = type;
  }
  start() {
    this.option = -1;

    for (let i = 0; i < gameOptions.players; i++) {
      console.log(
        "Player",
        this.initX + i * gameOptions.tileWidthHalf * 2,
        this.initY
      );
      this.players[i] = new Player(
        this.parent,
        this.initX + i * gameOptions.tileWidthHalf * 2,
        this.initY,
        i
      );
    }
  }
}
