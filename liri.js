require("dotenv").config();

//node liri.js concert-this <artist/band name here>

//node liri.js spotify-this-song '<song name here>'
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);

//node liri.js movie-this '<movie name here>'

//node liri.js do-what-it-says