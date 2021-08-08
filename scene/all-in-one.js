class all_in_one extends Phaser.Scene{
    constructor(){
        super("all-in-one");
    }
    init(data) {
        this.player = data.player;
    }
    create(){
        for(let i=0;i<3;i++) {
            for(let j=0;j<3;j++) {
                let sprite = this.add.sprite(50 + 240 * j, 50 + 338 * i,"fundoCarta2",3);
                sprite.setOrigin(0,0);
                sprite.alpha = 0.9;
                sprite.setInteractive();
                sprite.on("pointerdown",this.selectCard,this); 
            }
        }
    }
    selectCard() {
        this.scene.resume("main");
        this.scene.stop();
        scene.board.nextPlayer();
    }
}