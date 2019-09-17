require("dotenv").config();

//VARIABLES FOR ALL COMMANDS
var axios = require("axios");

//BANDS IN TOWN -------- node liri.js concert-this <artist/band name here>
var concertThis = function() {
    // allows multiple word query
    var query = process.argv.slice(3).join("");
    // defines artist in Bands in Town API
    var api = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    console.log(api);
    // axios processes the the query and returns...
    axios.get(api).then(
        function(response) {
            console.log(response.data); // VENUE IS UNDEFINED in response.data.venue.name
            //console.log("Venue Location: " + (response)[index].venue.city);
            data = response.data;
            console.log(data[{ venue }]);
        })

    //what to do if error
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

//OMDB ----- node liri.js movie-this '<movie name here>'
//Identifies command ("movie-this", "concert-this", or "spotify-this-song") as index 2 after liri.js
var command = process.argv[2];
//Identifies query ("<movie name here>", <artist/band name here>, or "<song name here>") as index 3 after command
var query = process.argv[3];
// creates movieThis function taking in the movie name from query
var movieThis = function(movieName) {
    // sets Mr. Nobody as default query
    if (movieName === undefined) {
        movieName = "Mr. Nobody";
    }

    // allows multiple word query slicing at index 3 (index 2 would still include movie-this)
    var query = process.argv.slice(3).join("");


    // defines the query in reference to the OMBD API
    var queryURL = "http://www.omdbapi.com/?t=" + query + "&apikey=trilogy";
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

//node liri.js spotify-this-song '<song name here>'
var spotifythisSong = function(trackQuery) {
    var spotify = require('node-spotify-api');
    var keys = require("./keys.js");
    var spotify = new spotify(keys.spotify);

    // if no trackQuery then ace of base for you
    if (trackQuery === undefined) {
        trackQuery = "the sign ace of base";
    }

    // Spotify API request
    spotify.search({ type: 'track', query: trackQuery }, function(error, data) {
        if (error) { // if error
            console.log('You messed up: ' + error);
        } else { // if no error
            // if track has multiple artists
            for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                if (i === 0) {
                    console.log("Artist(s): " + data.tracks.items[0].artists[i].name);
                } else {
                    console.log("" + data.tracks.items[0].artists[i].name);
                }
            }
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
        }
    });
}

// DO THE THING -------- node liri.js do-what-it-says
if (command === "movie-this") {
    movieThis(query);
}
if (command === "concert-this") {
    concertThis();
}
if (command === "spotify-this-song") {
    spotifythisSong(query);
}