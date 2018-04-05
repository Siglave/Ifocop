var reponse;

var stats = {
  1: 0,
  2: 0,
  3: 0
};
var arrayResponse = ["pierre", "feuille", "ciseaux"];
var gameScore = { ordi: 0, player: 0 };
window.onload = function() {
  setScore();
};

var reponseAleatoire = function() {
  var max = 3;
  var min = 1;
  var randomOutOf3 = Math.floor(Math.random() * (max - min + 1)) + min;
  stats[randomOutOf3]++;
  return arrayResponse[randomOutOf3 - 1];
};

/*
var testRandomness = function(num) {
  for (var i = 0; i < num; i++) {
    reponseAleatoire()
  }
}

testRandomness(100000);
console.log('%cstats', 'color:#f90;', stats);
*/

var repondre = function() {
  var inputs = window.document.getElementsByName("reponse");
  for (var i = 0; inputs[i]; i++) {
    if (inputs[i].checked) {
      reponse = inputs[i].value;
    }
  }
  tour();
};

var resultat = function(txt) {
  var monDiv = document.getElementById("resultat");
  monDiv.innerHTML = txt;
};

var setScore = function() {
  var txt = "Player : " + gameScore.player + " Ordinateur : " + gameScore.ordi;
  var monDiv = document.getElementById("score");
  monDiv.innerHTML = txt;
};

var tour = function() {
  var repOrdi = reponseAleatoire();
  console.log(reponse);
  if (repOrdi == reponse) {
    resultat("égalité");
  }
  if (
    (repOrdi == "pierre" || reponse == "pierre") &&
    (repOrdi == "feuille" || reponse == "feuille")
  ) {
    if (repOrdi == "pierre") {
      gameScore.player += 1;
      resultat("Toi : " + reponse + " Ordi : " + repOrdi + " Gagné !");
    } else {
      gameScore.ordi += 1;
      resultat("Toi : " + reponse + " Ordi : " + repOrdi + " Perdu :(");
    }
  }
  if (
    (repOrdi == "pierre" || reponse == "pierre") &&
    (repOrdi == "ciseaux" || reponse == "ciseaux")
  ) {
    if (repOrdi == "pierre") {
      gameScore.ordi += 1;
      resultat("Toi : " + reponse + " Ordi : " + repOrdi + " Perdu :(");
    } else {
      gameScore.player += 1;
      resultat("Toi : " + reponse + " Ordi : " + repOrdi + " Gagné !");
    }
  }
  if (
    (repOrdi == "ciseaux" || reponse == "ciseaux") &&
    (repOrdi == "feuille" || reponse == "feuille")
  ) {
    if (repOrdi == "ciseaux") {
      gameScore.ordi += 1;
      resultat("Toi : " + reponse + " Ordi : " + repOrdi + " Perdu :(");
    } else {
      gameScore.player += 1;
      resultat("Toi : " + reponse + " Ordi : " + repOrdi + " Gagné !");
    }
  }
  setScore();
};
