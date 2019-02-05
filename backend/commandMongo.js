db.movies.insert({
    title :"La vache et le prisonnier",
    duration : 118,
    author :{
        firstName :"Henri",
        lastName: "Verneuil"
    },
    actors :[
        { lastName : "Fernandel"},
        { lastName : "Marguerite"},
        { lastName : "Havard", firstName: "René"}
    ],
    releaseDate : new Date("1959-05-18")
})

