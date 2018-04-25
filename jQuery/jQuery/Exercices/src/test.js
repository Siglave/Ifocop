 jQuery.noConflict();
(function($){
  jQuery.fn.horloge = function(){
    var balise = $(this);
    var texte = balise.html();
    function horloge(){
      var maintenant = new Date();
      balise.html( texte + '<p id="horloge">' + maintenant.getHours() + ':' + maintenant.getMinutes() + ':' + maintenant.getSeconds() + '</p>');
    };
    setInterval(horloge,1000);
  };
})(jQuery);




(function($) {
 $(document).ready(function(){
   
  $('#bidule').horloge();
 });
  
})(jQuery);