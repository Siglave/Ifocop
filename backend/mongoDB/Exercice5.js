// Retrouver les 5 premières piscines par ordre alphabétique ( et dont le champ zipCode existe)
db.piscines.find({ zipCode: { $exists: true } }).sort({ name: 1 }).limit(5);
// Ajoutez 2 piscines avec un champ nom au lieu de name
db.piscines.insert([
	{
		id: 30013,
		nom: 'Piscine Jim raynor',
		address: '70, rue Terran ',
		zipCode: 75013,
		lat: 48.832971,
		lon: 2.363437
	},
	{
		id: 30012,
		nom: 'Piscine Kerrigan',
		address: '70, rue Zerg ',
		zipCode: 75013,
		lat: 48.832943,
		lon: 2.366317
	}
]);

// Si je compte mes piscines, j'en ai donc 33
// Compter uniquement les piscines dont le champ name est présent
db.piscines.find({ name: { $exists: true } }).count();
// équivalent à
db.piscines.find({ nom: { $exists: false } }).count();

// Renvoie toutes les piscines ayant effectivement le champ name
db.piscines.find({ name: { $exists: true } });

// Limite à 5 résultats
db.piscines.find({ name: { $exists: true } }).limit(5);

// En les triant par ordre alphabétique (case sensitive)
db.piscines.find({ name: { $exists: true } }).sort({ name: 1 }).limit(5);
// En plus en limitant les champs retournés au nom
db.piscines.find({ name: { $exists: true } }, { name: 1 }).sort({ name: 1 }).limit(5);
