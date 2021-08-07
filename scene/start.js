class start extends Phaser.Scene{
    constructor(){
        super("start");
    }
    preload(){
        this.load.html('start', 'html/start.html');
        this.objects = {};
    }
    create(){
        scene = this;

        var element = this.add.dom(width / 2, 0).createFromCache('start');
    
        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'playButton')
            {
                var inputText = this.getChildByName('txtPlayers');

                //  Have they entered anything?
                if (inputText.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Hide the login element
                    this.setVisible(false);

                    gameOptions.players = parseInt(inputText.value);

                    scene.scene.transition({ target: 'main', duration: 1 });
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({
                        targets: text,
                        alpha: 0.2,
                        duration: 250,
                        ease: 'Power3',
                        yoyo: true
                    });
                }
            }
        });
        this.tweens.add({
            targets: element,
            y: 400,
            duration: 500,
            ease: 'Power3'
        });
        /*this.time.addEvent({
          delay: 2000,
          loop: false,
          callback: () => {
              this.scene.transition({ target: 'Memorizando-e-aprendendo', duration: 1 });
          }
        });*/
    }
}
 