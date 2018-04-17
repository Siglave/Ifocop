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
	constructor(x, y, srcSprite, width, height) {
		super(x, y);
		this.width = width;
		this.height = height;
		this.animation = getAnimationCharacter(srcSprite);

	}
}

document.addEventListener("DOMContentLoaded", function () {
	var canvasBack = document.getElementById("gameBackGround");
	var canvasGame = document.getElementById("gameCanvas");
	var canvasUI = document.getElementById("gameUI");
	var ctxBack = canvasBack.getContext("2d");
	var ctxGame = canvasGame.getContext("2d");
	var ctxUI = canvasUI.getContext("2d");
	var rick = new Character(10, 20, "../assets/character/Rick.png");

	ctxBack.fillStyle = "black";
	ctxBack.fillRect(0, 0, canvasBack.width, canvasBack.height);
	
	
	window.requestAnimationFrame(loop);

	function loop() {
		//gameDraw
		window.requestAnimationFrame(loop);
	}
});