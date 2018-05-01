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
        super(x, y, width, height);
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
        ctx.scale(0.4, 1)
        // 870 * 2.5 cause 1/0.4 = 2.5
        this.img.draw(ctx, this.x * 2.5, this.y, this.width, this.height);
        ctx.restore();
    }
}

class Cloud extends Element {
    constructor(img, x, y, width, height) {
        super(x, y, width, height);
        this.img = new Sprite(img, 0, 0, img.width, img.height);
        this.speed = 1;
        this.isCollision = false;
    }
    setIsCollision(bool) {
        this.isCollision = bool;
    }
    effectCollision(collision) {
        switch (collision.type) {
            case "canvas":
                switch (collision.direction) {
                    case "left":
                        //check if all img out
                        if (collision.offset < 0) {
                            this.x = collision.canvasWidth;
                            this.speed = randomNumber(1, 4);
                            return {
                                isOut: true,
                                speed: this.speed
                            };
                        } else {
                            return {
                                isOut: false
                            };
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }

    }
    move() {
        this.x -= this.speed;
    }
    draw(ctx) {
        this.move();
        this.img.draw(ctx, this.x, this.y, this.width, this.height);
    }
}

class Skill extends Element {
    constructor(img, x, y, width, height, distanceFall) {
        super(x, y, width, height);
        this.img = new Sprite(img, 0, 0, img.width, img.height);
        this.speed = 1;
        this.isCollision = false;
        this.distanceFall = distanceFall;
    }
    move() {
        if (this.x < this.distanceFall) {
            this.y += this.speed;
        } else {
            this.x -= this.speed;
        }
    }
    draw(ctx) {
        this.move();
        this.img.draw(ctx, this.x, this.y, this.width, this.height);
    }

}
class Bomb extends Element {
    constructor(imgBomb, imgExplosion, x, y, width, height, distanceFall) {
        super(x, y, width, height);
        this.speed = 1;
        this.distanceFall = distanceFall;
        this.explode = false;
        this.animation = getAnimationBomb(imgBomb, imgExplosion);
    }
    move() {
        if(!this.explode){
            if (this.x < this.distanceFall) {
                this.y += this.speed;
            } else {
                this.x -= this.speed;
            }
        }
    }
    draw(ctx) {
        this.move();
        if (this.x < this.distanceFall) {
            if (this.explode) {
                this.animation.explosion.explode[this.animation.explosion.frame % 12].draw(
                    ctx,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
                if (this.animation.explosion.actualTime < this.animation.explosion.maxTime) {
                    this.animation.explosion.actualTime++;
                } else {
                    this.animation.explosion.frame++;
                    this.animation.explosion.actualTime = 0;
                }
            } else {
                this.animation.bomb[this.animation.frame % 3].draw(
                    ctx,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
                if (this.animation.actualTime < this.animation.maxTime) {
                    this.animation.actualTime++;
                } else {
                    this.animation.frame++;
                    this.animation.actualTime = 0;
                }
            }
        }
    }
}