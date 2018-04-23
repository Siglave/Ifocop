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
			} //right
		];
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
		this.ctxs = ctxs;// obj ctxs {ui:ctx,game:ctx,back:ctx}
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.characters = {
			rick: new Character(tabAssets[0], 60, ((canvasHeight / 3) * 2) - 80, 60, 79),
			morty: new Character(tabAssets[1], 0, ((canvasHeight / 3) * 2) - 79, 60, 79),
		}
		this.stages = this.createStages();
	}
	createStages() {
		var stages = [];

		stage1 = {
			
		};

		stages.push(stage1);
		return stages;
	}
}

class Stage {
	constructor() {
	}
	start() {
		//load listeners
	}
	loop() {

	}
	end() {
		//cancel listeners
	}
}

document.addEventListener("DOMContentLoaded", function () {

	function initGame(tabAssets) {
		var canvasBack = document.getElementById("gameBackGround");
		var canvasGame = document.getElementById("gameCanvas");
		var canvasUI = document.getElementById("gameUI");
		var ctxBack = canvasBack.getContext("2d");
		var ctxGame = canvasGame.getContext("2d");
		var ctxUI = canvasUI.getContext("2d");

		var rick = new Character(tabAssets[0], 60, ((canvasGame.height / 3) * 2) - 80, 60, 79);
		var morty = new Character(tabAssets[1], 0, ((canvasGame.height / 3) * 2) - 79, 60, 79);

		var portal = getPortalElement(tabAssets[2]);
		console.log(tabAssets);

		//BACKGROUND////////////
		ctxBack.fillStyle = "white";
		ctxBack.fillRect(0, 0, canvasBack.width, canvasBack.height);
		///////////////////////	
		//Game/////////////////

		var gradient = ctxGame.createLinearGradient(0, 0, canvasGame.width, 0);
		gradient.addColorStop("0", "black");
		gradient.addColorStop("0.5", "black");
		gradient.addColorStop("0.60", "yellow");
		gradient.addColorStop("1.0", "green");

		window.addEventListener(
			"keydown",
			function (event) {
				if (event.defaultPrevented) {
					return;
				}
				rick.arrowMove.map(elem => {
					if (elem.keyCode == event.keyCode) {
						elem.keyIsUp = true;
					}
				});
				morty.arrowMove.map(elem => {
					if (elem.keyCode == event.keyCode) {
						elem.keyIsUp = true;
					}
				});
				event.preventDefault();
			},
			true
		);
		window.addEventListener(
			"keyup",
			function (event) {
				if (event.defaultPrevented) {
					return;
				}
				rick.arrowMove.map(elem => {
					if (elem.keyCode == event.keyCode) {
						rick.animation.frame = 0;
						rick.animation.direction = "stayStill"
						elem.keyIsUp = false;
					}
				});
				morty.arrowMove.map(elem => {
					if (elem.keyCode == event.keyCode) {
						morty.animation.frame = 0;
						morty.animation.direction = "stayStill"
						elem.keyIsUp = false;
					}
				});
				event.preventDefault();
			},
			true
		);

		window.requestAnimationFrame(loop);

		ctxUI.font = "16px Arial";
		ctxUI.fillText("Pierre Rouzaud", 30, 30);
		ctxUI.fillText("Tél : 06 51 90 93 46", 30, 50);
		ctxUI.fillText("Mail : pierrerouzaud18@gmail.com", 30, 70);
		ctxUI.fillText("Age : 22 ans", 30, 90);

		ctxUI.font = "bold 18px Arial";
		ctxUI.fillText("Mes Atouts :", 30, 240);
		ctxUI.font = "18px Arial";
		ctxUI.fillText("Mes compétences professionnelles  dans le développement Web à la fois front-end", 30, 270);
		ctxUI.fillText("et back-end associées à ma formation en Dut Informatique et ma capacité linguistique. ", 30, 290);

		ctxUI.font = "bold 24px Arial";
		ctxUI.textAlign = "center";
		ctxUI.fillText("Développeur Web Full Stack", canvasUI.width / 2, 170);

		ctxUI.font = "bold 18px Arial";
		ctxUI.fillText("Compétences : ", 900, 240);

		var speedPortal = 0.3;
		var posProtal = 300;
		var maxHPortal = 330;
		var dirPortal = true;

		function loop() {
			//gameDraw
			ctxGame.clearRect(0, 0, canvasGame.width, canvasGame.height);

			/* ctxGame.beginPath();
			ctxGame.strokeStyle = gradient;
			ctxGame.moveTo(0, (canvasGame.height / 3) * 2);
			ctxGame.lineTo(canvasGame.width, (canvasGame.height / 3) * 2);
			ctxGame.moveTo(0, ((canvasGame.height / 3) * 2) + 1);
			ctxGame.lineTo(canvasGame.width, ((canvasGame.height / 3) * 2) - 1);
			ctxGame.stroke();
 */

			ctxBack.fillStyle = gradient;
			ctxBack.fillRect(0, ((canvasGame.height / 3) * 2), canvasBack.width, 1);

			rick.draw(ctxGame);
			morty.draw(ctxGame);

			//blank block to make character disepear
			ctxGame.fillStyle = "white";
			ctxGame.fillRect(900, ((canvasGame.height / 3) * 2) - 108, canvasBack.width, 108);

			ctxGame.save();
			ctxGame.scale(-0.4, 1);
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
			portal.draw(ctxGame, -((canvasGame.width + 175) * 2), posProtal, 175, 175);
			ctxGame.restore();

			window.requestAnimationFrame(loop);

		}
	}

	var tabSrc = ["assets/character/Rick.png", "assets/character/Morty.png", "assets/elements/element.png"]
	loadAssets(tabSrc, initGame);
});