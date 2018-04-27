function clearCircle(ctx,radius,x,y,intervalX,intervalY){
    ctx.save();
    ctx.beginPath();
    ctx.arc(x+intervalX, y+intervalY, radius, 0, 2*Math.PI, true);
    ctx.clip();
    ctx.clearRect(x-radius+intervalX,y-radius+intervalY,radius*2,radius*2);
    ctx.restore();
}