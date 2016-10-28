/**
 * Created by yketd on 25-10-2016.
 */

$("#login_button").on("click", function (e) {
    e.preventDefault();

    $.ajax({
        type: 'POST',
        url: "/api/login",
        cache: false,
        data: {username: $("#username_login").val(), password: $("#password_login").val()},
        success: function (data) {
                localStorage.setItem('token', data.token);
                window.location.href="/index.html";
        },
        error: function () {
            alert('function succes called, login failed! try again:');
        }
    })
})
