"use strict";

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

class Element {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Portal extends Element {
    constructor(img, x, y, width, height) {
        super(x, y,width, height);
        this.img = new Sprite(img, 2483, 329, 670, 670);
        this.speed = 0.2;
        this.direction = true;
        this.maxMouv = 340;
    }
    move() {
        if (this.y < this.maxMouv && this.direction) {
            this.y += this.speed;
        } else {
            if (this.y > 320) {
                this.y = this.y - this.speed;
                this.direction = false;
            } else {
                this.direction = true;
            }
        }
    }
    draw(ctx) {
        this.move();

        ctx.save();
        ctx.scale(0.4, 1);
        // 870 * 2.5 cause 1/0.4 = 2.5
        this.img.draw(ctx,this.x*2.5, this.y, this.width, this.height);
        ctx.restore();
    }
}
