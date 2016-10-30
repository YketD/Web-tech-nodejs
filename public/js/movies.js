var authToken = localStorage.getItem("token");

/* Redirect if not logged in */
if (authToken == null)
{
    window.location.href = "/login.html";
}

/* Function to load movie posters from omdb API */
function loadPosterImage(image, imdb)
{
    $.ajax({
        type: "GET",
        url: "http://www.omdbapi.com/?plot=short&r=json&i=" + imdb,
        cache: true,
        success: function(data)
        {
            if (data != null && data.Poster !== undefined && data.Poster != "N/A")
                $(image).attr("src", data.Poster);
        }
    });
}

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
                var count = 0;

                var movieColumn;
                var posterImage;
                var lastRow;

                $.each(data.result, function(key, value) {
                    // Make a new row for every 4 movies
                    if (column++ < 1)
                    {
                        lastRow = $('<div class="row"></div>');
                        movies.append(lastRow);
                    }
                    else if (column > 3)
                        column = 0;

                    // Add movie
                    movieColumn = $('<div class="col-md-3"></div>');
                    posterImage = $('<img src="http://placehold.it/300x445" alt="Poster" width="300" height="445" />');

                    movieColumn.append(posterImage);
                    lastRow.append(movieColumn);

                    loadPosterImage(posterImage, value.imdb);
                });
            }
        },
        error: function()
        {
            console.log("error");
        }
    });
});