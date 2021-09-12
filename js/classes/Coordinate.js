class Coordinate {
  //CONVERT POINT TO ISOMETRIC
  twoDToIso(y, x) {
    let tempx = x * gameOptions.tileWidthHalf + y * gameOptions.tileWidthHalf;
    let tempy = y * gameOptions.tileHeightHalf - x * gameOptions.tileHeightHalf;

    return {
      x: tempx,
      y: tempy,
    };
  }
}
