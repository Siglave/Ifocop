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
		//console.log(this.arrowMove);
		/* 		ctx.fillStyle = "red";
				ctx.fillRect(this.x, this.y, this.width, this.height);
				ctx.fillRect(this.x + 200, this.y, this.width, this.height);
				ctx.fillRect(this.x + 400, this.y, this.width, this.height);
				ctx.fillRect(this.x + 600, this.y, this.width, this.height);
				ctx.fillRect(this.x + 800, this.y, this.width, this.height); */
		switch (this.animation.direction) {
			case "stayStill":
				this.animation.stayStill.draw(ctx, this.x, this.y, this.width, this.height);
				break;
			case "left":
				this.animation.left[this.animation.frame % 4].draw(ctx, this.x, this.y, this.width, this.height);
				this.animation.frame++;
				break;
			case "right":
				this.animation.left[this.animation.frame % 4].draw(ctx, this.x, this.y, this.width, this.height);
				this.animation.frame++;
				break;
			default:
				break;
		}
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

		var rick = new Character(tabAssets[0], 10, 20, 60, 79);
		rick.draw(ctxGame);
		var morty = new Character(tabAssets[1], 10, 200, 60, 79);
		morty.draw(ctxGame);

		//BACKGROUND////////////
		ctxBack.fillStyle = "black";
		ctxBack.fillRect(0, 0, canvasBack.width, canvasBack.height);
		///////////////////////
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
				event.preventDefault();
			},
			true
		);

		window.requestAnimationFrame(loop);

		function loop() {
			//gameDraw
			ctxGame.clearRect(0, 0, canvasGame.width, canvasGame.height);
			rick.draw(ctxGame);
			morty.draw(ctxGame);
			window.requestAnimationFrame(loop);
		}
	}

	var tabSrc = ["assets/character/Rick.png", "assets/character/Morty.png"]
	loadAssets(tabSrc, initGame);
});