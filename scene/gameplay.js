class gameplay extends Phaser.Scene{
    constructor(){
        super("main");
    }
    preload(){
        this.load.spritesheet("logo", "static/sprites/logo.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("animals", "static/sprites/animals.png", {
            frameWidth: 64,
            frameHeight: 64
        });
        this.load.spritesheet("fundoCarta", "static/sprites/fundoCarta.png", {
            frameWidth: 240,
            frameHeight: 338
        });
        this.load.spritesheet("fundoCarta2", "static/sprites/fundoCarta2.png", {
            frameWidth: 240,
            frameHeight: 338
        });
        this.objects = {};
    }
    create(){
        scene = this;
        this.tileScene = [
            "question",
            "choice",
            "mini-game",
            "all-in-one",
        ]
        this.board = new Board({
            items : [0,1,2,3,4],
            x: 0,
            y: 1
        });

        this.objects.camera = this.cameras.add(0, 0, width, height);
        this.objects.camera.setBackgroundColor('rgba(255, 255, 255, 0.5)');

        this.board.generateField();
        this.drawField();
        this.board.start();
    }
    update(time,delta) {
    }
    doPlayerMove() {
        let value = this.board.option;
        this.board.option = -1;
        let current = 0;
        let timeLine = this.tweens.createTimeline();
        let player = this.board.getCurrentPlayer();

        player.age += value;
        if(player.age > player.death) {
            value -= player.age - player.death;
            player.age = player.death;
        }

        if(player.pos == -1 && value > 0) {
            player.x = 0;
            timeLine.add({
                targets: player.sprite,
                x:player.x,
                y:gameOptions.tileSize,
                duration: 300
            });
            current++;
        }
        while(current < value) {
            player.doMove();
   
            timeLine.add({
                targets: player.sprite,
                x:gameOptions.tileSize*player.x,
                y:gameOptions.tileSize*player.y,
                duration: 300
            });
            
            current++;             
        }
        timeLine.add({
            targets: player.sprite,
            duration: 300,
            callbackScope: this,
            callback: function() {
                scene.scene.pause();
                if(player.death == player.age) {
                    scene.scene.run("death", {
                        player: player
                    });
                } else {
                    scene.scene.run(scene.tileScene[scene.board.getTileType(player)], {
                        player: player
                    });
                }
            }
        });
        timeLine.play();
    }
    drawField(){
        this.poolArray = [];
        
        this.board.addLine(4,Direction.DOWN);
        this.board.addLine(6,Direction.RIGHT);
        this.board.addLine(3,Direction.DOWN);
        this.board.addLine(5,Direction.LEFT);
        this.board.addLine(5,Direction.DOWN);
        this.board.addLine(3,Direction.RIGHT);
        this.board.addLine(3,Direction.UP);
        this.board.addLine(8,Direction.RIGHT);
        this.board.addLine(5,Direction.DOWN);

        for(let i=0;i<gameOptions.players;i++) {
            scene.children.bringToTop(scene.board.players[i].sprite);
        }
    }
}