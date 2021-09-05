class mini_game extends Phaser.Scene {
  constructor() {
    super("mini-game");
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
    const event = "mini_game_ended";
    let cardGame = new CardGame(
      this,
      0,
      0,
      0.6,
      "fundoCarta2",
      1,
      0,
      event,
      this.items
    );

    const scene = this;
    eventManager.subscribe(event, (data) => {
      console.log(
        `"anEvent", was published with this data: ${JSON.stringify(
          data
        )} mini-game`
      );

      const result = data.result;

      if (result) {
        eventManager.publish("right_answer");
      } else {
        eventManager.publish("wrong_answer");
      }

      scene.selectCard(result);
    });
  }
  selectCard(result) {
    console.log("------CLICOU---", result);
    this.scene.resume("main");
    this.scene.stop();
  }
}
