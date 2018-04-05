class Coordinate {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}

class PlayerShip extends Coordinate{
    constructor(placeX, placeY) {
        super(placeX, placeY);
        var createImg = new Image();
        createImg.src = "img/PNG/playerShip1_blue.png";
        this.img = createImg;
        this.speed = 10;
        this.keyIsUp = false;
        this.keyCode = null;
    }

    move(){
        if(this.keyIsUp){
            switch (this.keyCode) {
                case 38://up
                    this.setY(this.getY()-this.speed);
                    break;
                case 40://down
                    this.setY(this.getY()+this.speed);
                    break;
                case 37://left
                    this.setX(this.getX()-this.speed);
                    break;
                case 39://right
                    this.setX(this.getX()+this.speed);
                    break;
                default:
                    return; 
            }
        }
            
    }
    draw(context) {
        this.move();
        //context.clearRect(this.getX(), this.getY()+this.speed, this.img.width, this.img.height);
        context.drawImage(this.img,this.getX(),this.getY());
    }
}

class Block extends Coordinate {
    constructor(sidePx, poseX, posY) {
        super(poseX, posY);
        this.size = sidePx;
    }
    draw(ctx) {
        ctx.fillRect(this.getX(), this.getY(), this.size, this.size);
    }
}

const player = new PlayerShip(300, 250);

document.addEventListener("DOMContentLoaded", function () {

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
            return;
        } 
        player.keyCode = event.keyCode;
        player.keyIsUp = true;
        //event.preventDefault();
    }, true);
    window.addEventListener("keyup", function (event) {
        if (event.defaultPrevented) {
            return;
        } 
        player.keyIsUp = false;
        //event.preventDefault();
    }, true);

    setTimeout(draw, 17);
    //window.requestAnimationFrame(draw);
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        setTimeout(draw, 17);
        //window.requestAnimationFrame(draw);
    }

});