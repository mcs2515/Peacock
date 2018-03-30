"use strict";

var csrf;

var handleDomo = function handleDomo(e) {
  e.preventDefault();

  $("#domoMessage").animate({ width: 'hide' }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

var deleteDomo = function deleteDomo(e) {

  console.dir(e.target);
  e.preventDefault();

  sendAjax('POST', $(e.target).attr("action"), $(e.target).serialize(), function () {
    loadDomosFromServer();
  });

  return false;
};

var DomoForm = function DomoForm(props) {
  return React.createElement(
    "form",
    { id: "domoForm", onSubmit: handleDomo, name: "domoForm", action: "/maker", method: "POST", className: "domoForm" },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "domoName", type: "text", name: "name", placeholder: "Domo Name" }),
    React.createElement(
      "label",
      { htmlFor: "age" },
      "Age: "
    ),
    React.createElement("input", { id: "domoAge", type: "text", name: "age", placeholder: "Domo Age" }),
    React.createElement(
      "label",
      { htmlFor: "rarity" },
      "Rarity: "
    ),
    React.createElement("input", { id: "domoRarity", type: "text", name: "rarity", placeholder: "Domo Rarity" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
    React.createElement("input", { className: "makeDomoSubmit", type: "submit", value: "Make Domo" })
  );
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return React.createElement(
      "div",
      { className: "domoList" },
      React.createElement(
        "h3",
        { className: "emptyDomo" },
        "No Domos yet"
      )
    );
  }

  var domoNodes = props.domos.map(function (domo) {
    return React.createElement(
      "div",
      { "data-key": domo._id, className: "domo" },
      React.createElement("img", { src: "/assets/img/domoface.jpeg", alt: "domo face", className: "domoFace" }),
      React.createElement(
        "h3",
        { className: "domoName" },
        " Name: ",
        domo.name
      ),
      React.createElement(
        "h3",
        { className: "domoRarity" },
        " rarity: ",
        domo.rarity
      ),
      React.createElement(
        "h3",
        { className: "domoAge" },
        " age: ",
        domo.age
      ),
      React.createElement(
        "form",
        { id: "deleteForm", onSubmit: deleteDomo, name: "deleteForm", action: "/delete", method: "POST", className: "deleteDomo" },
        React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
        React.createElement("input", { type: "hidden", name: "domo_id", value: domo._id }),
        React.createElement("input", { className: "deleteDomoSubmit", type: "submit", value: "Delete Domo" })
      )
    );
  });

  return React.createElement(
    "div",
    { id: "domoList" },
    domoNodes
  );
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#domos"));
  });
};

var setup = function setup() {
  //renders form
  ReactDOM.render(React.createElement(DomoForm, null), document.querySelector("#makeDomo"));

  //renders default domo list display
  ReactDOM.render(React.createElement(DomoList, { domos: [] }), document.querySelector("#domos"));

  loadDomosFromServer();
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
	$("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
	$("#domoMessage").animate({ width: 'hide' }, 350);
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
