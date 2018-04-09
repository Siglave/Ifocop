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
		this.width = 100;
		this.height = 75;
		this.speed = 8;
		this.isCollision = false;
		this.arrowMove = [
			{ keyCode: 38, keyIsUp: false }, //up
			{ keyCode: 40, keyIsUp: false }, //down
			{ keyCode: 37, keyIsUp: false }, //left
			{ keyCode: 39, keyIsUp: false } //right
		];
		this.lasers = [];
		setInterval(() => {
			this.lasers.push(new Laser(this.getX() - 2, this.getY()));
			this.lasers.push(
				new Laser(this.getX() + this.width - 10, this.getY())
			);
		}, 500);
	}

	setIsCollision(val) {
		this.isCollision = val;
	}
	effectCollision(collision) {
		
		switch (collision.type) {
			case "canvas":
				//Handle in move()
				break;
			case "asteroid":
				console.log("percute un asteroide");
				break;
			default:
				break;
		}
	}
	move(canvasWidth,canvasHeight) {
		this.arrowMove.map(item => {
			if (item.keyIsUp) {
				switch (item.keyCode) {
					case 38: //up
						if (this.getY() > 0) {
							this.setY(this.getY() - this.speed);			
						}else{
							this.setY(0);
						}
						break;
					case 40: //down
						if (this.getY() + this.height < canvasHeight) {
							this.setY(this.getY() + this.speed);
						}else{
							this.setY(canvasHeight - this.height);
						}
						break;
					case 37: //left
						if (this.getX() > 0) {
							this.setX(this.getX() - this.speed);
						}else{
							this.setX(0);
						}
						break;
					case 39: //right
						if (this.getX() + this.width < canvasWidth) {
							this.setX(this.getX() + this.speed);
						}else{
							this.setX(canvasWidth - this.width);
						}
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
				// 0 equal limit of canvas
				setTimeout(() => {
					var index = this.lasers.indexOf(laser);
					this.lasers.splice(index, 1);
				}, 0);
			} else {
				laser.draw(context);
			}
		});
	}
	draw(context,canvasWidth,canvasHeight) {		
		if (!this.isCollision) {
			this.move(canvasWidth,canvasHeight);
		}
		context.drawImage(
			this.img,
			this.getX(),
			this.getY(),
			this.width,
			this.height
		);
		this.drawLasers(context);
		this.isCollision = false;
	}
}
class Laser extends Coordinate {
	constructor(placeX, placeY) {
		super(placeX, placeY);
		var createImg = new Image();
		createImg.src = "img/PNG/Lasers/laserBlue01.png";
		this.img = createImg;
		this.speed = 12;
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
		this.width = sidePx;
		this.height = sidePx;
		this.speed = 5;
	}
	move() {
		this.setY(this.getY() + this.speed);
	}
	draw(context) {
		this.move();
/* 		context.fillRect(this.getX(),
		this.getY(),
		this.width,
		this.height);  */
		context.drawImage(
			this.img,
			this.getX(),
			this.getY(),
			this.width,
			this.height
		);
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
			elem.effectCollision({ type: "canvas", direction: "up" });
		}
		if (elem.getY() + elem.height >= this.canvasHeight) {
			//Check down
			elem.effectCollision({ type: "canvas", direction: "down" });
		}
		if (elem.getX() <= 0) {
			//Check left
			elem.effectCollision({ type: "canvas", direction: "left" });
		}
		if (elem.getX() + elem.width >= this.canvasWidth) {
			//Check right
			elem.effectCollision({ type: "canvas", direction: "right" });
		}
	}
	testCollision(playerShip, arrayAsteroid) {
		//this.isOutCanvas(playerShip);
		arrayAsteroid.map(asteroid => {
			if (
				this.isCollision(
					playerShip.getX(),
					playerShip.getY(),
					playerShip.width,
					playerShip.height,
					asteroid.getX(),
					asteroid.getY(),
					asteroid.width,
					asteroid.height
				)
			) {
				playerShip.effectCollision({ type: "asteroid" });
			}
		});
	}
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");
	var collisionDetector = new CollisionDetector(canvas.width, canvas.height);
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

	window.requestAnimationFrame(draw);
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		collisionDetector.testCollision(player, arrayAsteroid);
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
		player.draw(ctx,canvas.width,canvas.height);
		window.requestAnimationFrame(draw);
	}
});
