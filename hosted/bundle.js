"use strict";

var csrf;

var handleFeather = function handleFeather(e) {
  e.preventDefault();

  $("#errorContainer").animate({ width: 'hide' }, 350);

  if ($("#featherName").val() == '' || $("#featherImg").val() == '') {
    handleError("All fields are required!!");
    return false;
  }

  sendAjax('POST', $("#featherForm").attr("action"), $("#featherForm").serialize(), function () {
    loadFeathersFromServer();
    $('#featherName').val('');
    $('#featherImg').val('');
  });

  return false;
};

var deleteFeather = function deleteFeather(e) {

  e.preventDefault();

  sendAjax('POST', $(e.target).attr("action"), $(e.target).serialize(), function () {
    loadFeathersFromServer();
  });

  return false;
};

var ToggleFav = function ToggleFav(e) {
  e.preventDefault();
  sendAjax('POST', $("#favForm").attr("action"), $("#favForm").serialize(), function (data) {
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
    React.createElement("input", { id: "featherName", type: "text", name: "name", placeholder: "name" }),
    React.createElement(
      "label",
      { htmlFor: "img" },
      "Image: "
    ),
    React.createElement("input", { id: "featherImg", type: "text", name: "imageUrl", placeholder: "url" }),
    React.createElement("input", { className: "makeFeatherSubmit", type: "submit", value: "Add" })
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

  var featherNodes = props.feathers.map(function (feather, index) {

    return React.createElement(
      "div",
      { "data-key": feather._id, className: "feather" },
      React.createElement(
        "div",
        { className: "imageHeader" },
        React.createElement(
          "h3",
          { className: "featherName" },
          " ",
          feather.name
        ),
        React.createElement(
          "form",
          { id: "favForm", onClick: ToggleFav, name: "favForm", action: "/favorite", method: "POST", className: "favoriteFrom" },
          React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
          React.createElement("input", { type: "hidden", name: "feather_id", value: feather._id }),
          React.createElement("input", { id: "favImg", className: LoadFavoriteImg(feather.favorite), type: "submit", value: "" })
        )
      ),
      React.createElement("img", { src: feather.imageUrl, alt: "feather face", className: "featherFace", onLoad: LoadColors }),
      React.createElement("div", { id: "colorsContainer_" + feather._id, className: "colors" }),
      React.createElement(
        "form",
        { id: "deleteForm", onSubmit: deleteFeather, name: "deleteForm", action: "/delete", method: "POST", className: "deleteFeather" },
        React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
        React.createElement("input", { type: "hidden", name: "feather_id", value: feather._id }),
        React.createElement("input", { className: "deleteFeatherSubmit", type: "submit", value: "Remove" })
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
    ReactDOM.render(React.createElement(FeatherList, { feathers: data.feathers }), document.querySelector("#contentContainer"));
  });
};

var LoadColors = function LoadColors(e) {
  var index = e.target.parentElement.getAttribute("data-key");

  Vibrant.from(e.target.src).getPalette(function (err, palette) {

    var colorArray = [];

    for (var swatch in palette) {
      if (palette.hasOwnProperty(swatch) && palette[swatch]) {

        var bg_color = palette[swatch].getHex();
        var title_text_color = palette[swatch].getTitleTextColor();
        var body_text_color = palette[swatch].getBodyTextColor();
        var swatch_name = swatch;
        if (swatch != 'LightMuted') {
          var code = {
            backgroundColor: bg_color,
            bodyTColor: body_text_color,
            titleTColor: body_text_color,
            swatchName: swatch
          };

          colorArray.push(code);
        }
      }
    }

    ReactDOM.render(React.createElement(RenderColors, { colors: colorArray }), document.querySelector("#colorsContainer_" + index));
  });
};

var RenderColors = function RenderColors(props) {

  var colorNodes = props.colors.map(function (color) {

    return React.createElement(
      "li",
      { style: { backgroundColor: color.backgroundColor } },
      React.createElement(
        "p",
        { style: { color: color.titleTColor } },
        " ",
        color.backgroundColor
      ),
      React.createElement(
        "small",
        { style: { color: color.bodyTColor } },
        " ",
        color.swatchName,
        " "
      )
    );
  });

  return React.createElement(
    "ul",
    { "class": "colors" },
    colorNodes
  );
  console.log("done");
};

var LoadFavoriteImg = function LoadFavoriteImg(props) {
  var name;
  //if true
  if (props) {
    name = "favorite";
  } else {
    name = "unfavorite";
  }

  console.log(name);
  return name;
};

var setup = function setup() {
  var contentContainer = document.querySelector("#contentContainer");

  console.log("contentContainer: " + contentContainer);

  if (contentContainer) {
    //renders form
    ReactDOM.render(React.createElement(FeatherForm, null), document.querySelector("#makeFeather"));

    //renders default feather list display
    ReactDOM.render(React.createElement(FeatherList, { feathers: [] }), contentContainer);

    loadFeathersFromServer();
  }
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

var handlePassChange = function handlePassChange(e) {
  e.preventDefault();

  $("#errorContainer").animate({ width: 'hide' }, 350);

  if ($("#oldPass").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
    handleError("All fields are required!!");
    return false;
  }

  sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);

  return false;
};

var handleDonate = function handleDonate(e) {
  e.preventDefault();
  return false;
};

var PasswordForm = function PasswordForm(props) {
  //renders form
  return React.createElement(
    "form",
    { id: "passwordForm", name: "passwordForm", onSubmit: handlePassChange, action: "/changePassword", method: "POST", className: "passwordForm" },
    React.createElement(
      "h3",
      null,
      "Change Password"
    ),
    React.createElement("input", { id: "oldPass", type: "text", name: "oldPass", placeholder: "Old Password" }),
    React.createElement("input", { id: "newPass", type: "text", name: "newPass", placeholder: "New Password" }),
    React.createElement("input", { id: "newPass2", type: "text", name: "newPass2", placeholder: "Re-type Password" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "passwordSubmit", type: "submit", value: "Update" })
  );
};

var DonateForm = function DonateForm(props) {
  //renders form
  return React.createElement(
    "form",
    { id: "donateForm", name: "donateForm", onSubmit: handleDonate, action: "/donate", method: "POST", className: "donateForm" },
    React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
    React.createElement("input", { className: "donateSubmit", type: "submit", value: "$1" }),
    React.createElement("input", { className: "donateSubmit", type: "submit", value: "$5" }),
    React.createElement("input", { className: "donateSubmit", type: "submit", value: "$10" }),
    React.createElement("input", { className: "donateSubmit", type: "submit", value: "$25" }),
    React.createElement("img", { id: "creditCards", src: "assets/img/cc.png", alt: "Credit Cards" })
  );
};

var setupSettings = function setupSettings(csrf) {

  var passwordContainer = document.querySelector("#passwordContainer");
  var donateContainer = document.querySelector("#donateContainer");

  if (passwordContainer) {
    //renders form
    ReactDOM.render(React.createElement(PasswordForm, { csrf: csrf }), document.querySelector("#updateForm"));
  }

  if (donateContainer) {
    //renders form
    ReactDOM.render(React.createElement(DonateForm, { csrf: csrf }), document.querySelector("#moneyForm"));
  }
};

var getSettingsToken = function getSettingsToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    //console.log(result.csrfToken);
    setupSettings(result.csrfToken);
  });
};

$(document).ready(function () {
  getSettingsToken();
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
