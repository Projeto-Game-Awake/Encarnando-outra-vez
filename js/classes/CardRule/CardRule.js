class CardRule extends Phaser.GameObjects.Container {
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
      let frontImage = new Phaser.GameObjects.Sprite(
        parent,
        0,
        0,
        image,
        frontIndex
      );
  
      let backImage = new Phaser.GameObjects.Sprite(
        parent,
        x,
        y,
        image,
        backIndex
      );
  
      let style = {
        fontSize: 10,
        fontFamily: "Arial",
        align: "left",
        color: "#000000",
        wordWrap: { width: 100, useAdvancedWrap: true },
      };
      
      let question = parent.add.text(10, 30, item.question, style).setOrigin(0);
      question.visible = false;

      let startY = 100;

      let answers = [];
      item.answers = CardGame.suffle(item.answers);
      for(let i=0;i<item.answers.length;i++) {
        let answer = new Button(
          parent,
          10,
          startY,
          (i+1) + " - " + item.answers[i].text,
          function () {
            const data = {
              result: true,
            };
            eventManager.publish(eventName,item.answers[i]);
            eventManager.publish("answer",item.answers[i]);
          }
        );
        answer.visible = false;  
        answers.push(answer);
        startY += 20;
      }
  
      let elements = [
        frontImage,
        backImage,
        question
      ]
      for(let i=0;i<answers.length;i++) {
        elements.push(answers[i]);
      }

      super(parent, x, y, elements);
      
      frontImage.setScale(scale, scale);
  
      frontImage.setOrigin(0, 0);
      frontImage.alpha = 0.9;
  
      backImage.setScale(scale, scale);
  
      backImage.setOrigin(0, 0);
      backImage.alpha = 0.9;
      backImage.setInteractive();
      backImage.on("pointerdown", this.showFace, this);
  
      this.frontImage = frontImage;
      this.frontImage.visible = false;
      this.backImage = backImage;
      this.eventName = eventName;
      this.question = question;
      this.answers = answers;
  
      this.parent = parent;
  
      eventManager.subscribe("answer", (data) => {
        this.destroy();
      });
  
      let card = this;
      eventManager.subscribe("card_turned", (data) => {
         if (data != card) {
           //card.setInteractive(false);
         }
      });
  
      parent.add.existing(this);
    }
  
    showFace() {
      if(this.parent.isSelected) {
        return;
      }
      this.parent.isSelected = true;
      this.backImage.destroy();
  
      this.frontImage.visible = true;
      this.question.visible = true;
  
      for(let i=0;i<this.answers.length;i++) {
        this.answers[i].visible = true;
      }

      let graphics = this.parent.make.graphics();

      // graphics.fillStyle(0xffffff);
      graphics.fillRect(10, 40, 220, 144);

      let mask = new Phaser.Display.Masks.GeometryMask(this.parent, graphics);

      //  The rectangle they can 'drag' within
      let zone = this.parent.add.zone(10, 40, 220, 144).setOrigin(0).setInteractive();

      zone.on('pointermove', (pointer) => {
        if (pointer.isDown)
        {
          this.question.y += (pointer.velocity.y / 10);
          if(this.question.y < 30) {
            this.question.y = 30;
          }
        }

      });
      this.add(zone);
      this.question.setMask(mask);

      this.setScale(2,2);

      this.x = 10;
      this.y = 10;
      this.parent.children.bringToTop(this);
  
      eventManager.publish("card_turned", this);
    }
  
    turnCard() {}
  
}
  