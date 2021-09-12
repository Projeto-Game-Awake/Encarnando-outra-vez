var width = screen.width;
var height = screen.height;
var scene;

var gameOptions = {
  tileSize: 32,
  tileWidthHalf: 40,
  tileHeightHalf: 24,
};

var eventManager = new EventManager();
var coordinate = new Coordinate();

window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scaleMode: Phaser.Scale.ScaleModes.FIT,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "Memorizando-e-aprendendo",
      width: width,
      height: height,
    },
    dom: {
      createContainer: true,
    },
    scene: [start, gameplay, question, choice, mini_game, all_in_one, death],
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
};

let url = new URL(window.location.href);
const jogo = url.searchParams.get("jogo");
