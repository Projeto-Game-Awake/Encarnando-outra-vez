class Board {
  // Construtor
  constructor(obj) {
    if (obj == undefined) {
      obj = {};
    }
    this.rows = obj.rows != undefined ? obj.rows : 5;
    this.columns = obj.columns != undefined ? obj.columns : 2;
    this.items = obj.items != undefined ? obj.items : [0, 1, 2, 3, 4];
    this.x = obj.x;
    this.y = obj.y;
    this.direction = [];
    this.path = [];
    this.players = [];
    this.currentPlayerIndex = 0;
    for (let i = 0; i < gameOptions.players; i++) {
      this.players[i] = new Player(i, this.y);
    }

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
    this.position = 0;
    this.x = 0;
    this.y = 0;
    this.colors = [0x0000ff, 0xffff00, 0xff0000, 0xffffff];
  }
  addLine(count, direction) {
    let current = this.direction[direction];
    if (this.path.length > 0) {
      this.path[this.path.length - 1].direction = direction;
    }
    for (let i = 0; i < count; i++) {
      this.x += current.x;
      this.y += current.y;
      this.drawPlace(this.x, this.y, direction);
    }
  }
  generateType() {
    return Phaser.Math.Between(0, 3);
  }
  getTileType(player) {
    return this.path[player.pos + 1].type;
  }
  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
  nextPlayer() {
    console.log("deu next");
    this.currentPlayerIndex++;
    this.currentPlayerIndex = this.currentPlayerIndex % gameOptions.players;
  }
  drawPlace(j, i, direction) {
    let x = gameOptions.tileSize * j;
    let y = gameOptions.tileSize * i;
    let type = this.generateType();
    let container = scene.add.container(0, 0);
    this.path.push({
      container,
      type,
      direction,
    });
    let logo = scene.add.rectangle(x + 30, y + 30, 62, 62, this.colors[type]);

    container.add([logo]);
  }
  start() {
    this.option = -1;
    this.well = new Wheel(scene, 0, 0);
  }
}
