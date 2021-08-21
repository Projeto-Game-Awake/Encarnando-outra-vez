class CardGame extends Phaser.GameObjects.Container {
  constructor(
    parent,
    x = 0,
    y = 0,
    scale = 1,
    imageName,
    frontIndex,
    backIndex,
    eventName
  ) {
    super(parent, x, y);

    this.scale = scale;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let card = new Card(
          parent,
          50 + 120 * j * scale,
          50 + 162 * i * scale,
          imageName,
          frontIndex,
          backIndex,
          scale,
          eventName
        );
        // this.add(card);
      }
    }

    parent.add.existing(this);
  }
}
