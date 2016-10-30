var authToken = localStorage.getItem("token");

/* Redirect if not logged in */
if (authToken == null)
{
    window.location.href = "/login.html";
}

var movieTitle = $("#movieTitle");
var movieDesc = $("#movieDesc");
var moviePoster = $("#moviePoster");
var movieView = $("#movieView");
var movieDetails = $("#movieDetails");

/* Let's load the movies when page is loaded */
$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "/api/movies",
        cache: false,
        headers: { "Authorization": authToken },
        success: function(data)
        {
            if (data == null || data.result === undefined) alert("Error processing movie data");
            else
            {
                var movies = $("#movies");
                var column = 0;

                var movieColumn;
                var lastRow;

                $.each(data.result, function(key, movie) {
                    // Make a new row for every 4 movies
                    if (column++ < 1)
                    {
                        lastRow = $('<div class="row"></div>');
                        movies.append(lastRow);
                    }
                    else if (column > 3)
                        column = 0;

                    // Add movie
                    movie.posterImage = $('<img src="http://placehold.it/300x445" class="img-responsive img-rounded" alt="Poster" />');

                    movieColumn = $('<div class="col-md-3"></div>');
                    movieColumn.on("click", function() { showMovieDetails(movie); });

                    movieColumn.append(movie.posterImage);
                    lastRow.append(movieColumn);

                    // Load image in an ajax request
                    loadPosterImage(movie.posterImage, movie.imdb);
                });
            }
        },
        error: function()
        {
            window.location.href = "/login.html";
        }
    });
});

function showMovieDetails(movie)
{
    movieTitle.html(movie.title);
    movieDesc.html(movie.description);
    moviePoster.attr("src", movie.posterImage.attr("src"));
    movieView.on("click", function() {
        window.location.href = "/movie.html?imdb=" + movie.imdb;
    });

    // Show info to user
    movieDetails.modal("show");
}