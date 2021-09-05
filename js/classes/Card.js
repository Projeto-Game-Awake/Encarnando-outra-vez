class Card extends Phaser.GameObjects.Container {
  constructor(
    parent,
    x,
    y,
    image,
    backIndex,
    frontIndex,
    scale,
    eventName,
    item
  ) {
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

    let xPos = x + (scale * frontImage.width) / 2;
    let yPos = y + 20;
    let style = {
      fontSize: 24,
      fontFamily: "Arial",
      align: "left",
      color: "#000000",
      wordWrap: { width: 100, useAdvancedWrap: true },
    };

    let question = scene.add.text(xPos, yPos, item.question, style);
    question.setOrigin(0.5, 0);
    question.visible = false;

    let answerPos = [];
    let answerDeltaY = 20;

    answerPos.push(
      {
        x: xPos,
        y: yPos + scale * (frontImage.height / 2),
        letter: "A",
      },
      {
        x: xPos,
        y: yPos + scale * (frontImage.height / 2) + answerDeltaY,
        letter: "B",
      }
    );

    let randIndex = Math.floor(Math.random() * 2);

    let rightAnswerPosition = answerPos[randIndex];
    answerPos.splice(randIndex, 1);

    let wrongAnswerPosition = answerPos[0];

    let rightAnswer = new Button(
      parent,
      rightAnswerPosition.x,
      rightAnswerPosition.y,
      `${rightAnswerPosition.letter}: ${item.right}`,
      function () {
        const data = {
          result: true,
        };
        eventManager.publish(eventName, data);
        eventManager.publish("right_answer");
      }
    );

    rightAnswer.visible = false;

    let wrongAnswer = new Button(
      parent,
      wrongAnswerPosition.x,
      wrongAnswerPosition.y,
      `${wrongAnswerPosition.letter}: ${item.wrong}`,
      function () {
        const data = {
          result: false,
        };
        eventManager.publish(eventName, data);
        eventManager.publish("wrong_answer");
      }
    );
    wrongAnswer.visible = false;

    super(parent, x, y, [
      frontImage,
      backImage,
      question,
      rightAnswer,
      wrongAnswer,
    ]);

    frontImage.setScale(scale, scale);

    frontImage.setOrigin(0, 0);
    frontImage.alpha = 0.9;

    backImage.setScale(scale, scale);

    backImage.setOrigin(0, 0);
    backImage.alpha = 0.9;
    backImage.setInteractive();
    backImage.on("pointerdown", this.showFace, this);

    this.frontImage = frontImage;
    this.frontImage.visible = false;
    this.backImage = backImage;
    this.eventName = eventName;
    this.question = question;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer = wrongAnswer;

    this.parent = parent;

    parent.add.existing(this);
  }

  showFace() {
    this.backImage.destroy();

    this.frontImage.visible = true;
    this.question.visible = true;

    this.rightAnswer.visible = true;
    this.wrongAnswer.visible = true;

    this.setScale(2, 2);
    this.x = 0;
    this.y = 0;
    this.parent.children.bringToTop(this);
  }

  turnCard() {}
}
