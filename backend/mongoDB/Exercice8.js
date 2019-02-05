// Exercices de mises � jour

// db.collection.update(query, update, options)

// Reprendre la base paris

// On ajoute un champ 'acces_handicape' � true aux piscines du 13�me

// Par d�faut update() ne modifie que le premier �l�ment qui matche

//Il faut ajouter l'option multi:true pour que la mise � jour se fasse pour tous les enregistrements
db.piscines.update({ zipCode: 75013 }, {$set :{acces_handicape: true}}, { multi : true });


// L'option upsert : true ajoute un document si aucun document ne correspond ou modifie si un document correspond 

// On peut d�finir des champs et en supprimer dans la meme requete
// Ajouter un champ verif true et supprimer l'acc�s handicap�
db.piscines.update({}, {$unset :{acces_handicape: true}, $set :{ verif :true}}, { multi : true });





