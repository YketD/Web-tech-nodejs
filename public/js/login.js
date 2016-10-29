// Form validation
// -----------------------------------------------------
$.validate({
    modules : "security",
    lang: "nl"
});

// Login form
// -----------------------------------------------------
$("#login_form").submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "/api/login",
        cache: false,
        data:
        {
            username: $("#login_username").val(),
            password: $("#login_password").val()
        },
        success: function (data)
        {
            alert("Hello world");
            //localStorage.setItem("token", data.token);
            //window.location.href = "/index.html";
        },
        error: function()
        {
            alert("Login mislukt! Probeer het later opnieuw");
        }
    })
});

// Register form
// -----------------------------------------------------
$("#register_form").submit(function (e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "/api/register",
        cache: false,
        data:
        {
            username: $("#register_username").val(),
            password: $("#register_password").val(),
            password2: $("#register_password2").val(),
            firstname: $("#register_firstname").val(),
            middlename: $("#register_middlename").val(),
            lastname: $("#register_lastname").val()
        },
        success: function (data)
        {
            alert("Hello world");
            //localStorage.setItem("token", data.token);
            //window.location.href = "/index.html";
        },
        error: function()
        {
            alert("Registratie mislukt! Probeer het later opnieuw");
        }
    });
});