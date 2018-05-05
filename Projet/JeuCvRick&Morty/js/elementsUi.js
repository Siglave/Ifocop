function drawScore(ctx, x, y, text, canvasWidth) {
    ctx.font = "40px Verdana";
    /* var gradient = ctx.createLinearGradient(0, 0, x, y);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red"); */
    // Fill with gradient
    ctx.fillStyle = "rgb(107, 244, 66)";
    ctx.fillText(text + " / 50", x, y);
}

function drawText(ctx, x, y, text, font,textAlign) {
    if (font) {
        ctx.font = font;
    }
    if(textAlign){
        ctx.textAlign = textAlign;
    }
    ctx.fillText(text, x, y);
}

function drawMultipleText(ctx, arrayText) {
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    arrayText.map(function (elem) {
        drawText(ctx, elem.x, elem.y, elem.text, elem.font,elem.textAlign);
    });
}

function drawCvPart1(ctx,canvasWidth,canvasHeight) {
    var textToDraw = [{
            x: 30,
            y: 30,
            text: "Pierre Rouzaud",
            font: "16px Arial"
        },
        {
            x: 30,
            y: 50,
            text: "Tél : 06 06 06 06 06",
            font: null
        },
        {
            x: 30,
            y: 70,
            text: "Mail : test@gmail.com",
            font: null
        },
        {
            x: 30,
            y: 90,
            text: "Age : 22 ans",
            font: null
        },
        {
            x: 30,
            y: 240,
            text: "Mes Atouts",
            font: "bold 18px Arial"
        },
        {
            x: 30,
            y: 270,
            text: "Mes compétences professionnelles  dans le développement Web à la fois front-end",
            font: "18px Arial"
        },
        {
            x: 30,
            y: 290,
            text: "et back-end associées à ma formation en Dut Informatique et ma capacité linguistique. ",
            font: null,
        },
        {
            x: canvasWidth/2,
            y: 170,
            text: "Développeur Web Full Stack",
            textAlign :"center",
            font: "bold 24px Arial",
        },
    ]
    drawMultipleText(ctx,textToDraw);
}