// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/testing", function(req,res){
  
    console.log("in testing");
    
    // try{
      axios.get("https://api.imgflip.com/caption_image?template_id="+ tempid + "&username=randomusername100&password=password&text0=" + text0 + "&text1="+ text1)
      .then(function (result) {
        console.log(result.data.data.url)
        
      })
    // }catch(err){
    //   console.log("tesing error");
    // }

  });

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findAll({
      where: query,
      include: [db.Author]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Post.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(
  //     $(this).id,
  //     {
  //       where: {
  //         memeLikes: req.body.memeLikes,
  //       }
  //     }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });
};

var db = require("../models");
var axios = require("axios");
var jpeg = require('jpeg-js');
var fs = require('fs');

var tempid = 112126428;// drop down
var text0 = "hi there";//input
var text1 = "sup bae";//input 

