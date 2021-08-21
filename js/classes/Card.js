class Card extends Phaser.GameObjects.Container {
  constructor(parent, x, y, image, backIndex, frontIndex, scale, eventName) {
    console.log("Criou Carta");

    let frontImage = new Phaser.GameObjects.Sprite(
      parent,
      x,
      y,
      image,
      frontIndex
    );

    let backImage = new Phaser.GameObjects.Sprite(
      parent,
      x,
      y,
      image,
      backIndex
    );

    super(parent, x, y, [frontImage, backImage]);

    frontImage.setScale(scale, scale);

    frontImage.setOrigin(0, 0);
    frontImage.alpha = 0.9;
    frontImage.setInteractive();
    frontImage.on("pointerdown", this.action, this);

    backImage.setScale(scale, scale);

    backImage.setOrigin(0, 0);
    backImage.alpha = 0.9;
    backImage.setInteractive();
    backImage.on("pointerdown", this.action, this);

    this.frontImage = frontImage;
    this.backImage = backImage;
    this.eventName = eventName;

    parent.add.existing(this);
  }

  action() {
    const data = {
      result: true,
    };
    eventManager.publish(this.eventName, data);
  }

  turnCard() {}
}
