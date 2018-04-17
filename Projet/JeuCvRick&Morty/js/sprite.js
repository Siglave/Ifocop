class Sprite {
    constructor(srcImg, sx, sy, sWidth, sHeight) {
        var img = new Image();
        img.src = srcImg;
        this.img = img;
        this.sX = sx;
        this.sY = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
    }
    draw(ctx, dx, dy, dWidth, dHeight) {
        ctx.drawImage(this.img, this.sX, this.sY, this.sWidth, this.sHeight, dx, dy, dWidth, dHeight);
    }
}

// width = 129, height = 166 516 * 498
// stay still x = 3 y = 3 
// animation left x = 3 y = 258



function getAnimationCharacter(srcImg) {
    var sWidth = 129;
    var sHeight = 166;
    var posX = 258;
    var posY = 3;
    var tabSprite = [];
    for (let i = 0; i < 4; i++) {
        tabSprite.push(new Sprite(srcImg, posX, posY, sWidth, sHeight));
        posx += sWidth + 3;
    }
    var objAnimation = {
        stayStill: new Sprite(srcImg, 3, 3, 129, 166),
        left: tabSprite,
        right: tabSprite,
        frame : 0,
    }
    return objAnimation;
}