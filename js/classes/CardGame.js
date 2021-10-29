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

    this.parent = parent;
    this.scale = scale;
    this.imageName = imageName;
    this.frontIndex = frontIndex;
    this.backIndex = backIndex;
    this.eventName = eventName;
    this.items = items;
    this.typeIndex = typeIndex;

    this.cardRule = CardGame.ruleMap[json[this.parent.getName()].rule];
    let instance = new this.cardRule(parent);

    parent.add.existing(this);
    if(instance.getMessage() != null) {
      let text = parent.add.text(width/2, height, instance.getMessage(), {
        font: "bold 96px Arial",
        backgroundColor: "#cccccc",
        align: "center",
        color: "white"
      });
      text.setPadding(64,64);
      this.add(text);
      
      let timeLine = this.parent.tweens.createTimeline();
      timeLine.add({
        y: height/2,
        targets: text,
        duration: 300,
        callbackScope: this,
        callback: () => {
  
        },
      });
      timeLine.add({
        targets: text,
        duration: 3000,
        callbackScope: this,
        callback: () => {
  
        },
      });
      timeLine.add({
        y: 100,
        targets: text,
        duration: 300,
        callbackScope: this,
        callback: () => {
          
        },
      });
      timeLine.add({
        targets: text,
        duration: 0,
        callbackScope: this,
        callback: () => {
          text.destroy();
          if(instance.hasAction()) {
            this.showCards();
          } else {
            eventManager.publish("question_ended");
            eventManager.publish("answer",{point:0});
            this.destroy();
          }
        },
      });
      timeLine.play();
    
    }
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
  showCards() {

    let maxWidth = 3;
    let maxCards = 9;

    let count = 0;

    this.cards = [];
    
    const lastIndex = maxCards;

    this.items = CardGame.suffle(clone(this.items));

    while (count < lastIndex) {
      let i = count % maxWidth;
      let j = Math.floor(count / maxWidth);

      let card = null;

      card = new this.cardRule(
        this.parent,
        400 + 120 * j * this.scale,
        162 * i * this.scale,
        this.imageName,
        this.backIndex,
        this.frontIndex,
        this.scale,
        this.eventName,
        this.items[count%this.items.length]
      );
      this.cards.push(card);
      count++;
    }
  }
  clear() {
    if(this.cards) {
      for(let i = 0;i<this.cards.length;i++) {
        this.cards[i].destroy();
      }
    }
  }
}
