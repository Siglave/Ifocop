"use strict";

class Character extends Coordinate {
    constructor(img, x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
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
    }
    effectCollision(collision) {
        switch (collision.type) {
            case "canvas":
                switch (collision.direction) {
                    /* if collision with canvas add or sub speed to nullify movement and keep
					character to the same place */
                    case "left":
                        this.setX(this.getX() + this.speed);
                        break;
                    case "right":
                        this.setX(this.getX() - this.speed);
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
                        this.setX(this.getX() - this.speed);
                        this.animation.direction = "left";
                        break;
                    case 39: //right
                        this.setX(this.getX() + this.speed);
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

class CollisionDetector {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    isCollision(xObj1, yObj1, wObj1, hObj1, xObj2, yObj2, wObj2, hObj2) {
        if (
            xObj1 < xObj2 + wObj2 &&
            xObj1 + wObj1 > xObj2 &&
            yObj1 < yObj2 + hObj2 &&
            hObj1 + yObj1 > yObj2
        ) {
            return true;
        } else {
            return false;
        }
    }
    isOutCanvas(elem) {
        elem.setIsCollision(false);
        if (elem.y <= 0) {
            //Check up
            elem.effectCollision({
                type: "canvas",
                direction: "up"
            });
            return {
                isOut: false
            };
        }
        if (elem.y + elem.height >= this.canvasHeight) {
            //Check down
            elem.effectCollision({
                type: "canvas",
                direction: "down"
            });
            return {
                isOut: false
            };
        }
        if (elem.x < 0) {
            //Check left
            return elem.effectCollision({
                type: "canvas",
                direction: "left",
                offset: elem.x + elem.width,
                canvasWidth: this.canvasWidth
            });
        }
        if (elem.x + elem.width >= this.canvasWidth) {
            //Check right
            elem.effectCollision({
                type: "canvas",
                direction: "right"
            });
            return {
                isOut: false
            };
        }
        return {
            isOut: false
        };
    }
    testCollision() {}
    /* trucRick(elem,x){
		if (elem.getX() < x) {
			//Check left
		 	elem.effectCollision({
				type: "canvas",
				direction: "left"
			}); 
		}
	} */
}

class Game {
    constructor(objAssets, canvasWidth, canvasHeight, ctxs) {
        this.ctxs = ctxs; // obj ctxs {ui:ctx,game:ctx,back:ctx}
        this.objAssets = objAssets;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.collisionDetector = new CollisionDetector(
            canvasWidth,
            canvasHeight
        );
        /*         console.log(objAssets.characters.rick[0][0]);
         */
        this.characters = {
            rick: new Character(
                objAssets.characters.rick[0],
                60,
                canvasHeight / 3 * 2 - 80,
                60,
                79
            ),
            morty: new Character(
                objAssets.characters.morty[2],
                0,
                canvasHeight / 3 * 2 - 79,
                60,
                79
            )
        };
        this.actualStage = 0;
        this.stages = this.createStages();

        this.switchStage = this.switchStage.bind(this);
    }
    startGame() {
        this.stages[this.actualStage].loadListeners();
        this.stages[this.actualStage].start(
            this.ctxs,
            this.canvasWidth,
            this.canvasHeight,
            this.switchStage
        );
    }
    switchStage() {
        //Clear all Canvas
        this.ctxs.back.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctxs.game.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctxs.ui.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        //Clean movement of characters
        this.characters.rick.restartCharacter();
        this.characters.morty.restartCharacter();
        //Remove event of previous stage
        this.stages[this.actualStage].removeListener();
        //Change stage
        this.actualStage += 1;
        //Load event for the next stage and start it
        this.stages[this.actualStage].loadListeners();
        this.stages[this.actualStage].start(
            this.ctxs,
            this.canvasWidth,
            this.canvasHeight,
            this.switchStage
        );
    }
    createStages() {
        var stages = [];
        /////////////////////////////// STAGE 1 //////////////////////////////////////////
        var stage1FctDown = function (event) {
            if (event.defaultPrevented) {
                return;
            }
            //Only allow right move and sprint
            if (event.keyCode == 39 || event.keyCode == 16) {
                var fctMap = function (elem) {
                    if (elem.keyCode == event.keyCode) {
                        elem.keyIsUp = true;
                    }
                };
                this.characters.rick.arrowMove.map(fctMap);
                this.characters.morty.arrowMove.map(fctMap);
            }

            event.preventDefault();
        };
        var stage1FctUp = function (event) {
            if (event.defaultPrevented) {
                return;
            }
            var fctMap = function (elem, character) {
                if (elem.keyCode == event.keyCode) {
                    character.animation.frame = 0;
                    character.animation.direction = "stayStill";
                    elem.keyIsUp = false;
                    if (event.keyCode == 16) {
                        character.animation.maxTime = 10;
                        character.speed = 2;
                    }
                }
            };
            this.characters.rick.arrowMove.map(elem => {
                if (elem.keyCode == event.keyCode) {
                    this.characters.rick.animation.frame = 0;
                    this.characters.rick.animation.direction = "stayStill";
                    elem.keyIsUp = false;
                    if (event.keyCode == 16) {
                        this.characters.rick.animation.maxTime = 10;
                        this.characters.rick.speed = 2;
                    }
                }
            });
            this.characters.morty.arrowMove.map(elem => {
                if (elem.keyCode == event.keyCode) {
                    this.characters.morty.animation.frame = 0;
                    this.characters.morty.animation.direction = "stayStill";
                    elem.keyIsUp = false;
                    if (event.keyCode == 16) {
                        this.characters.morty.animation.maxTime = 10;
                        this.characters.morty.speed = 2;
                    }
                }
            });
            event.preventDefault();
        };
        var elemStage = {
            portal: this.objAssets.elements.portal[0]
        };
        var stage1 = new Stage(
            elemStage, [],
            this.characters,
            this.collisionDetector,
            stage1FctDown,
            stage1FctUp
        );

        stage1.start = function (ctxs, canvasWidth, canvasHeight, fctStop) {
            //Background
            ctxs.back.fillStyle = "white";
            ctxs.back.fillRect(0, 0, canvasWidth, canvasHeight);

            // Define portal
            var portal = new Portal(this.elemStage.portal, 870, 320, 175, 175);

            var rick = this.characters.rick;
            var morty = this.characters.morty;

            var objCollision = this.collisionDetector;

            var gradient = ctxs.game.createLinearGradient(0, 0, canvasWidth, 0);
            gradient.addColorStop("0", "black");
            gradient.addColorStop("0.5", "black");
            gradient.addColorStop("0.60", "yellow");
            gradient.addColorStop("1.0", "green");

            /*var tabobj = [{s:"truc",x:30,y:30},{s:"truc",x:30,y:30}];
			function nameFuntion(ctx,tabobj,font){
				ctx.font = font;
				tabobj.map(function(elem){
					ctx.fillText(elem.s,elem.x,elem.y);
				});
            } */
            
            ctxs.ui.font = "16px Arial";
            ctxs.ui.fillText("Pierre Rouzaud", 30, 30);
            ctxs.ui.fillText("Tél : 06 51 90 93 46", 30, 50);
            ctxs.ui.fillText("Mail : pierrerouzaud18@gmail.com", 30, 70);
            ctxs.ui.fillText("Age : 22 ans", 30, 90);

            ctxs.ui.font = "bold 18px Arial";
            ctxs.ui.fillText("Mes Atouts :", 30, 240);
            ctxs.ui.font = "18px Arial";
            ctxs.ui.fillText(
                "Mes compétences professionnelles  dans le développement Web à la fois front-end",
                30,
                270
            );
            ctxs.ui.fillText(
                "et back-end associées à ma formation en Dut Informatique et ma capacité linguistique. ",
                30,
                290
            );

            ctxs.ui.font = "bold 24px Arial";
            ctxs.ui.textAlign = "center";
            ctxs.ui.fillText(
                "Développeur Web Full Stack",
                canvasWidth / 2,
                170
            );

            ctxs.ui.font = "bold 18px Arial";
            ctxs.ui.fillText("Compétences : ", 900, 240);

            window.requestAnimationFrame(loop);

            function loop() {
                objCollision.isOutCanvas(rick);
                //objCollision.trucRick(rick,morty.x+morty.width);
                objCollision.isOutCanvas(morty);
                //gameDraw
                ctxs.game.clearRect(0, 0, canvasWidth, canvasHeight);

                ctxs.back.fillStyle = gradient;
                ctxs.back.fillRect(0, canvasHeight / 3 * 2, canvasWidth, 1);

                rick.draw(ctxs.game);
                morty.draw(ctxs.game);

                //blank block to make character disepear
                ctxs.game.fillStyle = "white";
                ctxs.game.fillRect(
                    900,
                    canvasHeight / 3 * 2 - 108,
                    canvasWidth,
                    108
                );
                //Draw portal
                portal.draw(ctxs.game);

                if (morty.x > canvasWidth - 130) {
                    fctStop();
                } else {
                    window.requestAnimationFrame(loop);
                }
            }
        };
        ///////////////////////// STAGE 2 //////////////////////////////////////

        var stage2FctDown = function (event) {
            if (event.defaultPrevented) {
                return;
            }
            var fctMap = function (elem) {
                if (elem.keyCode == event.keyCode) {
                    elem.keyIsUp = true;
                }
            };
            this.characters.morty.arrowMove.map(fctMap);

            event.preventDefault();
        };
        var stage2FctUp = function (event) {
            if (event.defaultPrevented) {
                return;
            }
            this.characters.morty.arrowMove.map(elem => {
                if (elem.keyCode == event.keyCode) {
                    this.characters.morty.animation.frame = 0;
                    this.characters.morty.animation.direction = "stayStill";
                    elem.keyIsUp = false;
                    if (event.keyCode == 16) {
                        this.characters.morty.animation.maxTime = 10;
                        this.characters.morty.speed = 2;
                    }
                }
            });
            event.preventDefault();
        };
        var elemStage2 = {
            morty: this.objAssets.characters.morty,
            rick: this.objAssets.characters.rick,
            clouds: this.objAssets.elements.clouds,
            skills: this.objAssets.elements.skills,
            bomb: this.objAssets.elements.bomb,
            explosion: this.objAssets.effects.explosion,
            portal : this.objAssets.elements.portal
        }
        var elemBackStage2 = this.objAssets.background.forest;
        var stage2 = new Stage(
            elemStage2,
            elemBackStage2,
            this.characters,
            this.collisionDetector,
            stage2FctDown,
            stage2FctUp
        );

        stage2.start = function (ctxs, canvasWidth, canvasHeight, fctStop) {
            var elemStage = this.elemStage;
            var endStage = false;
            //Background
            this.elemBack.map(function (elem) {
                var s = new Sprite(elem, 0, 0, elem.width, elem.height);
                s.draw(ctxs.back, 0, 0, canvasWidth, canvasHeight);
            });
            ///////////////////////////////
            // Define portal
            //var portal = getPortalElement(this.elemStage[0]);
            ///////////////////////////////////////////
            // Create Clouds and Skills
            var skills = [];
            var bombs = [];
            var clouds = [];
            for (var i = 0; i < 15; i++) {
                var cloud = new Cloud(
                    this.elemStage.clouds[randomNumber(0, this.elemStage.clouds.length - 1)],
                    canvasWidth + randomNumber(0, canvasWidth),
                    randomNumber(0, 150),
                    110,
                    70
                );
                cloud.speed = randomNumber(1, 3);

                var skillOrBomb = createSkillOrBomb(this.elemStage.skills, this.elemStage.bomb[0], this.elemStage.explosion[0], cloud, canvasWidth);
                if (skillOrBomb.type == "skill") {
                    skills.push(skillOrBomb.obj);
                } else {
                    bombs.push(skillOrBomb.obj);
                }
                clouds.push(cloud);
            }
            //////////////////////////////////////
            //Characters
            this.characters.rick.x = 850;
            this.characters.rick.y = 50;
            var rick = this.characters.rick;
            this.characters.morty.x = canvasWidth / 2;
            this.characters.morty.y = 465;
            this.characters.morty.changeImg(this.elemStage.morty[0]);
            var morty = this.characters.morty;
            ///////////////////////////////
            //Detect Collision
            var objCollision = this.collisionDetector;
            //////////////////////
            //Player
            var scorePlayer = 48;
            var visionPlayer = 100;
            //////////
            window.requestAnimationFrame(loopGame);

            function loopGame() {
                ctxs.game.clearRect(0, 0, canvasWidth, canvasHeight);
                ctxs.ui.clearRect(0, 0, canvasWidth, canvasHeight);
                // Collision
                objCollision.isOutCanvas(morty);

                //////////////
                if (visionPlayer < 550) {
                    ctxs.ui.fillStyle = "black";
                    ctxs.ui.fillRect(0, 0, canvasWidth, canvasHeight);
                    // to see morty
                    clearCircle(ctxs.ui, visionPlayer, morty.x, morty.y, 30, 30);
                    //////////////////
                    //to see rick
                    clearCircle(ctxs.ui, 70, rick.x, rick.y, 30, 35);
                }
                //////////////////               
                //Draw Clouds
                var testCollisionCloud;
                clouds.map(function (cloud) {
                    testCollisionCloud = objCollision.isOutCanvas(cloud);
                    if (testCollisionCloud.isOut) {
                        var skillOrBomb = createSkillOrBomb(elemStage.skills, elemStage.bomb[0], elemStage.explosion[0], cloud, canvasWidth);
                        if (skillOrBomb.type == "skill") {
                            skills.push(skillOrBomb.obj);
                        } else {
                            bombs.push(skillOrBomb.obj);
                        }
                    }
                    cloud.draw(ctxs.game);
                });
                skills.map(function (skill, index) {
                    if (
                        objCollision.isCollision(
                            morty.x,
                            morty.y,
                            morty.width,
                            morty.height,
                            skill.x,
                            skill.y,
                            skill.width,
                            skill.height - 35
                        ) && !skill.collision
                    ) { // Collision
                        setTimeout(function () {
                            scorePlayer += skill.score;
                            visionPlayer += 10*skill.score;
                            skill.collision = true;
                            //skills.splice(index, 1);
                            if (visionPlayer >= 200) {
                                if (visionPlayer >= 350) {
                                    if (visionPlayer >= 500) {
                                        morty.changeImg(elemStage.morty[3]);
                                    } else {
                                        morty.changeImg(elemStage.morty[2]);
                                    }
                                } else {
                                    morty.changeImg(elemStage.morty[1]);
                                }
                            }
                            if (scorePlayer >= 50) {
                                endStage = true;
                            }
                        }, 0);
                    } else { // Pas de collision
                        if (skill.y > canvasHeight || skill.alpha < 0) {
                            setTimeout(function () {
                                skills.splice(index, 1);
                            }, 0);
                        } else {
                            if (skill.x < skill.distanceFall) {
                                skill.draw(ctxs.game);
                            } else {
                                skill.draw(ctxs.ui);
                            }
                        }
                    }
                });

                bombs.map(function (bomb, index) {
                    if (
                        objCollision.isCollision(
                            morty.x,
                            morty.y,
                            morty.width,
                            morty.height,
                            bomb.x,
                            bomb.y,
                            bomb.width,
                            bomb.height - 35
                        ) && !bomb.explode
                    ) {
                        if(scorePlayer > 0){
                            scorePlayer -= 1;
                        }
                        bomb.explode = true;
                        if (visionPlayer >= 100) {
                            visionPlayer -= 20;
                            
                            if (visionPlayer <= 200) {
                                morty.changeImg(elemStage.morty[0]);
                            } else {
                                if (visionPlayer <= 350) {
                                    morty.changeImg(elemStage.morty[1]);
                                } else {
                                    if (visionPlayer <= 500) {
                                        morty.changeImg(elemStage.morty[2]);
                                    } else {
                                        morty.changeImg(elemStage.morty[3]);
                                    }
                                }
                            }
                        }
                    } else {
                        if (bomb.y > canvasHeight || bomb.animation.explosion.frame >= 12) {
                            setTimeout(function () {
                                bombs.splice(index, 1);
                            }, 0);
                        } else {
                            bomb.draw(ctxs.game);
                        }
                    }
                });

                ////////////////////
                //Morty
                rick.draw(ctxs.game);
                morty.draw(ctxs.game);
                //
                //Draw UI/////
                drawScore(ctxs.ui, canvasWidth / 2, 50, scorePlayer, canvasWidth);
                //////////////
                if(endStage){
                    window.requestAnimationFrame(loopEnd);
                }else{
                    window.requestAnimationFrame(loopGame);
                }
            }
            console.log(this.elemStage);
            
            var portalRick = new Portal(this.elemStage.portal[0], 900, 10, 175, 175);
            var portalMorty = new Portal(this.elemStage.portal[0], canvasWidth/2, 410, 175, 175);
            portalRick.setScaleXY(0,0);
            portalMorty.setScaleXY(0,0);
            function loopEnd(){
                ctxs.game.clearRect(0, 0, canvasWidth, canvasHeight);
                ctxs.ui.clearRect(0, 0, canvasWidth, canvasHeight);
                // Collision
                objCollision.isOutCanvas(morty);
                //Clean Cloud
                var testCollisionCloud;
                clouds.map(function (cloud,index) {
                    testCollisionCloud = objCollision.isOutCanvas(cloud);
                    if (testCollisionCloud.isOut) {
                        clouds.splice(index, 1);
                    }else{
                        cloud.draw(ctxs.game);
                    }
                });
                //Clean skills
                skills.map(function(skill,index){
                    if (skill.y > canvasHeight ) {
                        setTimeout(function () {
                            skills.splice(index, 1);
                        }, 0);
                    } else {
                        skill.draw(ctxs.game);
                    }
                });
                //Clean bombs
                bombs.map(function(bomb,index){
                    if (bomb.y > canvasHeight ) {
                        setTimeout(function () {
                            bombs.splice(index, 1);
                        }, 0);
                    } else {
                        bomb.draw(ctxs.game);
                    }
                });
                rick.draw(ctxs.game);
                morty.draw(ctxs.game);
                if (clouds.length == 0) {
                    if (portalMorty.scaleX < 0.4) {
                        portalMorty.scaleX += 0.002;
                        portalRick.scaleX += 0.002;
                    }
                    if (portalMorty.scaleY < 1) {
                        portalMorty.scaleY += 0.01;
                        portalRick.scaleY += 0.01;
                    }
                    portalMorty.draw(ctxs.game);
                    portalRick.draw(ctxs.game);
                }

                
                drawScore(ctxs.ui, canvasWidth / 2, 50, scorePlayer, canvasWidth);

              
                window.requestAnimationFrame(loopEnd);
            }
        };
        ////////////////////////////////////////////////////////////////////////
        stages.push(stage1);
        stages.push(stage2);

        return stages;
    }
}

class Stage {
    constructor(
        elemStage,
        elemBack,
        characters,
        collisionDetector,
        fctKeyDown,
        fctKeyUp
    ) {
        this.elemStage = elemStage;
        this.elemBack = elemBack;
        this.fctKeyDown = fctKeyDown;
        this.fctKeyUp = fctKeyUp;
        this.characters = characters;
        this.startStage = false;
        this.collisionDetector = collisionDetector;

        this.fctKeyDown = this.fctKeyDown.bind(this);
        this.fctKeyUp = this.fctKeyUp.bind(this);
    }
    loadListeners() {
        //load listeners bind this
        window.addEventListener("keydown", this.fctKeyDown);
        window.addEventListener("keyup", this.fctKeyUp);
    }
    removeListener() {
        //cancel listeners
        window.removeEventListener("keydown", this.fctKeyDown);
        window.removeEventListener("keyup", this.fctKeyUp);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    function initGameClass(objAssets) {
        var canvasBack = document.getElementById("gameBackGround");
        var canvasGame = document.getElementById("gameCanvas");
        var canvasUI = document.getElementById("gameUI");
        var ctxBack = canvasBack.getContext("2d");
        var ctxGame = canvasGame.getContext("2d");
        var ctxUI = canvasUI.getContext("2d");
        var ctxs = {
            ui: ctxUI,
            game: ctxGame,
            back: ctxBack
        };

        var game = new Game(
            objAssets,
            canvasBack.width,
            canvasBack.height,
            ctxs
        );
        game.startGame();
    }
    loadAssets(initGameClass);
});