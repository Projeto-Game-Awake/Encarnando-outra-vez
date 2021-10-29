class QuestionOnly2Double extends QuestionOnly1 {
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
      return "DUPLO";
    }

    calculatePoint(point) {
      return point*2;
    }
    
}
