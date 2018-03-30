// test truc
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

class Character {
    constructor(placeX, placeY) {
        this.coordinate = new Coordinate(placeX, placeY);
        this.isJumping = false;
        this.hightJump = 200;
        this.stateJump = "";//up and down are valid value
        this.posStartJump = new Coordinate(placeX, placeY);
    }
    getCoordinate() {
        return this.coordinate;
    }
    setCoordinates(x, y) {
        this.coordinate.setX(x);
        this.coordinate.setY(y);
    }
    jump() {
        this.isJumping = true;
        this.stateJump = "up";
        /*  this.posStartJump.setXY(this.getCoordinate().getX(),this.getCoordinate().getY()); */
    }
    draw(context) {
        //console.log(this.isJumping);
        if (this.isJumping) {
            //console.log(this.isJumping);
            // console.log(this.stateJump);
            if (this.stateJump == "up") {
                this.setCoordinates(this.getCoordinate().getX(), this.getCoordinate().getY() - 3);
                if (this.getCoordinate().getY() < this.posStartJump.getY() - this.hightJump) {
                    this.stateJump = "down";
                }
            }
            if (this.stateJump == "down") {
                this.setCoordinates(this.getCoordinate().getX(), this.getCoordinate().getY() + 3);
                if (this.getCoordinate().getY() == this.posStartJump.getY()) {
                    this.isJumping = false;
                }
            }
        }
        //console.log(this.getCoordinate().getY());
        context.fillRect(this.getCoordinate().getX(), this.getCoordinate().getY(), 50, 50);
        /*  this.setCoordinates(this.getCoordinate().getX(),this.getCoordinate().getY()-1);
         context.fillRect(this.getCoordinate().getX(),this.getCoordinate().getY(), 50, 50) */

    }
}

class Block extends Coordinate {
    constructor(sidePx, poseX, posY) {
        //super(Math.random() * 700,Math.random() * 300)
        super(poseX, posY);
        this.size = sidePx;
    }
    draw(ctx) {
        ctx.fillRect(this.getX(), this.getY(), this.size, this.size);
    }
}

const player = new Character(300, 250);
document.addEventListener("DOMContentLoaded", function () {

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');

    //player.draw(ctx);

    window.addEventListener("keydown", function (event) {
        console.log("salutEvnet");
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (event.defaultPrevented) {
            return; // Should do nothing if the key event was already consumed.
        }
        switch (event.keyCode) {
            case 32://Space
                if (!player.isJumping) {
                    player.jump();
                }
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

        // Consume the event for suppressing "double action".
        event.preventDefault();
    }, true);

    const arrayBlocks = [];
    for (let i = 0; i < 10; i++) {
        var sizeSquare = 10 + (Math.random() * 50);
        arrayBlocks.push(new Block(sizeSquare, Math.random() * 700, Math.random() * 300));
    }
    setTimeout(draw, 1000);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        arrayBlocks.map((block) => {
            block.setX(block.getX() - 2);
            //ctx.fillRect(block.getX(), block.getY(), block.size, block.size);
            block.draw(ctx);
            if (block.getX() < 0) {
                var index = arrayBlocks.indexOf(block);
                arrayBlocks.splice(index, 1);
                var sizeSquare = 10 + (Math.random() * 50);
                arrayBlocks.push(new Block(sizeSquare, 700, Math.random() * 300));
            }
        });
        player.draw(ctx);
        setTimeout(draw, 17);
    }

});