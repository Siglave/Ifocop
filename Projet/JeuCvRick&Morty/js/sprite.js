class Sprite {
    constructor(img, sx, sy, sWidth, sHeight) {
        /* var img = new Image(sWidth,sHeight);
        img.src = srcImg; */
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

function getAnimationCharacter(img) {
    // console.log(srcImg);
    var sWidth = 120;
    var sHeight = 158;
    var interval = 4.5;
    var posX = 9;
    var posY = 167;
    var tabSprite = [];
    for (let i = 0; i < 4; i++) {
        tabSprite.push(new Sprite(img, posX, posY, sWidth, sHeight));
        posX += sWidth + interval*2 ;
    }
    var objAnimation = {
        stayStill: new Sprite(img, 7, 1, 120, 156),
        left: tabSprite,
        right: tabSprite,
        frame: 0,
        direction:"stayStill"
    }
    return objAnimation;
}

function loadAssets(tabSrc, callback) {
    var tabRetImg = [];
    tabSrc.map(function (src, index) {
        var oneImg = new Image();
        oneImg.src = src;
        oneImg.onload = function () {
            if (tabSrc.length - (index + 1) == 0) {
                callback(tabRetImg);
            }
        }
        tabRetImg.push(oneImg);
    });

}