class Button extends Phaser.GameObjects.Container {
  constructor(parent, x, y, label, action) {
    let style = {
      fontSize: 16,
      fontFamily: "Arial",
      align: "left",
      color: "#000000",
      backgroundColor: "#cccccc",
      wordWrap: { width: 200, useAdvancedWrap: true },
    };

    let text = scene.add.text(0, 0, label, style);
    text.setOrigin(0, 0);

    super(parent, x, y, [text]);

    this.buttonText = text;

    //this.setSize(buttonText.width,buttonText.height);

    //buttonText.setInteractive();
    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, text.width,text.height),
      Phaser.Geom.Rectangle.Contains
    );

    this.on("pointerover", function () {
      text.setTint(0x44ff44);
    });

    this.on("pointerout", function () {
      text.clearTint();
    });

    this.once("pointerdown", function () {
      if (action) {
        action();
      }
    });
  }
}
