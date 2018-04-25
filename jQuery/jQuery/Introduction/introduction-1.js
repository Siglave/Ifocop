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
  console.log(balises);
};