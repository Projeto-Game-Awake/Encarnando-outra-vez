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
    items,
    ruleIndex
  ) {
    super(parent, x, y);

    this.scale = scale;
    let maxWidth = 3;
    let maxCards = 9;

    let count = 0;

    this.cards = [];
    
    const lastIndex = maxCards;

    items = this.suffleCards(items);

    while (count < lastIndex) {
      let i = count % maxWidth;
      let j = Math.floor(count / maxWidth);

      let card = null;
      eval("card = new "+cardRules[ruleIndex].rules[ruleIndex]+"("+
        "parent,"+
        "50 + 120 * j * scale,"+
        "50 + 162 * i * scale,"+
        "imageName,"+
        "frontIndex,"+
        "backIndex,"+
        "scale,"+
        "eventName,"+
        "items[count%items.length]"+
      ");");
      this.cards.push(card);
      count++;
    }

    parent.add.existing(this);
  }
  suffleCards(items) {
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
