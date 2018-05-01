// http://spritedatabase.net/file/21543/Horse
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

function getPortalElement(img){
    return new Sprite(img, 2483, 329, 670, 670);
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
        direction:"stayStill",
        maxTime : 10,// set how much time the frame appear before next one 
        actualTime : 0
    }
    return objAnimation;
}
function getAnimationBomb(img,imgExplosion){
    return {
        frame: 0,
        maxTime : 10,
        actualTime : 0,
        bomb : [ 
            new Sprite(img, 24, 3, 77, 107),
            new Sprite(img, 149, 3, 84, 109), 
            new Sprite(img, 277, 3, 83, 112)
        ],
        explosion: getAnimationExplosion(imgExplosion),
    }
}
function getAnimationExplosion(img){
    return {
        frame: 0,
        maxTime : 3,
        actualTime : 0,
        explode : [ 
            new Sprite(img, 30, 19, 66, 76),
            new Sprite(img, 140, 9, 96, 109), 
            new Sprite(img, 263, 1, 108, 121),
            new Sprite(img, 391, 4, 113, 119),
            new Sprite(img, 11, 133, 106, 115),
            new Sprite(img, 141, 134, 102, 114),
            new Sprite(img, 269, 141, 95, 97),
            new Sprite(img, 398, 142, 93, 92),
            new Sprite(img, 24, 273, 79, 88),
            new Sprite(img, 165, 294, 47, 53),
            new Sprite(img, 292, 294, 48,52),
            new Sprite(img, 421, 296, 45, 49),
        ]
    }
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