function drawScore(ctx, x, y, text,canvasWidth) {
    ctx.font="40px Verdana";
    /* var gradient = ctx.createLinearGradient(0, 0, x, y);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red"); */
    // Fill with gradient
    ctx.fillStyle = "rgb(107, 244, 66)";
    ctx.fillText(text, x, y);
}