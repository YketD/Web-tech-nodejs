/**
 * Created by yketd on 28-10-2016.
 */
$("#register_button").on("click", function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/api/register",
        cache: false,
        data: {username: $("#username_login").val(),
            password: $("#password_login").val(),
            voornaam: $()

        success: function (data) {
            localStorage.setItem('token', data.token);
        },
        error: function () {
            alert('Authentication failed');
        }
    })
})