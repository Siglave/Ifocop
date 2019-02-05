// Revenez sur la base "ifocop"
// Trouver un film dont le nom contient 'vache' (en utilisant une expression régulière)

db.movies.find({ title: {$regex : "vache"}  });
db.movies.find({ title: /vache/  });
// équivalent


// Afficher uniquement le prenom des acteurs de ce film
db.movies.find({ title: {$regex : "vache"}  }, { ["actors.lastName"] : 1})


// Trouver les films dont un acteur s'appelle René i = non sensible à la casse
db.movies.find({ ["actors.firstName"] : /René/i })

