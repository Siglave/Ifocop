class BackParallax extends Element{
    constructor(img,x,y,width,height,speed){
        super(x, y, width, height);
        this.img = new Sprite(img, 0, 0, img.width, img.height);
        this.speed = speed;
    }
    move(){
        this.x -= this.speed;
    }
    draw(ctx,canvasWidth,canvasHeight){
        this.move();
        this.img.draw(ctx, this.x, this.y, canvasWidth, canvasHeight);
        //if img is out of canvas draw an other img to fill the blank
        if (this.x < 0) {
            this.img.draw(ctx, this.x+canvasWidth, this.y, canvasWidth, canvasHeight);
        }
        //if image completely out set x to 0
        if ((this.x + canvasWidth)<= 0) {
            this.x = 0;
        }
    }
}

class Tile extends Element{
    constructor(img,x,y,width,height,speed){
        super(x,y,width,height);
        this.img = new Sprite(img, 0, 0, img.width, img.height);
        this.speed = speed;
    }
    move(){
        this.x -= this.speed;
    }
    draw(ctx){
        this.move();
        this.img.draw(ctx,this.x,this.y,this.width,this.height);
    }
}