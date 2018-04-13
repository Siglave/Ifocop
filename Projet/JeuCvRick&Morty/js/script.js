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
class Sprite {
    constructor(srcImg,sx,sy,sWidth,sHeight){
        
    }
}

class Character extends Coordinate{
    constructor(x, y){
        super(x, y);
    }
}

document.addEventListener("DOMContentLoaded", function () {
	var canvasGame = document.getElementById("gameCanvas");
	var canvasUI = document.getElementById("gameUI");
	var ctxGame = canvasGame.getContext("2d");
	var ctxUI = canvasUI.getContext("2d");
	window.requestAnimationFrame(loop);
	function loop() {
        //gameDraw
		window.requestAnimationFrame(loop);
	}
});