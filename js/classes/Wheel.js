class Wheel extends Phaser.GameObjects.Container {
  constructor(parent, x, y) {
    super(parent, x, y);

    this.x = x;
    this.y = y;

    this.parent = parent;

    this.rouletterColors = [
      0x0000ff, 0x00ff00, 0xff0000, 0xffff00, 0xff00ff, 0x00ffff, 0x999999,
      0x9999ff, 0x99ff99, 0xff9999,
    ];
    this.options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.startAngle = 0;
    this.arc = Math.PI / (this.options.length / 2);
    this.spinTimeout = null;

    this.spinArcStart = 10;
    this.spinTime = 0;
    this.spinTimeTotal = 0;

    this.ctx = this.parent.add.graphics();

    let style = {
      fontSize: 24,
      fontFamily: "Arial",
      align: "left",
      backgroundColor: "#68b5e9",
      color: "#FFFFFF",
      wordWrap: { width: 300, useAdvancedWrap: true },
    };

    style.fontSize = 48;
    style.color = "#000000";

    this.outsideRadius = 200;
    this.textRadius = 160;
    this.insideRadius = 125;

    this.spinner = this.parent.add.text(
      this.x + this.outsideRadius,
      this.y + this.outsideRadius * 2 + 60,
      "Girar",
      style
    );
    this.spinner.setOrigin(0.5, 0);
    this.spinner.setPadding(64, 16);
    this.spinner.setInteractive();
    this.spinner.on("pointerdown", this.spin, this);

    this.optionDisplay = parent.add.text(
      this.x + this.outsideRadius,
      this.y + this.outsideRadius,
      "",
      style
    );

    this.optionDisplay.setOrigin(0.5, 0);

    this.optionDisplay.setInteractive();
    this.optionDisplay.on("pointerdown", this.spin, this);

    this.drawRouletteWheel();
  }

  getRouletteColor(item) {
    return this.rouletterColors[item];
  }

  drawRouletteWheel() {
    let x = this.x + this.outsideRadius;
    let y = this.y + this.outsideRadius;

    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;

    this.ctx.font = "bold 12px Helvetica, Arial";

    for (var i = 0; i < this.options.length; i++) {
      let angle = this.startAngle + i * this.arc;
      this.ctx.fillStyle(this.getRouletteColor(i));

      this.ctx.beginPath();
      this.ctx.arc(x, y, this.outsideRadius, angle, angle + this.arc, false);
      this.ctx.arc(x, y, 0, angle + this.arc, angle, true);
      this.ctx.stroke();
      this.ctx.fill();

      this.ctx.save();
      this.ctx.shadowOffsetX = -1;
      this.ctx.shadowOffsetY = -1;
      this.ctx.shadowBlur = 0;
      this.ctx.shadowColor = "rgb(220,220,220)";

      this.ctx.translateCanvas(
        y + Math.cos(angle + this.arc / 2) * this.textRadius,
        y + Math.sin(angle + this.arc / 2) * this.textRadius
      );
      this.ctx.rotateCanvas(angle + this.arc / 2 + Math.PI / 2);
      let text = this.options[i];
      this.ctx.restore();
    }

    //Arrow
    this.ctx.fillStyle(0x000000);
    this.ctx.beginPath();
    this.ctx.moveTo(x - 4, y - (this.outsideRadius + 5));
    this.ctx.lineTo(x + 4, y - (this.outsideRadius + 5));
    this.ctx.lineTo(x + 4, y - (this.outsideRadius - 5));
    this.ctx.lineTo(x + 9, y - (this.outsideRadius - 5));
    this.ctx.lineTo(x + 0, y - (this.outsideRadius - 13));
    this.ctx.lineTo(x - 9, y - (this.outsideRadius - 5));
    this.ctx.lineTo(x - 4, y - (this.outsideRadius - 5));
    this.ctx.lineTo(x - 4, y - (this.outsideRadius + 5));
    this.ctx.fill();
  }

  rotateWheel() {
    this.spinTime += 600;
    if (this.spinTime >= this.spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    let spinAngle = this.spinAngleStart; // - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI) / 180;
    this.drawRouletteWheel();

    const localWheel = this;
    this.spinTimeout = setTimeout(function () {
      localWheel.rotateWheel();
    }, 30);
  }
  stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    let degrees = (this.startAngle * 180) / Math.PI + 90;
    let arcd = (this.arc * 180) / Math.PI;
    let index = Math.floor((360 - (degrees % 360)) / arcd);
    this.ctx.save();
    this.ctx.font = "bold 30px Helvetica, Arial";
    let text = this.options[index];
    this.ctx.restore();
    this.option = this.options[index];
    this.optionDisplay.setText(this.option);
    this.parent.children.bringToTop(this.optionDisplay);

    const amount = this.options[index];

    this.spinTimeout = setTimeout(function () {
      const data = {
        distance: amount,
      };
      eventManager.publish("wheel_finished", data);
    }, 30);
  }

  spin() {
    this.spinAngleStart = Math.random() * 10 + 10;
    this.spinTime = 0;
    this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.option = -2;
    this.optionDisplay.setText("");
    this.rotateWheel();
  }
  easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }
}
