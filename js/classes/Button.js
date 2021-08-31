class Button extends Phaser.GameObjects.Container {
  constructor(parent, x, y, label, action) {
    let style = {
      fontSize: 24,
      fontFamily: "Arial",
      align: "left",
      color: "#000000",
      wordWrap: { width: 100, useAdvancedWrap: true },
    };

    let buttonText = scene.add.text(0, 0, label, style);
    buttonText.setOrigin(0.5, 0);

    super(parent, x, y, [buttonText]);

    this.buttonText = buttonText;

    this.setInteractive(
      new Phaser.Geom.Circle(0, 0, 20),
      Phaser.Geom.Circle.Contains
    );

    this.on("pointerover", function () {
      buttonText.setTint(0x44ff44);
    });

    this.on("pointerout", function () {
      buttonText.clearTint();
    });

    this.once("pointerup", function () {
      if (action) {
        action();
      }
    });
  }
}
