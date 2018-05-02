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
        this.maxMouv = y+10;
        this.scaleX = 0.4;
        this.scaleY = 1;
    }
    move() {
        if (this.y < this.maxMouv && this.direction) {
            this.y += this.speed;
        } else {
            if (this.y > this.maxMouv-20) {
                this.y = this.y - this.speed;
                this.direction = false;
            } else {
                this.direction = true;
            }
        }
    }
    setScaleXY(scaleX,scaleY){
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }
    draw(ctx) {
        this.move();

        ctx.save();
        ctx.scale(this.scaleX, this.scaleY)
        // 870 * 2.5 cause 1/0.4 = 2.5
        this.img.draw(ctx, this.x * (1/this.scaleX), this.y* (1/this.scaleY), this.width, this.height);
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
        this.alpha = 1;
        this.collision = false;
        this.score = 1;
    }
    move() {
        if(this.collision){           
            this.y -= 0.5;
        }else{
            if (this.x < this.distanceFall) {
                this.y += this.speed;
            } else {
                this.x -= this.speed;
            }      
        }
    }
    draw(ctx) {
        this.move();
        if(this.collision){
            ctx.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
            ctx.font = "20pt Arial";
            ctx.fillText("+"+this.score, this.x, this.y+(this.height/2));
            this.alpha -= 0.005;
        }else{
            this.img.draw(ctx, this.x, this.y, this.width, this.height);
        }
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
                    this.x-(this.animation.explosion.explode[this.animation.explosion.frame % 12].sWidth/2)+(this.width/2),
                    this.y-(this.animation.explosion.explode[this.animation.explosion.frame % 12].sHeight/2)+(this.height/2),
                    this.animation.explosion.explode[this.animation.explosion.frame % 12].sWidth,
                    this.animation.explosion.explode[this.animation.explosion.frame % 12].sHeight
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

function createSkillOrBomb(imgsSkill,imgBomb,imgExplosion,cloud,canvasWidth){
    var objRet = {type:null,img:null};
    var score = 1;
    switch (randomNumber(0,50)) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            score = 1;
            objRet.type = "skill";
            objRet.img = imgsSkill[randomNumber(0, 3)];
            break;
        case 5:
        case 6:
        case 7:
        case 8:
            score = 2;
            objRet.type = "skill";
            objRet.img = imgsSkill[randomNumber(4, 5)];
            break;
        case 9:
        case 10:
        case 11:
            score = 3;
            objRet.type = "skill";
            objRet.img = imgsSkill[randomNumber(6, 7)];
            break;
        case 12:
        case 13:
            score = 4;
            objRet.type = "skill";
            objRet.img = imgsSkill[randomNumber(8, 11)];
            break;
        default:
            objRet.type = "bomb";
            break;
    }
    if (objRet.type == "skill") {
        var skill = new Skill(
            objRet.img,
            cloud.x + 30,
            cloud.y + 10,
            40,
            50,
            randomNumber(0, canvasWidth - 50)
        );
        skill.score = score;
        skill.speed = cloud.speed;
        return {type:"skill",obj:skill};
    }else{
        var bomb = new Bomb(
            imgBomb,
            imgExplosion,
            cloud.x + 30,
            cloud.y + 10,
            50,
            50,
            randomNumber(0, canvasWidth - 50)
        );
        bomb.speed = cloud.speed;
        return {type:"bomb",obj:bomb};
    }
}