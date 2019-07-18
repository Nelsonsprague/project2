var memesArray = [
    {
        id: 112126428,
        name: "Distracted Boyfriend"
    },
    {
        id: 102156234,
        name: "Mocking Spongebob"
    },
    {
        id: 438680,
        name: "Batman Slapping Robin"
    },{
        id: 61579,
        name: "One Does Not Simply"
    },{
        id: 61532,
        name: "The Most Interesting Man In The World"
    },{

        id:89370399,
        name: "Roll Safe Think About It"	
    },{

        id: 4087833,
        name: "Waiting Skeleton"	
    },{

        id: 101470,
        name:	"Ancient Aliens"	
    },{

        id: 5496396,
        name: "Leonardo Dicaprio Cheers"
    },{

        id: 124822590,
        name: "Left Exit 12 Off Ramp"
    },{

        id: 61520,
        name: "Futurama Fry"
    } 
];

$(document).ready(function () {

    // Getting jQuery references to the post body, title, form, and author select
    var titleInput = $("#title");
    var memeInput = $("#meme");
    var memePhoto = $("#memePhoto");

    var text1Input = $("#text0");
    var text2Input = $("#text1");
    var cmsForm = $("#cms");
    var authorSelect = $("#author");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var postId;
    var authorId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId, "post");
    }
    // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    else if (url.indexOf("?author_id=") !== -1) {
        authorId = url.split("=")[1];
    }

    // Getting the authors, and their posts
    getAuthors();

    // Getting the meme images
    getMemes(memesArray);

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        
        // Wont submit the post if we are missing a body, title, or author
        if (!titleInput.val().trim() || !text1Input.val().trim() || !text2Input.val().trim() || !authorSelect.val()) {
            return;
        }
        var tempid = memeInput.val();
        var text0 = text1Input.val().trim();
        var text1 = text2Input.val().trim();
        text0 = _.replace(text0, " ", "%20");
        text1 = _.replace(text1, " ", "%20");
        var url = "https://api.imgflip.com/caption_image?template_id="+ tempid + "&username=randomusername100&password=password&text0=" + text0 + "&text1="+ text1;
        console.log(url);
        $.ajax({
            url: url,
            method: "GET"
        })
        .then(function (result) {
          console.log(result.data.url)
          var newPost = {
            title: titleInput
                .val()
                .trim(),
            memeInput: memeInput
                .val()
                .trim(),
            memeUrl: result.data.url,
            text1Input: text1Input
                .val()
                .trim(),
            text2Input: text2Input
                .val()
                .trim(),
            AuthorId: authorSelect.val()
        };

        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        if (updating) {
            newPost.id = postId;
            updatePost(newPost);
        } else {
            submitPost(newPost);
        }
          
        });
      
    
        // Constructing a newPost object to hand to the database
        
    }

    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
        $.post("/api/posts", post, function () {
            window.location.href = "/blog";
        });
    }

    // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
    function getPostData(id, type) {
        var queryUrl;
        switch (type) {
            case "post":
                queryUrl = "/api/posts/" + id;
                break;
            case "author":
                queryUrl = "/api/authors/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function (data) {
            if (data) {
                console.log(data.AuthorId || data.id);
                memePhoto.append("<img src='" + data.memeUrl + "' width='100%'>");

                // If this post exists, prefill our cms forms with its data
                titleInput.val(data.title);
                memeInput.val(data.memeInput);
                memePhoto.val(data.memeUrl);
                text1Input.val(data.text1Input);
                text2Input.val(data.text2Input);
                authorId = data.AuthorId || data.id;

                // hide slideshow for all posts
                $("#carouselExampleIndicators").addClass("d-none");
                // If we have a post with this id, set a flag for us to know to update the post
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get Authors and then render our list of Authors
    function getAuthors() {
        $.get("/api/authors", renderAuthorList);
    }

    // Function to either render a list of authors, or if there are none, direct the user to the page
    // to create an author first
    function renderAuthorList(data) {
        if (!data.length) {
            window.location.href = "/authors";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createAuthorRow(data[i]));
        }
        authorSelect.empty();
        console.log(rowsToAdd);
        console.log(authorSelect);
        authorSelect.append(rowsToAdd);
        authorSelect.val(authorId);
    }

    // Creates the author options in the dropdown
    function createAuthorRow(author) {
        var listOption = $("<option>");
        listOption.attr("value", author.id);
        listOption.text(author.name);
        return listOption;
    }

    // ------------- MEME LIST ------

    function getMemes(memesArray) {
        
        var rowsToAdd = [];
        for (var i = 0; i < memesArray.length; i++) {
            rowsToAdd.push(createMemeRow(memesArray[i]));
        }
        memeInput.empty();
        console.log(rowsToAdd);
        console.log(memeInput);
        memeInput.append(rowsToAdd);
        // memeInput.val(authorId);
    }

    // Creates the meme options in the dropdown
    function createMemeRow(meme) {
        console.log("HELLO!");
        console.log(memesArray);
    
            var listOption = $("<option>");
            listOption.attr("value", meme.id);
            listOption.text(meme.name);
            console.log(listOption);
        
        
        return listOption;
    }

    // Update a given post, bring user to the blog page when done
    function updatePost(post) {
        $.ajax({
                method: "PUT",
                url: "/api/posts",
                data: post
            })
            .then(function () {
                window.location.href = "/blog";
            });
    }
});