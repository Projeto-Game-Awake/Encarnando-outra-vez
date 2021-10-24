var width = window.innerWidth * window.devicePixelRatio;
var height = window.innerHeight * window.devicePixelRatio;
var scene;

var gameOptions = {
  tileSize: 32,
  tileWidthHalf: 40,
  tileHeightHalf: 24,
};

var eventManager = new EventManager();
var coordinate = new Coordinate();
var json = null;

window.onload = function () {   
  let gameConfig = {
    type: Phaser.AUTO,
    scaleMode: Phaser.Scale.ScaleModes.FIT,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "Encarnado-outra-vez",
      width: width,
      height: height,
    },
    dom: {
      createContainer: true,
    },
    scene: [start, gameplay, question, choice, mini_game, all_in_one, death, result],
  };
  game = new Phaser.Game(gameConfig);
  game.scale.resize(width, height);
  window.focus();
};

let url = new URL(window.location.href);
const jogo = url.searchParams.get("jogo");

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}