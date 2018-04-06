"use strict";

var csrf;
var render_colors;

var handleFeather = function handleFeather(e) {
  e.preventDefault();

  $("#featherMessage").animate({ width: 'hide' }, 350);

  if ($("#featherName").val() == '' || $("#featherImg").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#featherForm").attr("action"), $("#featherForm").serialize(), function () {
    loadFeathersFromServer();
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
          "h3",
          { className: "featherRarity" },
          " Favorite: ",
          feather.favorite
        )
      ),
      React.createElement("img", { src: feather.imageUrl, alt: "feather face", className: "featherFace", onLoad: LoadColors }),
      React.createElement("div", { id: "colorsContainer", className: "colors" }),
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
    ReactDOM.render(React.createElement(FeatherList, { feathers: data.feathers }), document.querySelector("#feathers"));
  });

  //console.log(palette);
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

    //    https://embed.plnkr.co/plunk/DGLrkj 
    var colorArray = [];

    for (var swatch in palette) {
      if (palette.hasOwnProperty(swatch) && palette[swatch]) {

        var bg_color = palette[swatch].getHex();
        var title_text_color = palette[swatch].getTitleTextColor();
        var body_text_color = palette[swatch].getBodyTextColor();
        var swatch_name = swatch;

        var code = {
          backgroundColor: bg_color,
          bodyTColor: body_text_color,
          titleTColor: body_text_color,
          swatchName: swatch
        };

        colorArray.push(code);
      }
    }

    ReactDOM.render(React.createElement(RenderColors, { colors: colorArray }), document.querySelector('#colorsContainer'));
    //console.log(colorArray);
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

  console.log("reached");
  return React.createElement(
    "ul",
    { "class": "colors" },
    colorNodes
  );
  console.log("done");
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
