/**
 * Created by yketd on 25-10-2016.
 */

$("#login_button").on("click", function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/api/login",
        cache: false,
        data: {username: $("#username_login").val(), pass: $("#password_login").val()},
        success: function (e, data) {
            if (e.status === 200) {
                localStorage.setItem('token', data.token);
                alert('function succes called, token: ' + data.token);
            }   else if (e.status === 400) {
                alert('function succes called, login failed! try again:');
            }
        },
        error: function () {
            alert('Authentication failed');
        }
    })
})
