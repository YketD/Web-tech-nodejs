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

function getAverageRating(authToken, rateObj, imdb)
{
    $.ajax({
        type: "GET",
        url: "/api/rating",
        cache: true,
        headers: { "Authorization": authToken },
        data: { imdb: imdb },
        success: function(data)
        {
            if (data == null || data.result === undefined) alert("Error processing movie data");
            else rateObj.rating("rate", parseFloat(data.result[0].avg));
        },
        error: function() {
            rateObj.rating("rate", 0.0);
        }
    });
}