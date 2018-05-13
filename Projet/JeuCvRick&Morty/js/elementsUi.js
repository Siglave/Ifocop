function drawScore(ctx, x, y, text, canvasWidth) {
    ctx.font = "40px Verdana";
    // Fill with gradient
    ctx.fillStyle = "rgb(107, 244, 66)";
    ctx.fillText(text + " / 50", x, y);
}

function drawText(ctx, x, y, text, font, textAlign) {
    if (font) {
        ctx.font = font;
    }
    if (textAlign) {
        ctx.textAlign = textAlign;
    }
    ctx.fillText(text, x, y);
}

function drawMultipleText(ctx, arrayText) {
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    arrayText.map(function (elem) {
        drawText(ctx, elem.x, elem.y, elem.text, elem.font, elem.textAlign);
    });
}

function getCvPart1(canvasWidth, canvasHeight) {
    return [{
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
            font: "bold 20px Arial"
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
            x: canvasWidth / 2,
            y: 170,
            text: "Développeur Web Full Stack",
            textAlign: "center",
            font: "bold 24px Arial",
        },
    ];
}

function getSkillsCv(canvasWidth,canvasHeight){
    return [{
        x: 30,
        y: 320,
        text: "Compétences",
        textAlign: "start",
        font: "bold 20px Arial"
    },
    {
        x: 30,
        y: 350,
        text: "Langages informatiques",
        font: "bold 18px Arial"
    },
    {
        x: 45,
        y: 380,
        text: "- Langages Web : Javascript, Php, Html, Css",
        font: "18px Arial"
    },
    {
        x: 45,
        y: 400,
        text: "- SGBD : MYSQL",
        font: null
    },
    {
        x: 45,
        y: 420,
        text: "- Divers : Python, Java",
        font: null
    },
    {
        x: 30,
        y: 450,
        text: "Framework",
        font: "bold 18px Arial"
    },
    {
        x: 45,
        y: 480,
        text: "- Front : Bootstrap, Jquery, Angular, ReactJs",
        font: "18px Arial"
    },
    {
        x: 45,
        y: 500,
        text: "- Back : NodeJs, Express, Symfony",
        font: "18px Arial"
    },
    {
        x: 30,
        y: 530,
        text: "Langue",
        font: "bold 18px Arial"
    },
    {
        x: 45,
        y: 550,
        text: "- Anglais courant",
        font: "18px Arial"
    },
    {
        x: 30,
        y: 580,
        text: "Autres",
        font: "bold 18px Arial"
    },
    {
        x: 45,
        y: 600,
        text: "- Echanger sur les bugs rencontrés dans un projet",
        font: "18px Arial"
    },
    {
        x: 45,
        y: 620,
        text: "- Travailler en méthode agile",
        font: null
    },
];
}

function getEndCV(canvasWidth,canvasHeight){
    return [
        {
            x: 30,
            y: 650,
            text: "Projets",
            textAlign: "start",
            font: "bold 20px Arial"
        },
        {
            x: 45,
            y: 680,
            text: "- Jeu CV (Vanilla JS, HTML/CSS)",
            font: "18px Arial"
        },
        {
            x: 30,
            y: 710,
            text: "Experience professionnelle :",
            font: "bold 20px Arial"
        },
        {
            x: 45,
            y: 740,
            text: "- Smartsitting, réalisation de la plateforme web (Symfony 3, Jquery, Bootstrap, HTML/CSS)",
            font: "18px Arial"
        },
        {
            x: 45,
            y: 760,
            text: "- Institut de France, Réalisation d'une plateforme de gestion des dons (MVC, PHP, HTML/CSS)",
            font: "18px Arial"
        },
        {
            x: 30,
            y: 790,
            text: "Diplômes :",
            font: " bold 20px Arial"
        },
        {
            x: 45,
            y: 820,
            text: "- 2018-2019 Formation Full Stack Js en alternance, IFOCOP",
            font: "18px Arial"
        },
        {
            x: 45,
            y: 840,
            text: "- 2015-2017 DUT Informatique, Université Paris Descartes",
            font: "18px Arial"
        },
        {
            x: 45,
            y: 860,
            text: "- 2015 Baccalauréat(STI2D) mention \"Très bien \"",
            font: "18px Arial"
        },
        {
            x: 30,
            y: 890,
            text: "Centres D'intérêt :",
            font: "bold 20px Arial"
        },
        {
            x: 45,
            y: 910,
            text: "- Nouvelles technologies, Web, IA (Machine Learning, Deep learning), Espace (NASA, Space X)",
            font: "18px Arial"
        },
        {
            x: 45,
            y: 930,
            text: "- E-sports (Tournoi de jeu vidéo online/offline) ",
            font: null
        },
    ]
}
function drawCvPart1(ctx, canvasWidth, canvasHeight) {
    var textToDraw = getCvPart1(canvasWidth, canvasHeight);
    drawMultipleText(ctx, textToDraw);
}

function drawSkillsCv(ctx, canvasWidth, canvasHeight) {
    var textToDraw = getSkillsCv(canvasWidth,canvasHeight);
    drawMultipleText(ctx, textToDraw);
}

function drawMovingCV(ctx,tabCv,canvasWidth,canvasHeight){
    tabCv.map(function(elemText){
        elemText.y -= 0.3;
        if (elemText.y < 0) {
            elemText.y = canvasHeight*1.5;
        }
    });
    drawMultipleText(ctx,tabCv);
}