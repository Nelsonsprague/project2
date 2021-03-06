$(document).ready(function () {
    /* global moment */
    // blogContainer holds all of our posts
    var blogContainer = $(".blog-container");
    var postCategorySelect = $("#category");

    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handlePostDelete);
    $(document).on("click", "button.edit", handlePostEdit);

    // Variable to hold our posts
    var posts;

    // The code below handles the case where we want to get blog posts for a specific author
    // Looks for a query param in the url for author_id
    var url = window.location.search;
    var authorId;
    if (url.indexOf("?author_id=") !== -1) {
      authorId = url.split("=")[1];
      getPosts(authorId);
    }

    // If there's no authorId we just get all posts as usual
    else {
      getPosts();
    }
  
    // This function grabs posts from the database and updates the view
    function getPosts(author) {
      authorId = author || "";
      if (authorId) {
        authorId = "/?author_id=" + authorId;
      }
      $.get("/api/posts" + authorId, function (data) {
        console.log("Posts", data);
        posts = data;
        if (!posts || !posts.length) {
          displayEmpty(author);
        } else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete posts
    function deletePost(id) {
      $.ajax({
          method: "DELETE",
          url: "/api/posts/" + id
        })
        .then(function () {
          getPosts(postCategorySelect.val());
        });
    }
  
    // InitializeRows handles appending all of our constructed post HTML inside blogContainer
    function initializeRows() {
      blogContainer.empty();
      blogContainer.html("<h1 class='text-center mt-5 mb-5' style='font-size: 20pt; font-weight: 900;'>Welcome to... <br><p style='font-size: 90pt; text-shadow: -5px -5px 0 #000, 5px -5px 0 #000, -5px 5px 0 #000, 5px 5px 0 #000;'>MEME GEN!</p></h1>");
      var postsToAdd = _.sortBy(posts, ['post', 'memeLikes']).reverse()
      console.log(postsToAdd)
      var newArr = [];
      for (var i = 0; i < postsToAdd.length; i++) {
        newArr.push(createNewRow(postsToAdd[i]));
      }
      console.log(newArr)
      blogContainer.append(newArr);
    }
  
    // This function constructs a post's HTML
    function createNewRow(post) {
      console.log(post.memeLikes)
      var totalLikes = post.memeLikes;

      var formattedDate = new Date(post.createdAt);
      formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

      var newPostCard = $("<div>");
      newPostCard.addClass("card");
      newPostCard.addClass("hvr-grow");
      var newPostCardHeading = $("<div>");
      newPostCardHeading.addClass("card-header");

      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      deleteBtn.addClass("hvr-float-shadow");

      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      editBtn.addClass("hvr-float-shadow");
      
      var voteBtn = $("<button data-likes=" + totalLikes + " data-id=" + post.id + ">");
      voteBtn.text(totalLikes);
      voteBtn.addClass("vote btn btn-success vote-button class" + post.id + ""); 
      voteBtn.addClass("hvr-float-shadow"); 
      
      var newPostTitle = $("<h2>");
      var newPostDate = $("<small>");
      var newPostAuthor = $("<h5>");
      newPostAuthor.text("Written by: " + post.Author.name);
      newPostAuthor.css({
        float: "right",
        color: "white",
        right: "25px",
        top: "125px",
        position: "absolute",
        opacity: "0.5"
      });
      
      var newPostCardBody = $("<div>");
      newPostCardBody.addClass("card-body");
      var newPostBody = $("<img>");
      newPostTitle.text(post.title + " ");
      newPostBody.attr("src", post.memeUrl);
      newPostBody.addClass("w-100");
      newPostDate.text(formattedDate);
      newPostCardHeading.append(deleteBtn);
      newPostCardHeading.append(editBtn);
      newPostCardHeading.append(voteBtn);
      newPostCardHeading.append(newPostTitle);
      newPostCardHeading.append(newPostDate);
      newPostCardHeading.append(newPostAuthor);
      newPostCardBody.append(newPostBody);
      newPostCard.append(newPostCardHeading);
      newPostCard.append(newPostCardBody);
      newPostCard.data("post", post);

      return newPostCard;
    }
  
    // Updates post likes button on click
    $(document).on("click", "button.vote", function() {
        var buttonId = $(this).data("id")

        var currentTotalLikes = $(this).data("likes");
        currentTotalLikes++;
      
        var currentBtn = ".class" + buttonId + ""
        $(currentBtn).html("<i class='fas fa-thumbs-up'></i>");

        $.ajax({
            method: "PUT",
            url: "/api/likes/" + buttonId,
          }).then(function () {
            // event.preventDefault();
            console.log(currentTotalLikes);
          });

        $(currentBtn).attr("disabled", true);

      });
  
    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      deletePost(currentPost.id);
    }
  
    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
      var currentPost = $(this)
        .parent()
        .parent()
        .data("post");
      window.location.href = "/cms?post_id=" + currentPost.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Author #" + id;
      }
      blogContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({
        "text-align": "center",
        "margin-top": "50px"
      });
      messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
        "'>here</a> in order to get started.");
      blogContainer.append(messageH2);
    }
  });
