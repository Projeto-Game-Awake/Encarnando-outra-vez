class QuestionOnly2Stop extends QuestionOnly1 {
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
      return "PARADA";
    }

    calculatePoint(point) {
      return 0;
    }

    hasAction() {
      return false;
    }

}
