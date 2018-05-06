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

function getPortalElement(img) {
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
        posX += sWidth + interval * 2;
    }
    var objAnimation = {
        stayStill: new Sprite(img, 7, 1, 120, 156),
        left: tabSprite,
        right: tabSprite,
        frame: 0,
        direction: "stayStill",
        maxTime: 10, // set how much time the frame appear before next one 
        actualTime: 0
    }
    return objAnimation;
}

function getAnimationBomb(img, imgExplosion) {
    return {
        frame: 0,
        maxTime: 10,
        actualTime: 0,
        bomb: [
            new Sprite(img, 24, 3, 77, 107),
            new Sprite(img, 149, 3, 84, 109),
            new Sprite(img, 277, 3, 83, 112)
        ],
        explosion: getAnimationExplosion(imgExplosion),
    }
}

function getAnimationExplosion(img) {
    return {
        frame: 0,
        maxTime: 3,
        actualTime: 0,
        explode: [
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
            new Sprite(img, 292, 294, 48, 52),
            new Sprite(img, 421, 296, 45, 49),
        ]
    }
}

function loadImgs(tabSrc, callback) {
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

function loadAssets(callback) {
    var assetsSrc = {
        background: {
            forest: [
                "assets/background/forest/background.png",
                "assets/background/forest/bigClouds.png",
                "assets/background/forest/hill.png",
                "assets/background/forest/bushes.png",
                "assets/background/forest/distantTrees.png",
                "assets/background/forest/tree.png",
                "assets/background/forest/ground.png"
            ],
            western: [
                "assets/background/western/background.png",
                "assets/background/western/stars.png",
                "assets/background/western/sun.png",
                "assets/background/western/mountains.png",
                "assets/background/western/clouds.png",
                "assets/background/western/layer4.png",
                "assets/background/western/layer3.png",
                "assets/background/western/layer2.png",
                "assets/background/western/layer1.png"
            ]
        },
        characters: {
            rick: [
                "assets/character/rick.png"
            ],
            morty: [
                "assets/character/mortyNoEye.png",
                "assets/character/mortyOneEye.png",
                "assets/character/morty.png",
                "assets/character/mortyThreeEye.png",
            ],
        },
        effects: {
            explosion: ["assets/effects/effectExplo.png"],
        },
        elements: {
            bomb: [
                "assets/elements/bomb.png"
            ],
            clouds: [
                "assets/elements/cloud1.png",
                "assets/elements/cloud2.png",
                "assets/elements/cloud3.png",
                "assets/elements/cloud4.png",
                "assets/elements/cloud5.png",
            ],
            portal: [
                "assets/elements/element.png"
            ],
            skills: [
                "assets/skills/html.png",
                "assets/skills/css.png",
                "assets/skills/js.png",
                "assets/skills/php.png",
                "assets/skills/jquery.png",
                "assets/skills/bootstrap.png",
                "assets/skills/angular.png",
                "assets/skills/react.png",
                "assets/skills/symfony.png",
                "assets/skills/nodejs.png",
                "assets/skills/mongodb.png",
                "assets/skills/mysql.png",
            ]
        }
    }
    var assets = {
        background: {
            forest: null,
            western: null,
        },
        characters: {
            rick: null,
            morty: null,
        },
        effects: {
            explosion: null,
        },
        elements: {
            bomb: null,
            clouds: null,
            portal: null,
            skills: null
        }
    }
    loadImgs(assetsSrc.background.forest, function (tabImg) {
        assets.background.forest = tabImg;
        loadImgs(assetsSrc.characters.rick, function (tabImg) {
            assets.characters.rick = tabImg;
            loadImgs(assetsSrc.characters.morty, function (tabImg) {
                assets.characters.morty = tabImg;
                loadImgs(assetsSrc.effects.explosion, function (tabImg) {
                    assets.effects.explosion = tabImg;
                    loadImgs(assetsSrc.elements.bomb, function (tabImg) {
                        assets.elements.bomb = tabImg;
                        loadImgs(assetsSrc.elements.clouds, function (tabImg) {
                            assets.elements.clouds = tabImg;
                            loadImgs(assetsSrc.elements.portal, function (tabImg) {
                                assets.elements.portal = tabImg;
                                loadImgs(assetsSrc.elements.skills, function (tabImg) {
                                    assets.elements.skills = tabImg;
                                    loadImgs(assetsSrc.background.western,function(tabImg){
                                        assets.background.western = tabImg;
                                        callback(assets);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });


}