class Wheel {
  constructor(parent, x, y) {
    //super(parent, x, y);

    this.slices = 8;
    // prize names, starting from 12 o'clock going clockwise
    this.slicePrizes = [0,1,2,3,4,5,6,7],
 
    // wheel rotation duration, in milliseconds
    this.rotationTime = 3000;

    // adding the wheel in the middle of the canvas
    this.wheel = parent.add.sprite(x, y, "wheel");
    // adding the pin in the middle of the canvas
    this.pin = parent.add.sprite(x, y, "pin");
    if(isMobile()) {
      this.wheel.setScale(2);
      this.pin.setScale(2);
    }
    // adding the text field
    this.prizeText = parent.add.text(x, y + 60, "", {
        font: "bold 32px Arial",
        align: "center",
        color: "white"
    });

    // center the text
    this.prizeText.setOrigin(0.5);

    // the game has just started = we can spin the wheel
    this.canSpin = true;

    this.parent = parent;

    // waiting for your input, then calling "spinWheel" function
    this.wheel.setInteractive();
    this.wheel.on("pointerdown", this.spinWheel, this);
  }

  // function to spin the wheel
  spinWheel(){ 
      // can we spin the wheel?
      if(this.canSpin){

          // resetting text field
          this.prizeText.setText("");

          // the wheel will spin round from 2 to 4 times. This is just coreography
          var rounds = Phaser.Math.Between(2, 4);

          // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
          var degrees = Phaser.Math.Between(0, 360);

          // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
          var prize = this.slices - 1 - Math.floor(degrees / (360 / this.slices));

          // now the wheel cannot spin because it's already spinning
          this.canSpin = false;

          // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
          // the quadratic easing will simulate friction
          this.parent.tweens.add({

              // adding the wheel to tween targets
              targets: [this.wheel],

              // angle destination
              angle: 360 * rounds + degrees,

              // tween duration
              duration: this.rotationTime,

              // tween easing
              ease: "Cubic.easeOut",

              // callback scope
              callbackScope: this,

              // function to be executed once the tween has been completed
              onComplete: function(tween){

                  // displaying prize text
                  this.prizeText.setText(this.slicePrizes[prize]);
                  const data = {
                    distance: this.slicePrizes[prize],
                  };
                  eventManager.publish("wheel_finished", data);

                  // player can spin again
                  this.canSpin = true;
              }
          });
      }
  }
}
