class Coordinate {
  //CONVERT POINT TO ISOMETRIC
  twoDToIso(x, y) {
    var tempx = (x - y) * gameOptions.tileWidthHalf;
    var tempy = (x + y) * gameOptions.tileHeightHalf;
    return {
      x: tempx,
      y: tempy,
    };
  }
}
