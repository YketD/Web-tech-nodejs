// Back button
// -----------------------------------------------------
$("#backButton").on("click", function() {
    window.location.href = "/movies.html";
});

// Let's load the user data when page is loaded
// -----------------------------------------------------
$(document).ready(function() {

    // Get auth token
    var authToken = localStorage.getItem("token");

    $.ajax({
        type: "GET",
        url: "/api/users",
        cache: false,
        headers: { "Authorization": authToken },
        success: function(data)
        {
            if (data == null || data.result === undefined) alert("Error processing user data");
            else
            {
                var row;
                var usersTable = $("#users");
                var tBody = $('<tbody></tbody>');
                usersTable.append(tBody);

                // Add users to table
                $.each(data.result, function(key, user) {

                    row = $('<tr></tr>');
                    row.append($('<td>' + user.username + '</td>'));
                    row.append($('<td>' + user.firstname + '</td>'));
                    row.append($('<td>' + user.middlename + '</td>'));
                    row.append($('<td>' + user.lastname + '</td>'));

                    tBody.append(row);
                });
            }
        }
    });
});

// Function to show user row
// -----------------------------------------------------
function showUserDetails(movie)
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