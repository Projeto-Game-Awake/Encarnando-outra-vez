class Coordinate {
  constructor() {
    let mapWidth = 15;
    this.initX = 300 + (mapWidth / 2) * gameOptions.tileWidthHalf;
    this.initY = 100;
  }
  //CONVERT POINT TO ISOMETRIC
  twoDToIso(x, y) {
    var tempx = (x - y) * gameOptions.tileWidthHalf;
    var tempy = (x + y) * gameOptions.tileHeightHalf;
    return {
      x: tempx,
      y: tempy,
    };
  }

  relativeToAbsolutePosition(x, y) {
    const getDeltaPos = this.twoDToIso(x, y);

    return {
      x: this.initX + getDeltaPos.x,
      y: this.initY + getDeltaPos.y,
    };
  }
}
