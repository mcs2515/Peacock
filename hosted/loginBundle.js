"use strict";

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  $("#errorContainer").animate({ width: 'hide' }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '') {
    handleError("Username or password is empty!!");
    return false;
  }

  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

  return false;
};

var handleSignup = function handleSignup(e) {

  e.preventDefault();

  $("#errorContainer").animate({ width: 'hide' }, 350);

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    handleError("All fields are required!!");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    handleError("Passwords do not match!!");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

  return false;
};

var LoginWindow = function LoginWindow(props) {
  return React.createElement(
    "form",
    { id: "loginForm", name: "loginForm", onSubmit: handleLogin, action: "/login", method: "POST", className: "mainForm" },
    React.createElement(
      "h3",
      null,
      "Login to your Account."
    ),
    React.createElement("input", { id: "user", style: { fontSize: 14 + "pt" }, type: "text", name: "username", placeholder: "Username" }),
    React.createElement("input", { id: "pass", style: { fontSize: 14 + "pt" }, type: "password", name: "pass", placeholder: "Password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign In" })
  );
};

var SignupWindow = function SignupWindow(props) {
  return React.createElement(
    "form",
    { id: "signupForm", name: "signupForm", onSubmit: handleSignup, action: "/signup", method: "POST", className: "mainForm" },
    React.createElement(
      "h3",
      null,
      "Create a New Account."
    ),
    React.createElement("input", { id: "user", style: { fontSize: 14 + "pt" }, type: "text", name: "username", placeholder: "Username" }),
    React.createElement("input", { id: "pass", style: { fontSize: 14 + "pt" }, type: "password", name: "pass", placeholder: "Password" }),
    React.createElement("input", { id: "pass2", style: { fontSize: 14 + "pt" }, type: "password", name: "pass2", placeholder: "Re-type Password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign Up" })
  );
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  var signupButton = document.querySelector("#signupButton");
  var loginButton = document.querySelector("#loginButton");

  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);

    loginButton.classList.remove("selected");
    loginButton.classList.add("unselected");
    signupButton.classList.remove("unselected");
    signupButton.classList.add("selected");

    return false;
  });

  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);

    signupButton.classList.remove("selected");
    signupButton.classList.add("unselected");
    loginButton.classList.remove("unselected");
    loginButton.classList.add("selected");

    return false;
  });

  createLoginWindow(csrf); //default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
	$("#errorMessage").text(message);
	$("#errorContainer").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
	$("#errorContainer").animate({ width: 'hide' }, 350);
	window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
	$.ajax({
		cashe: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: function error(xhr, status, _error) {
			var messageObj = JSON.parse(xhr.responseText);
			handleError(messageObj.error);
		}
	});
};
