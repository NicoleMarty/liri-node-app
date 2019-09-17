//require("dotenv").config();

//node liri.js concert-this <artist/band name here>

//node liri.js spotify-this-song '<song name here>'
//var keys = require("./keys.js");
//var spotify = new spotify(keys.spotify);

//VARIABLES FOR ALL COMMANDS
var axios = require("axios");
//Identifies command ("movie-this", "concert-this", or "spotify-this-song") as index 2 after liri.js
var command = process.argv[2];
//Identifies query ("<movie name here>", <artist/band name here>, or "<song name here>") as index 3 after command
var query = process.argv[3];


//OMDB ----- node liri.js movie-this '<movie name here>'
// creates movieThis function taking in the movie name from query
var movieThis = function(movieName) {
    // sets Mr. Nobody as default query
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    }
    var query = process.argv;
    // allows multiple word query
    for (var i = 3; i < query.length; i++) {
        if (i > 3 && i < query.length) {
            movieName = movieName + "+" + query[i];
        } else {
            movieName += query[i];
        }
    }

    // defines the query in reference to the OMBD API
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
    console.log(queryURL);

    // axios processes the the query and returns...
    axios.get(queryURL).then(
            function(response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Country of Production: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors/Actresses: " + response.data.Actors);
            })
        // what to do if error
        .catch(function(error) {
            if (error.response) {
                console.log("--------------Data--------------");
                console.log(error.response.data);
                console.log("--------------Status--------------");
                console.log(error.response.status);
                console.log("--------------Headers--------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

// DO THE THING -------- node liri.js do-what-it-says
if (command === "movie-this") {
    movieThis(query);
}