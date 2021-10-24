class CardGame extends Phaser.GameObjects.Container {
  static ruleMap =
    {
      QuestionOnly1,
      QuestionOnly2,
      QuestionOnly2Simple,
      QuestionOnly2Double,
      QuestionOnly2Nothing,
      QuestionOnly2Stop,
    }
  constructor(
    parent,
    x = 0,
    y = 0,
    scale = 1,
    imageName,
    frontIndex,
    backIndex,
    eventName,
    items,
    typeIndex
  ) {
    super(parent, x, y);

    this.scale = scale;
    let maxWidth = 3;
    let maxCards = 9;

    let count = 0;

    this.cards = [];
    
    const lastIndex = maxCards;

    items = CardGame.suffle(clone(items));

    while (count < lastIndex) {
      let i = count % maxWidth;
      let j = Math.floor(count / maxWidth);

      let card = null;

      card = new CardGame.ruleMap[json[typeIndex].rule](
        parent,
        400 + 120 * j * scale,
        50 + 162 * i * scale,
        imageName,
        frontIndex,
        backIndex,
        scale,
        eventName,
        items[count%items.length]
      );
      this.cards.push(card);
      count++;
    }

    parent.add.existing(this);
  }
  static suffle(items) {
    let newOrder = [];
    let i = 0;
    while (items.length > 0) {
        newOrder[i++] = items.splice(
          Phaser.Math.Between(0, items.length - 1),
          1
        )[0];
    }
    return newOrder;
  }
  clear() {
    for(let i = 0;i<this.cards.length;i++) {
      this.cards[i].destroy();
    }
  }
}
