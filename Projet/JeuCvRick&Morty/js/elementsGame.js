"use strict";

class Element {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
}

class Portal extends Element {
    constructor(img, x, y, width, height) {
        super(x, y, width, height);
        this.img = new Sprite(img, 2483, 329, 670, 670);
        this.speed = 0.2;
        this.direction = true;
        this.maxMouv = y + 10;
        this.scaleX = 0.4;
        this.scaleY = 1;
    }
    move() {
        if (this.y < this.maxMouv && this.direction) {
            this.y += this.speed;
        } else {
            if (this.y > this.maxMouv - 20) {
                this.y = this.y - this.speed;
                this.direction = false;
            } else {
                this.direction = true;
            }
        }
    }
    setScaleXY(scaleX, scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }
    draw(ctx) {
        this.move();

        ctx.save();
        ctx.scale(this.scaleX, this.scaleY)
        // 870 * 2.5 cause 1/0.4 = 2.5
        this.img.draw(ctx, this.x * (1 / this.scaleX), this.y * (1 / this.scaleY), this.width, this.height);
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
                    case "right":
                        return {
                            isOut: false
                        };
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
        if (this.collision) {
            this.y -= 0.5;
        } else {
            if (this.x < this.distanceFall) {
                this.y += this.speed;
            } else {
                this.x -= this.speed;
            }
        }
    }
    draw(ctx) {
        this.move();
        if (this.collision) {
            ctx.fillStyle = "rgba(5, 111, 173, " + this.alpha + ")";
            ctx.font = "24pt Arial";
            ctx.fillText("+" + this.score, this.x, this.y + (this.height / 2));
            this.alpha -= 0.005;
        } else {
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
        if (!this.explode) {
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
                    this.x - (this.animation.explosion.explode[this.animation.explosion.frame % 12].sWidth / 2) + (this.width / 2),
                    this.y - (this.animation.explosion.explode[this.animation.explosion.frame % 12].sHeight / 2) + (this.height / 2),
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

function createSkillOrBomb(imgsSkill, imgBomb, imgExplosion, cloud, canvasWidth) {
    var objRet = {
        type: null,
        img: null
    };
    var score = 1;
    switch (randomNumber(0, 40)) {
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
        return {
            type: "skill",
            obj: skill
        };
    } else {
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
        return {
            type: "bomb",
            obj: bomb
        };
    }

}

class Character extends Element {
    constructor(img, x, y, width, height) {
        super(x, y, width, height);
        this.animation = getAnimationCharacter(img);
        this.speed = 2;
        this.isCollision = false;
        this.arrowMove = [{
                keyCode: 38,
                keyIsUp: false
            }, //up
            {
                keyCode: 40,
                keyIsUp: false
            }, //down
            {
                keyCode: 37,
                keyIsUp: false
            }, //left
            {
                keyCode: 39,
                keyIsUp: false
            }, //right
            {
                keyCode: 16,
                keyIsUp: false
            } //shift
        ];
    }
    changeImg(img) {
        this.animation = getAnimationCharacter(img);
    }
    restartCharacter() {
        this.arrowMove.map(function (elem) {
            elem.keyIsUp = false;
        });
        this.animation.direction = "stayStill";
        this.x = 0;
        this.y = 0;
        this.speed = 2;
        this.animation.maxTime = 10;
        this.width = 60;
        this.height = 79;
    }
    effectCollision(collision) {
        switch (collision.type) {
            case "canvas":
                switch (collision.direction) {
                    /* if collision with canvas add or sub speed to nullify movement and keep
					character to the same place */
                    case "left":
                        this.setX(this.x + this.speed);
                        return {
                            isOut: true
                        };
                        break;
                    case "right":
                        this.setX(this.x - this.speed);
                        return {
                            isOut: true
                        };
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    setIsCollision(bool) {
        this.isCollision = bool;
    }
    move() {
        this.arrowMove.map(item => {
            if (item.keyIsUp) {
                switch (item.keyCode) {
                    case 38: //up
                        //this.setY(this.getY() - this.speed);
                        break;
                    case 40: //down
                        //this.setY(this.getY() + this.speed);
                        break;
                    case 37: //left
                        this.setX(this.x - this.speed);
                        this.animation.direction = "left";
                        break;
                    case 39: //right
                        this.setX(this.x + this.speed);
                        this.animation.direction = "right";
                        break;
                    case 16: //shift
                        this.speed = 5;
                        this.animation.maxTime = 3;
                        break;
                    default:
                        return;
                }
            }
        });
    }
    draw(ctx) {
        this.move();
        switch (this.animation.direction) {
            case "stayStill":
                this.animation.stayStill.draw(
                    ctx,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
                break;
            case "left":
                this.animation.left[this.animation.frame % 4].draw(
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
                break;
            case "right":
                ctx.save();
                ctx.scale(-1, 1); // needed to flip the img
                this.animation.left[this.animation.frame % 4].draw(
                    ctx,
                    (this.x + this.width) * -1,
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
                ctx.restore();
                break;
            default:
                break;
        }
    }
}

class Horse extends Element {
    constructor(img, x, y, width, height) {
        super(x, y, width, height);
        this.animation = getAnimationHorse(img);
        this.speed = 0.5;
        this.distanceToGo = x;
        this.isCollision = false;
        this.isJumping = false;
        this.baseY = y;
        this.movementJumpUp = true;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.maxJump = 2;
        this.actualJump = 0;
        this.arrowMove = [{
                keyCode: 37,
                keyIsUp: false
            }, //left
            {
                keyCode: 39,
                keyIsUp: false
            }, //right
            {
                keyCode: 16,
                keyIsUp: false
            }, //shift
            {
                keyCode: 32,
                keyIsUp: false
            } //shift
        ];
    }
    setIsCollision(bool){
        this.isCollision = bool;
    }
    effectCollision(collision) {
        switch (collision.type) {
            case "canvas":
                switch (collision.direction) {
                    case "up":
                        this.velocityY = 0;
                        this.movementJumpUp = false;
                        break;
                    default:
                        break;
                }
                break;
            case "experience":
                this.distanceToGo +=30;
                break;
            default:
                break;
        }
    }
    move() {
        if (this.isJumping) {
            this.animation.direction = "jump";
            if (this.velocityY > 0 && this.movementJumpUp) {
                this.movementJumpUp = false;
                this.animation.frame = 4;
            }
            this.velocityY += this.gravity;
            if (this.movementJumpUp) {
                this.y += this.velocityY;
            } else {
                this.y += this.velocityY;
                if (this.y >= this.baseY) {
                    this.animation.direction = "run";
                    this.animation.frame = 0;
                    this.isJumping = false;
                    this.movementJumpUp = true;
                    this.actualJump = 0;
                    this.y = this.baseY;
                }
            }
        }
        if (this.x < this.distanceToGo) {
            this.x += this.speed;
        }
    }
    draw(ctx) {
        this.move();
        switch (this.animation.direction) {
            case "stayStill":
                this.animation.stayStill.draw(
                    ctx,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
                break;
            case "run":
                this.animation.run[this.animation.frame % 7].draw(
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
                break;
            case "jump":
                this.animation.jump[this.animation.frame % 7].draw(
                    ctx,
                    this.x,
                    this.y,
                    this.width,
                    this.height
                );
                if (this.animation.actualTime < this.animation.maxTimeJump) {
                    this.animation.actualTime++;
                } else {
                    if(!(this.animation.frame == 3 || this.animation.frame  == 6)){
                    
                        this.animation.frame++;
                    }
                    this.animation.actualTime = 0;
                }
                break;
            default:
                break;
        }

    }
}
class TextExperience extends Element {
    constructor(text, x, y, width, height) {
        super(x, y, width, height);
        this.text = text;
        this.speed = 5;
        this.isCollision = false;
        this.scaleX = 1;
        this.alpha = 1;
    }
    setIsCollision(bool){
        this.isCollision = bool;
    }
    effectCollision(collision) {
        this.setIsCollision(true);
        switch (collision.type) {
            case "canvas":
                break;
            case "horse":
                console.log("horse");
                
                break;
            default:
                break;
        }
    }
    move(){
        if(!this.isCollision){
            this.x -= this.speed
        }else{
            this.scaleX += -0.01;
            this.alpha -= 0.005;
        }
    }
    draw(ctx){
        this.move();
        ctx.save();
        ctx.scale(this.scaleX, 1); // needed to flip the img
        ctx.textBaseline = "top";
        //ctx.fillStyle = "rgba(66, 140, 244, " + this.alpha + ")";
        ctx.fillStyle = "rgba(102, 255, 51, " + this.alpha + ")";
        drawText(ctx,this.x * (1 / this.scaleX),this.y,this.text,"bold 20px Arial",null);
        ctx.restore();
    }
}

function createTextExperience(ctx,canvasWidth){
    var tabText = ["Dut Informatique, Paris Descartes", "Ifocop, Dev Full Stack JS", "Dev Web, Institut de France", "Dev Web Le Smartsitting"];
    var selectedIndex = randomNumber(0,tabText.length-1);
    return new TextExperience(
        tabText[selectedIndex], 
        canvasWidth, 
        randomNumber(20, 500), 
        300, 
        20
    );
}