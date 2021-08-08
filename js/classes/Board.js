class Board {

    // Construtor
    constructor(obj){
        if(obj == undefined){
            obj = {}
        }
        this.rows = (obj.rows != undefined) ? obj.rows : 5;
        this.columns = (obj.columns != undefined) ? obj.columns : 2;
        this.items = (obj.items != undefined) ? obj.items : [0,1,2,3,4];
        this.x = obj.x;
        this.y = obj.y;
        this.direction = [];
        this.path = [];
        this.players = [];
        this.currentPlayerIndex = 0;
        for(let i=0;i<gameOptions.players;i++) {
            this.players[i] = new Player(i, this.y);
        }
        this.rouletterColors = [
            0x0000ff,
            0x00ff00,
            0xff0000,
            0xffff00,
            0xff00ff,
            0x00ffff,
            0x999999,
            0x9999ff,
            0x99ff99,
            0xff9999,
        ]
    }
    // Cria o campo do jogo.
    generateField(){
        this.direction[Direction.DOWN] = {
            x:0,
            y:1
        }
        this.direction[Direction.LEFT] = {
            x:-1,
            y:0
        }
        this.direction[Direction.RIGHT] = {
            x:1,
            y:0
        }
        this.direction[Direction.UP] = {
            x:0,
            y:-1
        }
        this.selectedItem = -1;
        this.foundCount = 0;
        this.position = 0;
        this.x = 0;
        this.y = 0;
        this.colors = [0x0000ff,0xffff00,0xff0000,0xffffff]
    }
    addLine(count,direction) {
        let current = this.direction[direction];
        if(this.path.length > 0) {
            this.path[this.path.length-1].direction = direction;
        }
        for(let i=0;i<count;i++) {
            this.x += current.x;
            this.y += current.y;
            this.drawPlace(this.x,this.y,direction);
        }
    }
    generateType() {
        return Phaser.Math.Between(0,3);
    }
    getTileType(player) {
        return this.path[player.pos+1].type;
    }
    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }
    nextPlayer() {
        this.currentPlayerIndex++
        this.currentPlayerIndex = this.currentPlayerIndex  % gameOptions.players;
    }
    drawPlace(j,i,direction) {
        let x = gameOptions.tileSize * j;
        let y = gameOptions.tileSize * i;
        let type = this.generateType();
        let container = scene.add.container(0,0);
        this.path.push({
            container,
            type,
            direction
        })
        let logo = scene.add.rectangle(x + 30,y + 30, 62, 62,this.colors[type]);

        container.add([logo]);
    }
    start() {
        this.option = -1;
        this.options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
        this.startAngle = 0;
        this.arc = Math.PI / (this.options.length / 2);
        this.spinTimeout = null;
    
        this.spinArcStart = 10;
        this.spinTime = 0;
        this.spinTimeTotal = 0;

        this.ctx = scene.add.graphics();

        let style = {
            fontSize: 24,
            fontFamily: 'Arial',
            align: "left",
            backgroundColor: '#68b5e9',
            color:'#FFFFFF',
            wordWrap: { width: 300, useAdvancedWrap: true }
        }

        this.spinner = scene.add.text(1110, 0, "Girar", style);
        this.spinner.setOrigin(0,0)
        this.spinner.setPadding(64, 16);
        this.spinner.setInteractive();
        this.spinner.on("pointerdown",this.spin,this); 
        
        style.fontSize = 48;
        style.color = '#000000';

        this.optionDisplay = scene.add.text(980, 230, "", style);
        this.optionDisplay.setOrigin(0,0)
        this.optionDisplay.setInteractive();
        this.optionDisplay.on("pointerdown",this.spin,this); 

        this.drawRouletteWheel();
    }
    byte2Hex(n) {
        let nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }
    RGB2Color(r,g,b) {
        return parseInt('0x' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b),16);
    }
    getRouletteColor(item) {
        return this.rouletterColors[item];
    }
    drawRouletteWheel() {
        let outsideRadius = 200;
        let textRadius = 160;
        let insideRadius = 125;
        let x = 1000;

        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;

        this.ctx.font = 'bold 12px Helvetica, Arial';

        for(var i = 0; i < this.options.length; i++) {
            let angle = this.startAngle + i * this.arc;
            this.ctx.fillStyle(this.getRouletteColor(i));

            this.ctx.beginPath();
            this.ctx.arc(x, 250, outsideRadius, angle, angle + this.arc, false);
            this.ctx.arc(x, 250, 0, angle + this.arc, angle, true);
            this.ctx.stroke();
            this.ctx.fill();

            this.ctx.save();
            this.ctx.shadowOffsetX = -1;
            this.ctx.shadowOffsetY = -1;
            this.ctx.shadowBlur    = 0;
            this.ctx.shadowColor   = "rgb(220,220,220)";

            this.ctx.translateCanvas(250 + Math.cos(angle + this.arc / 2) * textRadius, 
                            250 + Math.sin(angle + this.arc / 2) * textRadius);
            this.ctx.rotateCanvas(angle + this.arc / 2 + Math.PI / 2);
            let text = this.options[i];
            //this.ctx.fillText(text, -10 / 2, 0);
            this.ctx.restore();
        } 

        //Arrow
        this.ctx.fillStyle(0x000000);
        this.ctx.beginPath();
        this.ctx.moveTo(x - 4, 250 - (outsideRadius + 5));
        this.ctx.lineTo(x + 4, 250 - (outsideRadius + 5));
        this.ctx.lineTo(x + 4, 250 - (outsideRadius - 5));
        this.ctx.lineTo(x + 9, 250 - (outsideRadius - 5));
        this.ctx.lineTo(x + 0, 250 - (outsideRadius - 13));
        this.ctx.lineTo(x - 9, 250 - (outsideRadius - 5));
        this.ctx.lineTo(x - 4, 250 - (outsideRadius - 5));
        this.ctx.lineTo(x - 4, 250 - (outsideRadius + 5));
        this.ctx.fill();
    }
    spin() {
        this.spinAngleStart = Math.random() * 10 + 10;
        this.spinTime = 0;
        this.spinTimeTotal = Math.random() * 3 + 4 * 1000;
        this.option = -2;
        this.optionDisplay.setText("");
        this.rotateWheel();
    }
    rotateWheel() {
        this.spinTime += 600;
        if(this.spinTime >= this.spinTimeTotal) {
            this.stopRotateWheel();
            return;
        }
        let spinAngle = this.spinAngleStart;// - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
        this.startAngle += (spinAngle * Math.PI / 180);
        this.drawRouletteWheel();
        this.spinTimeout = setTimeout(function() {
            scene.board.rotateWheel()
        },30);
    }
    stopRotateWheel() {
        clearTimeout(this.spinTimeout);
        let degrees = this.startAngle * 180 / Math.PI + 90;
        let arcd = this.arc * 180 / Math.PI;
        let index = Math.floor((360 - degrees % 360) / arcd);
        this.ctx.save();
        this.ctx.font = 'bold 30px Helvetica, Arial';
        let text = this.options[index]
        this.ctx.restore();
        this.option = this.options[index];
        this.optionDisplay.setText(this.option);
        scene.children.bringToTop(this.optionDisplay);
        scene.doPlayerMove();
    }
    easeOut(t, b, c, d) {
        var ts = (t/=d)*t;
        var tc = ts*t;
        return b+c*(tc + -3*ts + 3*t);
    }
}
