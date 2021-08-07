class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.pos = -1;
        let sprite = scene.add.sprite(gameOptions.tileSize*x,0,"animals",x%5);
        sprite.setOrigin(0,0);
        this.sprite = sprite;
    }
    doMove() {
        let direction = scene.board.path[++this.pos].direction;
        let current = scene.board.direction[direction];
        this.x += current.x;
        this.y += current.y;   
    }
}