class Button extends Phaser.GameObjects.Text {
  constructor(parent, x, y, label, action) {
    let style = {
      fontSize: 16,
      fontFamily: "Arial",
      align: "left",
      color: "#000000",
      backgroundColor: "#cccccc",
      wordWrap: { width: 200, useAdvancedWrap: true },
    };
    super(parent,x,y, label, style);
    this.setOrigin(0, 0);
    this.setInteractive();

    this.on("pointerover", () => {
      this.setTint(0x44ff44);
    });

    this.on("pointerout", () => {
      this.clearTint();
    });

    this.on("pointerdown", () => {
      if (action) {
        action();
      }
    });
  }
}
