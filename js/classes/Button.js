class Button extends Phaser.GameObjects.Container {
  constructor(parent, x, y, label, action) {
    let style = {
      fontSize: 16,
      fontFamily: "Arial",
      align: "left",
      color: "#000000",
      backgroundColor: "#cccccc",
      wordWrap: { width: 400, useAdvancedWrap: true },
    };

    let buttonText = scene.add.text(0, 0, label, style);
    buttonText.setOrigin(0.5, 0);

    super(parent, x, y, [buttonText]);

    this.buttonText = buttonText;

    //this.setSize(buttonText.width,buttonText.height);

    //buttonText.setInteractive();
    this.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, buttonText.width,buttonText.height),
      Phaser.Geom.Rectangle.Contains
    );

    this.on("pointerover", function () {
      buttonText.setTint(0x44ff44);
    });

    this.on("pointerout", function () {
      buttonText.clearTint();
    });

    this.once("pointerdown", function () {
      if (action) {
        action();
      }
    });
  }
}
