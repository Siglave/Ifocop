// Créer une base de données newyork et une collection restaurants
// Importer le fichier restaurant.json
// sur PC : Se mettre dans le dossier où il y l'executable mongoimport
var restaurant = {
	_id: ObjectId('5c599484cc3b19f59999e2d4'),
	address: {
		building: '469',
		coord: [ -73.961704, 40.662942 ],
		street: 'Flatbush Avenue',
		zipcode: '11225'
	},
	borough: 'Brooklyn',
	cuisine: 'Hamburgers',
	grades: [
		{
			date: ISODate('2014-12-30T00:00:00Z'),
			grade: 'A',
			score: 8
		},
		{
			date: ISODate('2014-07-01T00:00:00Z'),
			grade: 'B',
			score: 23
		},
		{
			date: ISODate('2013-04-30T00:00:00Z'),
			grade: 'A',
			score: 12
		},
		{
			date: ISODate('2012-05-08T00:00:00Z'),
			grade: 'A',
			score: 12
		}
	],
	name: "Wendy'S",
	restaurant_id: '30112340'
};

// Combien y a-t-il de restaurants ?
db.restaurants.count();
// Identique à
// Identique à
// Trouver les restaurants qui sont dans la rue "Morris Park Ave"
db.restaurants.find({ ['address.street']: 'Morris Park Ave' }).pretty();

// Pour aussi récupérer ceux qui ont pour rue "Morris Park Avenue"
db.restaurants.find({ ['address.street']: /Morris Park Ave/ }).pretty();
// Combien y en-a-t-il ?
db.restaurants.find({ ['address.street']: /Morris Park Ave/ }).count();
//36
// Afficher uniquement (sans l'id) les champs quartier, type de cuisine et adresse
db.restaurants.find({ ['address.street']: /Morris Park Ave/ }, { borough: true, cuisine: true, address: true });

// Trouver la liste des restaurants situés à Staten Island qui font des hamburgers OU de la boulangerie.
// Avec un $or
db.restaurants.find({ borough: 'Staten Island', $or: [ { cuisine: 'Bakery' }, { cuisine: 'Hamburgers' } ] }).pretty();
// Avec un $in
db.restaurants.find({ borough: 'Staten Island', cuisine: { $in: [ 'Bakery', 'Hamburgers' ] } }).pretty();

// La varibale restaurants est un objet. Dans mongo, ils appellent cela un curseur...
// Parcours d'un curseur avec un while
var restaurantsCursor = db.restaurants.find({ borough: 'Staten Island', cuisine: { $in: [ 'Bakery', 'Hamburgers' ] } });
while (restaurantsCursor.hasNext()) {
	print('Hello ' + restaurantsCursor.next().cuisine);
}
// Parcours d'un curseur avec un foreach
var restaurantsCursor = db.restaurants.find({ borough: 'Staten Island', cuisine: { $in: [ 'Bakery', 'Hamburgers' ] } });
restaurantsCursor.forEach(printjson);

// Quel est le type de restaurant le plus présent ?
var restaurantsCursor = db.restaurants.find();
var countType = {};
restaurantsCursor.forEach(function(doc) {
	if (!countType[doc.cuisine]) {
		countType[doc.cuisine] = 1;
	} else {
		countType[doc.cuisine] += 1;
	}
});
printjson(countType);
// Autre méthode. Plus élégante ??

db.restaurants.aggregate([
    {"$group" : { _id :"$cuisine", count:{$sum:1}}},
    { $sort: { count: -1 }}
  ])


// nous allons parler de curseurs
