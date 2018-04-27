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



class Element extends Coordinate {
	constructor(img, x, y, width, height) {
		super(x, y);
		this.sprite = new Sprite(img, 0, 0, img.width, img.height);
		this.speed = 2;
		this.width = width;
		this.height = height;
	}
	move() {
		this.x += this.speed;
	}
	draw(ctx) {
		this.move();
		this.sprite.draw(this.x, this.y, this.width, this.height);
	}
}

class Character extends Coordinate {
	constructor(img, x, y, width, height) {
		super(x, y);
		this.width = width;
		this.height = height;
		this.animation = getAnimationCharacter(img);
		this.speed = 2;
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
	changeImg(img){
		this.animation = getAnimationCharacter(img);
	}
	restartCharacter() {
		this.arrowMove.map(function (elem) {
			elem.keyIsUp = false;
		});
		this.animation.direction = "stayStill";
	}
	move() {
		this.arrowMove.map(item => {
			if (item.keyIsUp) {
				/* this.speed = 2;
				this.animation.maxTime = 8; */
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
				this.animation.stayStill.draw(ctx, this.x, this.y, this.width, this.height);
				break;
			case "left":
				this.animation.left[this.animation.frame % 4].draw(ctx, this.x, this.y, this.width, this.height);
				if (this.animation.actualTime < this.animation.maxTime) {
					this.animation.actualTime++
				} else {
					this.animation.frame++;
					this.animation.actualTime = 0;
				}
				break;
			case "right":
				ctx.save();
				ctx.scale(-1, 1); // needed to flip the img
				this.animation.left[this.animation.frame % 4].draw(ctx, (this.x + this.width) * -1, this.y, this.width, this.height);
				if (this.animation.actualTime < this.animation.maxTime) {
					this.animation.actualTime++
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
		if (elem.getY() <= 0) {
			//Check up
			elem.effectCollision({
				type: "canvas",
				direction: "up"
			});
		}
		if (elem.getY() + elem.height >= this.canvasHeight) {
			//Check down
			elem.effectCollision({
				type: "canvas",
				direction: "down"
			});
		}
		if (elem.getX() <= 0) {
			//Check left
			elem.effectCollision({
				type: "canvas",
				direction: "left"
			});
		}
		if (elem.getX() + elem.width >= this.canvasWidth) {
			//Check right
			elem.effectCollision({
				type: "canvas",
				direction: "right"
			});
		}
	}
	testCollision() {

	}
}

class Game {
	constructor(tabAssets, canvasWidth, canvasHeight, ctxs) {
		this.ctxs = ctxs; // obj ctxs {ui:ctx,game:ctx,back:ctx}
		this.tabAssets = tabAssets;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.collisionDetector = new CollisionDetector(canvasWidth, canvasHeight);
		this.characters = {
			rick: new Character(tabAssets[0], 60, ((canvasHeight / 3) * 2) - 80, 60, 79),
			morty: new Character(tabAssets[1], 0, ((canvasHeight / 3) * 2) - 79, 60, 79),
		};
		this.actualStage = 0;
		this.stages = this.createStages();

		this.switchStage = this.switchStage.bind(this);
	}
	startGame() {
		this.stages[this.actualStage].loadListeners();
		this.stages[this.actualStage].start(this.ctxs, this.canvasWidth, this.canvasHeight, this.switchStage);
	}
	switchStage() {
		this.ctxs.back.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctxs.game.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctxs.ui.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		this.characters.rick.restartCharacter();
		this.characters.morty.restartCharacter();

		this.stages[this.actualStage].removeListener();
		this.actualStage += 1;
		this.stages[this.actualStage].loadListeners();
		this.stages[this.actualStage].start(this.ctxs, this.canvasWidth, this.canvasHeight, this.switchStage);
	}
	createStages() {
		var stages = [];
		/////////////////////////////// STAGE 1 //////////////////////////////////////////
		var stage1FctDown = function (event) {
			if (event.defaultPrevented) {
				return;
			}
			var fctMap = function (elem) {
				if (elem.keyCode == event.keyCode) {
					console.log("stage1");
					elem.keyIsUp = true;
				}
			}
			this.characters.rick.arrowMove.map(fctMap);
			this.characters.morty.arrowMove.map(fctMap);

			event.preventDefault();
		}
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
			}
			this.characters.rick.arrowMove.map(elem => {
				if (elem.keyCode == event.keyCode) {
					console.log("stage1 rick");
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
					console.log("stage1 morty");
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
		}
		var stage1 = new Stage([this.tabAssets[2]], [], this.characters, stage1FctDown, stage1FctUp);

		stage1.start = function (ctxs, canvasWidth, canvasHeight, fctStop) {
			//Background
			ctxs.back.fillStyle = "white";
			ctxs.back.fillRect(0, 0, canvasWidth, canvasHeight);

			// Define portal
			var speedPortal = 0.3;
			var posProtal = 300;
			var maxHPortal = 330;
			var dirPortal = true;
			var portal = getPortalElement(this.elemStage[0]);

			var rick = this.characters.rick;
			var morty = this.characters.morty;


			var gradient = ctxs.game.createLinearGradient(0, 0, canvasWidth, 0);
			gradient.addColorStop("0", "black");
			gradient.addColorStop("0.5", "black");
			gradient.addColorStop("0.60", "yellow");
			gradient.addColorStop("1.0", "green");

			ctxs.ui.font = "16px Arial";
			ctxs.ui.fillText("Pierre Rouzaud", 30, 30);
			ctxs.ui.fillText("Tél : 06 51 90 93 46", 30, 50);
			ctxs.ui.fillText("Mail : pierrerouzaud18@gmail.com", 30, 70);
			ctxs.ui.fillText("Age : 22 ans", 30, 90);

			ctxs.ui.font = "bold 18px Arial";
			ctxs.ui.fillText("Mes Atouts :", 30, 240);
			ctxs.ui.font = "18px Arial";
			ctxs.ui.fillText("Mes compétences professionnelles  dans le développement Web à la fois front-end", 30, 270);
			ctxs.ui.fillText("et back-end associées à ma formation en Dut Informatique et ma capacité linguistique. ", 30, 290);

			ctxs.ui.font = "bold 24px Arial";
			ctxs.ui.textAlign = "center";
			ctxs.ui.fillText("Développeur Web Full Stack", canvasWidth / 2, 170);

			ctxs.ui.font = "bold 18px Arial";
			ctxs.ui.fillText("Compétences : ", 900, 240);

			window.requestAnimationFrame(loop);

			function loop() {
				//gameDraw
				ctxs.game.clearRect(0, 0, canvasWidth, canvasHeight);

				ctxs.back.fillStyle = gradient;
				ctxs.back.fillRect(0, ((canvasHeight / 3) * 2), canvasWidth, 1);

				rick.draw(ctxs.game);
				morty.draw(ctxs.game);

				//blank block to make character disepear
				ctxs.game.fillStyle = "white";
				ctxs.game.fillRect(900, ((canvasHeight / 3) * 2) - 108, canvasWidth, 108);

				ctxs.game.save();
				ctxs.game.scale(-0.4, 1);
				if (posProtal < maxHPortal && dirPortal) {
					posProtal += speedPortal;
				} else {
					if (posProtal > 300) {
						posProtal = posProtal - speedPortal;
						dirPortal = false;
					} else {
						dirPortal = true;
					}
				}
				portal.draw(ctxs.game, -((canvasWidth + 175) * 2), posProtal, 175, 175);
				ctxs.game.restore();
				if (morty.x > canvasWidth - 130) {
					console.log(this);
					fctStop();
				} else {
					window.requestAnimationFrame(loop);
				}

			}
		}
		///////////////////////// STAGE 2 //////////////////////////////////////

		var stage2FctDown = function (event) {
			if (event.defaultPrevented) {
				return;
			}
			var fctMap = function (elem) {
				if (elem.keyCode == event.keyCode) {
					elem.keyIsUp = true;
				}
			}
			this.characters.morty.arrowMove.map(fctMap);

			event.preventDefault();
		}
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
		}
		var stage2 = new Stage([this.tabAssets[2],this.tabAssets[3],this.tabAssets[4],this.tabAssets[5]], [], this.characters, stage2FctDown, stage2FctUp);

		stage2.start = function (ctxs, canvasWidth, canvasHeight, fctStop) {
			//Background
			ctxs.back.fillStyle = "navy";
			ctxs.back.fillRect(0, 0, canvasWidth, canvasHeight);

			// Define portal
			var speedPortal = 0.3;
			var posProtal = 300;
			var maxHPortal = 330;
			var dirPortal = true;
			var portal = getPortalElement(this.elemStage[0]);

			this.characters.rick.x = 850;
			this.characters.rick.y = 50;
			var rick = this.characters.rick;
			this.characters.morty.x = canvasWidth/2;
			this.characters.morty.changeImg(this.elemStage[1]);
			var morty = this.characters.morty;

		

			window.requestAnimationFrame(loop);

			function loop() {
				ctxs.ui.fillStyle = "black";
				ctxs.ui.fillRect(0, 0, canvasWidth, canvasHeight);

				// to see morty
				clearCircle(ctxs.ui,100,morty.x,morty.y,30,30);
				//////////////////
				//to see rick
				clearCircle(ctxs.ui,70,rick.x,rick.y,30,35);
				//////////////////
				//ctxs.ui.clearRect(rick.x-(rick.width/2), rick.y-(rick.height/2), rick.width*2, rick.height*2);
				//gameDraw
				ctxs.game.clearRect(0, 0, canvasWidth, canvasHeight);

				ctxs.back.fillStyle = "black";
				ctxs.back.fillRect(0, ((canvasHeight / 3) * 2), canvasWidth, 1);

				rick.draw(ctxs.game);
				morty.draw(ctxs.game);


				
				window.requestAnimationFrame(loop);


			}
		}
		////////////////////////////////////////////////////////////////////////
		stages.push(stage1);
		stages.push(stage2);


		return stages;
	}
}

class Stage {
	constructor(elemStage, elemBack, characters, fctKeyDown, fctKeyUp) {
		this.elemStage = elemStage;
		this.elemBack = elemBack;
		this.fctKeyDown = fctKeyDown;
		this.fctKeyUp = fctKeyUp;
		this.characters = characters;
		this.startStage = false;

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

	function initGameClass(tabAssets) {
		var canvasBack = document.getElementById("gameBackGround");
		var canvasGame = document.getElementById("gameCanvas");
		var canvasUI = document.getElementById("gameUI");
		var ctxBack = canvasBack.getContext("2d");
		var ctxGame = canvasGame.getContext("2d");
		var ctxUI = canvasUI.getContext("2d");
		var ctxs = {
			ui: ctxUI,
			game: ctxGame,
			back: ctxBack,
		}

		var game = new Game(tabAssets, canvasBack.width, canvasBack.height, ctxs);
		game.startGame();

	}

	var tabSrc = [
		"assets/character/rick.png",
		"assets/character/morty.png", 
		"assets/elements/element.png", 
		"assets/character/mortyNoEye.png",
		"assets/character/mortyOneEye.png",
		"assets/character/mortyThreeEye.png",
	]
	//loadAssets(tabSrc, initGame);
	loadAssets(tabSrc, initGameClass);
});