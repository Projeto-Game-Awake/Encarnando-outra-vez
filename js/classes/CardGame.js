class CardGame extends Phaser.GameObjects.Container {
  constructor(
    parent,
    x = 0,
    y = 0,
    scale = 1,
    imageName,
    frontIndex,
    backIndex,
    eventName,
    items
  ) {
    super(parent, x, y);

    this.scale = scale;
    let maxWidth = 3;

    let count = 0;

    while (count < items.length) {
      let i = count % maxWidth;
      let j = Math.floor(count / maxWidth);

      console.log(i, j);

      let card = new Card(
        parent,
        50 + 120 * j * scale,
        50 + 162 * i * scale,
        imageName,
        frontIndex,
        backIndex,
        scale,
        eventName,
        items[count]
      );
      count++;
    }

    parent.add.existing(this);
  }
}
