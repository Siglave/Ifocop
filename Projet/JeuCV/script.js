
   
    class Coordinate{
        constructor(x=0,y=0){
            this.x = x;
            this.y = y;
        }
        setX(x){
            this.x = x;
        }
        setY(y){
            this.y = y;
        }
        getX(){
            return this.x;
        }
        getY(){
            return this.y;
        }
    }
    
    class Character{
        constructor(){
            this.coordinate = new Coordinate(300,250);
            this.isJumping = false;
            this.hightJump = 100 ;
            this.stateJump = "";//up and down valid value
            this.posStartJump = new Coordinate();
        }
        getCoordinate(){
            return this.coordinate;
        }
        setCoordinate(x,y){
            this.coordinate.setX(x);
            this.coordinate.setY(y);
        }
        jump(){
            this.isJumping = true;
            this.stateJump = "up";
            this.posStartJump = this.getCoordinate();
        }
        draw(context){
            if (this.isJumping) {
                if (this.stateJump == "up") {
                    this.setCoordinate(this.getCoordinate().getX(),this.getCoordinate().getY()-1);
                }
                if (this.stateJump == "down") {
                    this.setCoordinate(this.getCoordinate().getX(),this.getCoordinate().getY()+1);                    
                }
            }else{
                context.fillRect(this.getCoordinate().getX(),this.getCoordinate().getY(), 50, 50);
            }
        }
    }


document.addEventListener("DOMContentLoaded", function() {

    var canvas = document.getElementById('gameCanvas');
    var ctx = canvas.getContext('2d');
    //var player = new Character();
    /* player.draw(ctx);
   
    window.addEventListener("keydown", function (event) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (event.defaultPrevented) {
          return; // Should do nothing if the key event was already consumed.
        }
        switch (event.keyCode) {
          case 32://Space
          player.setCoordinate(player.getCoordinate().getX(),player.getCoordinate().getY()-10);
          player.draw(ctx);
            break;
          default:
            return; // Quit when this doesn't handle the key event.
        }
      
        // Consume the event for suppressing "double action".
        event.preventDefault();
      }, true);
  */
    const arrayBlocks = [];
    
    for (let i = 0; i < 10; i++) {
        var sizeSquare = 10+(Math.random()*50);
        arrayBlocks.push({coord : new Coordinate(Math.random()*700,Math.random()*300),size:sizeSquare});
    }
    setTimeout(draw,1000);

    function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        arrayBlocks.map((rect)=>{
            rect.coord.setX(rect.coord.getX()+1);
            ctx.fillRect(rect.coord.getX(),rect.coord.getY(), rect.size, rect.size);
            if(rect.coord.getX()>canvas.width){
                var index = arrayBlocks.indexOf(rect);
                arrayBlocks.splice(index, 1);
                var sizeSquare = 10+(Math.random()*50);
                arrayBlocks.push({coord : new Coordinate(0,Math.random()*300),size:sizeSquare});
            }
        });
    setTimeout(draw,17);
    }

});