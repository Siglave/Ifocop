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
    hide: function() {
      for (var i=0;this.balises[i];i++) {
        this.balises[i].style.display = 'none';
      }
    },
  };
};