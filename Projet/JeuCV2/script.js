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
class PlayerShip extends Coordinate {
	constructor(placeX, placeY) {
		super(placeX, placeY);
		var createImg = new Image();
		createImg.src = "img/PNG/playerShip1_blue.png";
		this.img = createImg;
		this.speed = 10;
		this.arrowMove = [
			{ keyCode: 38, keyIsUp: false }, //up
			{ keyCode: 40, keyIsUp: false }, //down
			{ keyCode: 37, keyIsUp: false }, //left
			{ keyCode: 39, keyIsUp: false } //right
		];
		this.lasers = [];
		setInterval(() => {
			this.lasers.push(new Laser(this.getX() - 3, this.getY()));
			this.lasers.push(
				new Laser(this.getX() + this.img.width - 10, this.getY())
			);
		}, 500);
	}
	move() {
		this.arrowMove.map(item => {
			if (item.keyIsUp) {
				switch (item.keyCode) {
					case 38: //up
						this.setY(this.getY() - this.speed);
						break;
					case 40: //down
						this.setY(this.getY() + this.speed);
						break;
					case 37: //left
						this.setX(this.getX() - this.speed);
						break;
					case 39: //right
						this.setX(this.getX() + this.speed);
						break;
					default:
						return;
				}
			}
		});
	}
	drawLasers(context) {
		this.lasers.map(laser => {
			if (laser.getY() < 0 - laser.size) {
				setTimeout(() => {
					var index = this.lasers.indexOf(laser);
					this.lasers.splice(index, 1);
				}, 0);
			} else {
				laser.draw(context);
			}
		});
	}
	draw(context) {
		this.move();
		context.drawImage(this.img, this.getX(), this.getY());
		this.drawLasers(context);
	}
}
class Laser extends Coordinate {
	constructor(placeX, placeY) {
		super(placeX, placeY);
		var createImg = new Image();
		createImg.src = "img/PNG/Lasers/laserBlue01.png";
		this.img = createImg;
		this.speed = 8;
		this.size = 60;
	}
	move() {
		this.setY(this.getY() - this.speed);
	}
	draw(context) {
		this.move();
		context.drawImage(
			this.img,
			this.getX(),
			this.getY(),
			this.size / 5,
			this.size
		);
	}
}

class Asteroid extends Coordinate {
	constructor(sidePx, poseX, posY) {
		super(poseX, posY);
		var createImg = new Image(sidePx, sidePx);
		var number = Math.floor(Math.random() * 4) + 1;
		createImg.src = "img/PNG/Meteors/meteorBrown_big" + number + ".png";
		this.img = createImg;
		this.size = sidePx;
		this.speed = 3;
	}
	move() {
		this.setY(this.getY() + this.speed);
	}
	draw(context) {
		this.move();
		context.drawImage(
			this.img,
			this.getX(),
			this.getY(),
			this.size,
			this.size
		);
	}
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");
	const player = new PlayerShip(300, 250);
	var arrayAsteroid = [];
	for (let i = 0; i < 10; i++) {
		arrayAsteroid.push(
			new Asteroid(
				randomNumber(50, 100),
				randomNumber(0, canvas.width),
				randomNumber(0, -canvas.height)
			)
		);
	}
	window.addEventListener(
		"keydown",
		function(event) {
			if (event.defaultPrevented) {
				return;
			}
			player.arrowMove.map(elem => {
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
		function(event) {
			if (event.defaultPrevented) {
				return;
			}
			player.arrowMove.map(elem => {
				if (elem.keyCode == event.keyCode) {
					elem.keyIsUp = false;
				}
			});
			event.preventDefault();
		},
		true
	);

	setTimeout(draw, 17);
	//window.requestAnimationFrame(draw);
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		arrayAsteroid.map(asteroid => {
			asteroid.draw(ctx);
			if (asteroid.getY() > canvas.height) {
				setTimeout(() => {
					//setTimout to avoid blink img
					var index = arrayAsteroid.indexOf(asteroid);
					arrayAsteroid.splice(index, 1);
					var sizeAsteroid = randomNumber(50, 100);
					arrayAsteroid.push(
						new Asteroid(
							sizeAsteroid,
							randomNumber(0, canvas.width),
							-sizeAsteroid
						)
					);
				}, 0);
			}
		});
		player.draw(ctx);
		setTimeout(draw, 17);
		//window.requestAnimationFrame(draw);
	}
});
