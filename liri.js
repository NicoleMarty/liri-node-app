//require("dotenv").config();

//node liri.js concert-this <artist/band name here>

//node liri.js spotify-this-song '<song name here>'
//var keys = require("./keys.js");
//var spotify = new spotify(keys.spotify);

//node liri.js movie-this '<movie name here>'
var axios = require("axios");

var nodeArgs = process.argv;
var movieName = "";
var defaultMovie = "Mr. Nobody";

for (var i = 2; i < nodeArgs.length; i++) {
    if (i > 2 && i < nodeArgs.length) {
        movieName = movieName + "+" + nodeArgs[i];
    } else {
        movieName += nodeArgs[i];
    }
}

var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryURL);

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

//node liri.js do-what-it-says