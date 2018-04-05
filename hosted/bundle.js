"use strict";

var csrf;

var handleFeather = function handleFeather(e) {
  e.preventDefault();

  $("#featherMessage").animate({ width: 'hide' }, 350);

  if ($("#featherName").val() == '' || $("#featherImg").val() == '') {
    handleError("RAWR! All fields are required");
    console.log('trigger1');
    return false;
  }

  sendAjax('POST', $("#featherForm").attr("action"), $("#featherForm").serialize(), function () {
    loadFeathersFromServer();
  });

  return false;
};

var deleteFeather = function deleteFeather(e) {

  console.dir(e.target);
  e.preventDefault();

  sendAjax('POST', $(e.target).attr("action"), $(e.target).serialize(), function () {
    loadFeathersFromServer();
  });

  return false;
};

var FeatherForm = function FeatherForm(props) {
  return React.createElement(
    "form",
    { id: "featherForm", onSubmit: handleFeather, name: "featherForm", action: "/maker", method: "POST", className: "featherForm" },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "featherName", type: "text", name: "name", placeholder: "Feather Name" }),
    React.createElement(
      "label",
      { htmlFor: "img" },
      "Image: "
    ),
    React.createElement("input", { id: "featherImg", type: "text", name: "imageUrl", placeholder: "url" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
    React.createElement("input", { className: "makeFeatherSubmit", type: "submit", value: "Make Feather" })
  );
};

var FeatherList = function FeatherList(props) {
  if (props.feathers.length === 0) {
    return React.createElement(
      "div",
      { className: "featherList" },
      React.createElement(
        "h3",
        { className: "emptyFeather" },
        "No Feathers yet"
      )
    );
  }

  var featherNodes = props.feathers.map(function (feather) {
    return React.createElement(
      "div",
      { "data-key": feather._id, className: "feather" },
      React.createElement("img", { src: feather.imageUrl, alt: "feather face", className: "featherFace", onLoad: LoadColors }),
      React.createElement(
        "h3",
        { className: "featherName" },
        " Name: ",
        feather.name
      ),
      React.createElement(
        "h3",
        { className: "featherRarity" },
        " Favorite: ",
        feather.favorite
      ),
      React.createElement(
        "form",
        { id: "deleteForm", onSubmit: deleteFeather, name: "deleteForm", action: "/delete", method: "POST", className: "deleteFeather" },
        React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
        React.createElement("input", { type: "hidden", name: "feather_id", value: feather._id }),
        React.createElement("input", { className: "deleteFeatherSubmit", type: "submit", value: "Delete Feather" })
      )
    );
  });

  return React.createElement(
    "div",
    { id: "featherList" },
    featherNodes
  );
};

var loadFeathersFromServer = function loadFeathersFromServer() {
  sendAjax('GET', '/getFeathers', null, function (data) {
    ReactDOM.render(React.createElement(FeatherList, { feathers: data.feathers }), document.querySelector("#feathers"));
  });
};

var setup = function setup() {
  //renders form
  ReactDOM.render(React.createElement(FeatherForm, null), document.querySelector("#makeFeather"));

  //renders default feather list display
  ReactDOM.render(React.createElement(FeatherList, { feathers: [] }), document.querySelector("#feathers"));

  loadFeathersFromServer();
};

var LoadColors = function LoadColors(e) {
  Vibrant.from(e.target.src).getPalette(function (err, palette) {
    console.log(palette);
  });
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    csrf = result.csrfToken;
    setup();
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
	$("#errorMessage").text(message);
	$("#featherMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
	$("#featherMessage").animate({ width: 'hide' }, 350);
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
