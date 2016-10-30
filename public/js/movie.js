// Get auth token
// -----------------------------------------------------
var authToken = localStorage.getItem("token");

// http://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// Get IMDB from query string
// -----------------------------------------------------
var urlVars = getUrlVars();
if (urlVars.imdb === undefined)
{
    window.location.href = "/login.html";
}

// Store these often used DOM elements for efficiency
// -----------------------------------------------------
var movieIMDB = "";
var movieTitle = $("#movieTitle");
var movieDesc = $("#movieDesc");
var movieDate = $("#movieDate");
var movieDuration = $("#movieDuration");
var movieDirector = $("#movieDirector");
var moviePoster = $("#moviePoster");
var movieRatingAverage = $("#movieRatingAverage");
var movieRatingUser = $("#movieRatingUser");

// Back button
// -----------------------------------------------------
$("#backButton").on("click", function() {
    window.location.href = "/movies.html";
});

// Average rating stars object
// -----------------------------------------------------
movieRatingAverage.rating({
    extendSymbol: function() {

        var title;
        $(this).tooltip({
            container: "body",
            placement: "bottom",
            trigger: "manual",
            title: function() { return title; }
        });
    }
});

// User rating object
// -----------------------------------------------------
movieRatingUser.rating({
    extendSymbol: function() {

        var title;
        $(this).tooltip({
            container: "body",
            placement: "bottom",
            trigger: "manual",
            title: function() { return title; }
        });

        $(this)
            .on("rating.rateenter", function(e, rate) {
                title = rate;
                $(this).tooltip("show");
            })
            .on("rating.rateleave", function() {
                $(this).tooltip("hide");
            });
    }
});

// Cast a vote
// -----------------------------------------------------
movieRatingUser.on("change", function() {
    $.ajax({
        type: "POST",
        url: "/api/rating",
        cache: false,
        headers: { "Authorization": authToken },
        data: { imdb: urlVars.imdb, rating: $(this).val() },
        success: function(data) {
            if (data.error === undefined)
                getAverageRating(authToken, movieRatingAverage, movieRatingUser, movieIMDB, 0);
            else
                alert(data.error);
        }
    });
});

// Removing rating
// -----------------------------------------------------
$("#removeRating").on("click", function() {
   // Remove rating
    $.ajax({
        type: "DELETE",
        url: "/api/rating",
        cache: false,
        headers: { "Authorization": authToken },
        data: { imdb: urlVars.imdb },
        success: function(data) {
            if (data.error === undefined)
            {
                getAverageRating(authToken, movieRatingAverage, movieRatingUser, movieIMDB, 0);
                movieRatingUser.rating("rate", 0.0);
            }
            else alert(data.error);
        }
    });
});

// Let's load the movie data when page is loaded
// -----------------------------------------------------
$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "/api/movies",
        cache: false,
        headers: { "Authorization": authToken },
        data: { imdb: urlVars.imdb, limit: 1 },
        success: function(data)
        {
            if (data == null || data.result === undefined) alert("Error processing movie data");
            else
            {
                var movie = data.result[0];

                movieTitle.html(data.result[0].title);
                movieDesc.html(data.result[0].description);
                movieDate.html(data.result[0].date);
                movieDuration.html(data.result[0].length);
                movieDirector.html(data.result[0].director);

                if (data.result[0].averagerating !== undefined)
                    movieRatingAverage.rating("rate", data.result[0].averagerating);

                // Load image in an ajax request
                loadPosterImage(moviePoster, movie.imdb);
                getAverageRating(authToken, movieRatingAverage, movieRatingUser, movie.imdb, 0);
                getAverageRating(authToken, movieRatingAverage, movieRatingUser, movie.imdb, 1);
                movieIMDB = movie.imdb;
            }
        }
    });
});