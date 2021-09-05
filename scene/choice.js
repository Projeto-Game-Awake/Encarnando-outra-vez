class choice extends Phaser.Scene {
  constructor() {
    super("choice");
    this.items = [
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
      {
        question: "quanto é 1 + 1",
        right: "2",
        wrong: "3",
      },
    ];
  }
  init(data) {
    this.player = data.player;
  }
  create() {
    const event = "choice_ended";
    let cardGame = new CardGame(
      this,
      0,
      0,
      0.6,
      "fundoCarta",
      3,
      2,
      event,
      this.items
    );

    const scene = this;
    eventManager.subscribe(event, (data) => {
      console.log(
        `"anEvent", was published with this data: ${JSON.stringify(
          data
        )} choice`
      );

      const result = data.result;
      scene.selectCard(result);
    });
  }
  selectCard(result) {
    console.log("------CLICOU---", result);
    this.scene.resume("main");
    this.scene.stop();
  }
}
