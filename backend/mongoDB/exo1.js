//Model Piscine
const piscine = {
	id: 2929,
	name: 'Piscine Dunois',
	address: '70, rue Dunois ',
	zipCode: 75013,
	lat: 48.832973,
	lon: 2.366437
};
// Compter les piscines
db.piscines.find().count();
//ou
db.piscines.count();

//Pour les piscinse du 11eme
db.piscines.find({ zipCode: 75011 });
db.piscines.count({ zipCode: 75011 });

//Pour les piscinse du 11eme afficher seulement le nom et code postal
db.piscines.find(
	{ zipCode: 75011 },
	{ name: 1, zipCode: 1 } //projection
);
//La projection permet de limiter les champs

//Pour limiter le nombre de résultats, on utilise
db.piscines.find().limit(5);
//Pour trier par name;
//ASC
db.piscines.find().limit(5).sort({ name: 1 });
//DESC
db.piscines.find().limit(5).sort({ name: -1 });
