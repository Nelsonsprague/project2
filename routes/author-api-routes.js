var db = require("../models");
var axios = require("axios");
var jpeg = require('jpeg-js');
var fs = require('fs');

var tempid = 112126428;// drop down
var text0 = "hi there";//input
var text1 = "sup bae";//input 



module.exports = function(app) {
  app.get("/testing", function(req,res){
  
    axios.get("https://api.imgflip.com/caption_image?template_id="+ tempid + "&username=randomusername100&password=password&text0=" + text0 + "&text1="+ text1)
    .then(function (result) {
      console.log(result.data.data.url)
      
    });
  });


      app.get("/api/authors", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Author.findAll({
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.get("/api/authors/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/authors", function(req, res) {
    db.Author.create(req.body).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
