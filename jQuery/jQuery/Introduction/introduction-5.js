function outil(element) {
  var balises;
  var debut = element.slice(0,1);
  switch (debut) {
    case '#':
      element = element.slice(1);
      balises = new Array(document.getElementById(element));
      break;
    case '.':
      element = element.slice(1);
      balises = document.getElementsByClassName(element);
      break;
    default:
      balises = document.getElementsByTagName(element);
  }
  // Balises est un tableau contenant les balises ciblées
  return {
    balises: balises,
    balayage: function(fonctionAUtiliser) {
      for (var i=0;this.balises[i];i++) {
        fonctionAUtiliser(this.balises[i]);
      }
    },
    hide: function() {
      this.balayage(function(element) {
        element.style.display = 'none';
      });
      return this;
    },
    texte: function(leTexte) {
      this.balayage(function(element) {
        element.innerHTML = leTexte;
      });
      return this;
    },
    unStyle: function(leStyle,laValeur) {
      this.balayage(function(element) {
        element.style[leStyle] = laValeur;
      });
      return this;
    }
  };
};