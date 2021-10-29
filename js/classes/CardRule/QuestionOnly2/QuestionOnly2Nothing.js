class QuestionOnly2Nothing extends QuestionOnly1 {
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
    super(parent,
      x,
      y,
      image,
      backIndex,
      frontIndex,
      scale,
      eventName,
      item);
    }

    getMessage() {
      return "TANTO FAZ";
    }

    calculatePoint(point,answers) {
      return answers[Phaser.Math.Between(0,answers.length-1)].point;
    }
}
