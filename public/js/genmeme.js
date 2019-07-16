require("dotenv").config();

var apikeys = require("../../keys");

var key = apikeys.memeapi.key;

console.log(apikeys.memeapi.key);

function memeMaker(){
    unirest.get("https://ronreiter-meme-generator.p.rapidapi.com/meme?font=Impact&font_size=50&meme=Condescending-Wonka&top=Top+text&bottom=Bottom+text")
.header("X-RapidAPI-Host", "ronreiter-meme-generator.p.rapidapi.com")
.header("X-RapidAPI-Key", key)
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
}

// memeMaker();