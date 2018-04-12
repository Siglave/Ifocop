'use strict';

2; // Number
2.56567; // Number
NaN; // Number
Infinity; // Number

'Hello !'; // String
'42'; // String

true; // Boolean
2 !== '2'; // true

(function(){}); // Function

var concessionRenaut;
concessionRenaut = function(){
	// ici des trucs...
	return function(){
		// ici une Rono, une CLio
		// encore des trucs
	};
};

var titine = concessionRenaut();

titine();

// Objet
{};
// []; // Array est un sous type particulier d'objet

// On peut créér un objet littéral en JavaScript
var mesEtageres = {
	doubleFond: 'Jean-Michel la blatte', // ceci est un propriété de l'objet
	etAcote: 'Janine sa femme' // ATTENTION ON SEPARE CHAQUE PROPRIETE PAR DES VIRGULES
};
// C'est un exemple Notation Objet en JavaScript (JSON)
// On pourrait dire qu'une propriété c'est une "variable dans un objet"

// On peut accéder au propriété à l'aide du . 
mesEtageres.doubleFond; // contient : 'Jean-Michel la blatte'
// On peut également à l'aide des [] 
mesEtageres['doubleFond']; // contient : 'Jean-Michel la blatte'

// On peut assigner des contenus à de nouvelles propriétés.
mesEtageres.plancheDuHaut = 'Ma collection de Trolls de Troy';
mesEtageres['plancheDuMilieu'] = 'Ma collection de Lanfeust de Troy';
mesEtageres.plancheDuBas = 'Mes papiers administratifs';

// Propriétés des objets :
var maMaison = {
	aUnSonnette: true, // Un Boolean dans une propriété
    placard: ['slip', 'chemises', 'pantalon'],
	garage: {
		placeDeDroite: 'ma voiture (titine)'
	},
	surLaPorte: 'Sonnez !',
	sonner: function () {
		alert('Driinnnnng !');
	}
};

maMaison.aUnSonnette; // true
maMaison.placard[1]; // 'chemises'
maMaison.sonner(); // exécute la fonction dans la propriété sonner
maMaison['sonner'](); // exécute aussi la fonction dans la propriété sonner
maMaison.garage.placeDeDroite; // 'ma voiture (titine)'
maMaison.garage['placeDeDroite'];
maMaison['garage']['placeDeDroite'];
maMaison['garage'].placeDeDroite;

{}; // objet,
{}; // un autre objet,
{}; // encore un autre objet,
{}; // ca suffit maintenant,
{}; // tu te moque de moi,
{}; // un dernier pour la route.

var tab = ['un', 'deux', 'trois', 'soleil']; // objet particulier (Array)
// 'un' !!! Probleme : comment faire la différence "pointer sur l'index 1" et 0,1 => .1
// donc
tab[0]; // 'un'
tab['emplacement'] = 'titi';
tab.autreEmplacement = 'toto';
tab.emplacement; // 'titi'

// Les méthodes : "fonction dans une propriété d'un objet"
var medorLeChien = {
	cri: 'Waf !', // propriété
	aboitFort: function() { // fonction dans une propriété de cet objet s'appelle une Méthode !
		alert('Wif !');
		// Mot Clé this
		this; // référence à l'objet dans lequel se trouve la méthode ("fonction dans un objet").
		this.cri; // 'Waf !'
		this.cri = 'Wouf !';
	}
};

medorLeChien.cri; // 'Waf !'
medorLeChien.aboitFort();
medorLeChien.cri; // 'Wouf !'

var deuxCVDeluxe = {
	reservoir: 20, // propriété
	roule: function() { // méthode (propriété qui contient une fonction)
		alert('Vrouuuum !');
		// Mot Clé this
		//this; // la voiture => la 2 CV
		this.reservoir = this.reservoir - 1;
	}
};

deuxCVDeluxe.reservoir; // 20
deuxCVDeluxe.roule(); // affiche pour l'humain : Vrouuuum !
deuxCVDeluxe.reservoir; // 19
deuxCVDeluxe.roule(); // affiche pour l'humain : Vrouuuum !
deuxCVDeluxe.reservoir; // 18

// Unicité des objet :

var maVoiture = {
	modele: 'Tesla Model S',
	proprietaire: 'Sami'
};

var laVoituredeLuther = maVoiture;
laVoituredeLuther.proprietaire = 'Luther';
maVoiture.proprietaire; // 'Luther'
// On assigne la reference à l'objet et on ne copie pas l'objet lors d'une assignation.
// Si on veut dupliquer / cloner / copier un objet ben avec ce qu'on sait on PEUT PAS !
laVoituredeLuther = {
	modele: 'Tesla Model S',
	proprietaire: 'Luther'
};

// Autre exemple :
var laMaisonDeAmine = {
	salon: 'Canapé',
	sousLaTV: 'PS4'
};

var laMaisonDeSami = laMaisonDeAmine;
laMaisonDeSami.sousLaTV = 'Athlon X2 Socket 939 4600+ avec Ubuntu 16.04';
laMaisonDeAmine.sousLaTV; // 'Athlon X2 Socket 939 4600+ avec Ubuntu 16.04';

// Les objet sont créés 1 seule fois et 1 seul emplacement mémoire.
// La variable à laquelle on "assigne l'objet" contient l'adresse mémoire de l'objet.
// En réalité on assigne à la variable une référence à l'objet.

// Comment supprimer des propriétés d'un objet ?
// Mot clé : delete
var poubelle = {
	bedes: 'Picsou magazine et autre',
	livre: 'Programmer en Java 2'
}

delete poubelle.bedes;
delete poubelle.livre;

// ici mon objet contient {}

var blenderAPoussin = function(unPoussin) {
	if (unPoussin.raleDAgonie) {
		unPoussin.raleDAgonie();
	}
	return unPoussin.produit;
};

var resultat = blenderAPoussin({
	cri: 'Cui Cuik !',
	raleDAgonie: function(){
		alert(this.cri);
	},
	produit: 'nugget'
});

resultat; // nugget


var unePoule = function (p) {
	return {
		prenom: p,
		couleur: 'jaune',
		cri: function(){
			alert('Cui cui !');
		}
	};
};

var sortie = unePoule('georges');
var sortie2 = unePoule('janine');
var sortie3 = unePoule('jean-luc');
