class choice extends Phaser.Scene{
    constructor(){
        super("choice");
    }
    create(){
        for(let i=0;i<3;i++) {
            for(let j=0;j<3;j++) {
                let sprite = this.add.sprite(200 + 240 * j, 200 + 338 * i,"fundoCarta",3);
                sprite.setOrigin(0,0)
                sprite.setInteractive();
                sprite.on("pointerdown",this.selectCard,this); 
            }
        }
    }
    selectCard() {
        this.scene.resume("gameplay");
        this.scene.remove("choice");
        scene.board.nextPlayer();
    }
}