"use strict";

var AboutForm = function AboutForm(props) {
  return React.createElement(
    "form",
    null,
    React.createElement(
      "h1",
      null,
      "About: "
    ),
    React.createElement(
      "p",
      null,
      "Peacock was specifically made for those who are inspired by the colors of an image and would like to save the images to a library. Peacock allows users to create a 'Feather' on their page that has the saved image url and image name. ",
      React.createElement(
        "a",
        { href: "https://jariz.github.io/vibrant.js/", target: "_blank" },
        "Vibrant.js"
      ),
      " is then used to extract out prominent colors from the image to give the user the hex values of the vibrant and muted colors. Peacock was made with ",
      React.createElement(
        "a",
        { href: "https://nodejs.org/en/", target: "_blank" },
        "Node.js"
      ),
      " and ",
      React.createElement(
        "a",
        { href: "https://reactjs.org/", target: "_blank" },
        "React.js"
      ),
      ". "
    ),
    React.createElement(
      "section",
      { id: "steps" },
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          { id: "step1" },
          React.createElement(
            "strong",
            null,
            "1."
          ),
          "Find an image from websites like Imgur."
        ),
        React.createElement(
          "li",
          { id: "step2" },
          React.createElement(
            "strong",
            null,
            "2."
          ),
          " Right-click the image and click \"Copy image address\"."
        ),
        React.createElement(
          "li",
          { id: "step3" },
          React.createElement(
            "strong",
            null,
            "3."
          ),
          " Paste the url in the \"Image\" url field and click \"Add\"."
        )
      )
    )
  );
};

var ActivityForm = function ActivityForm(props) {
  return React.createElement(
    "form",
    null,
    React.createElement(
      "h1",
      null,
      "Website Updates:"
    ),
    React.createElement(
      "div",
      { id: "logs" },
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "May 19, 2018"
          ),
          " Added a Home button and fixed GitHub link."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 30, 2018"
          ),
          " Limited name for feathers to 25 characters long. Added check for .png and .jpeg images."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 29, 2018"
          ),
          " Users can now filter their images by favorites, name, and when they were added."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 22, 2018"
          ),
          " Added gallery page for all public Feathers."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 21, 2018"
          ),
          " Added Public & Private buttons to allow for Feather sharing."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 18, 2018"
          ),
          " Moved web pages around and added redirect."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 16, 2018"
          ),
          " Replaced password fields with dots and new password cannot equal current password."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 13, 2018"
          ),
          " Created the About page with styling."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 11, 2018"
          ),
          " Added favorite 'Feather' feature."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 9, 2018"
          ),
          " Styled the Settings page and included buttons and images for the donate section of the page."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 8, 2018"
          ),
          " Created a Settings page to allow users to change their current passwords."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 6, 2018"
          ),
          " Styled 'Feather' containers and removed Light Muted Swatches."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 5, 2018"
          ),
          " ",
          React.createElement(
            "a",
            { href: "https://jariz.github.io/vibrant.js/", target: "_blank" },
            "Vibrant.js"
          ),
          " now extracts colors from all images saved."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 4, 2018"
          ),
          " Implemented ",
          React.createElement(
            "a",
            { href: "https://jariz.github.io/vibrant.js/", target: "_blank" },
            "Vibrant.js"
          ),
          " to work for only one image. "
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Apr 2, 2018"
          ),
          " Added new field to allow users to user image URls to create 'Feathers' with images."
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "time",
            null,
            "Mar 30, 2018"
          ),
          " Added a delete feature for users to delete a 'Feather'."
        )
      )
    ),
    React.createElement(
      "section",
      { id: "logFooter" },
      React.createElement(
        "p",
        null,
        "For detailed list of changes: "
      ),
      React.createElement(
        "a",
        { href: "https://github.com/mcs2515/Peacock", target: "_blank" },
        " Github "
      )
    )
  );
};

var setupAbout = function setupAbout(csrf) {

  var aboutContainer = document.querySelector("#aboutContainer");

  if (aboutContainer) {
    //renders form
    ReactDOM.render(React.createElement(AboutForm, { csrf: csrf }), document.querySelector("#aboutInfo"));

    //renders form
    ReactDOM.render(React.createElement(ActivityForm, { csrf: csrf }), document.querySelector("#activityLog"));
  }
};

var getAboutToken = function getAboutToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupAbout(result.csrfToken);
  });
};

$(document).ready(function () {
  getAboutToken();
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
      "Change Password:"
    ),
    React.createElement("input", { id: "oldPass", style: { fontSize: 14 + "pt" }, type: "password", name: "oldPass", placeholder: "Old Password" }),
    React.createElement("input", { id: "newPass", style: { fontSize: 14 + "pt" }, type: "password", name: "newPass", placeholder: "New Password" }),
    React.createElement("input", { id: "newPass2", style: { fontSize: 14 + "pt" }, type: "password", name: "newPass2", placeholder: "Re-type Password" }),
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

var setupAccountPage = function setupAccountPage(csrf) {

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

var getAccountToken = function getAccountToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupAccountPage(result.csrfToken);
  });
};

$(document).ready(function () {
  getAccountToken();
});
"use strict";

var GalleryList = function GalleryList(props) {

  if (props.feathers.length === 0) {
    return React.createElement(
      "form",
      null,
      React.createElement(
        "div",
        { className: "featherList" },
        React.createElement(
          "h3",
          { className: "emptyFeather" },
          "No public Feathers yet."
        )
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
          DecodeName(feather.name)
        ),
        React.createElement(
          "form",
          { id: "favForm", onSubmit: ToggleFav, name: "favForm", action: "/favorite", method: "POST", className: "favoriteFrom" },
          React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
          React.createElement("input", { type: "hidden", name: "feather_id", value: feather._id })
        )
      ),
      React.createElement("img", { src: feather.imageUrl, alt: "feather face", className: "featherFace", onLoad: LoadColors }),
      React.createElement("div", { id: "colorsContainer_" + feather._id, className: "colors" }),
      React.createElement(
        "form",
        { id: "ownerForm" },
        React.createElement(
          "label",
          { className: "ownerNameLabel" },
          "Added by: ",
          feather.ownerName,
          " "
        )
      )
    );
  });

  return React.createElement(
    "div",
    { id: "featherList" },
    featherNodes
  );
};

var DecodeName = function DecodeName(props) {
  var parser = new DOMParser();
  var dom = parser.parseFromString(props, 'text/html');
  var name = dom.body.textContent;

  return name;
};

var getSharedFeathersFromServer = function getSharedFeathersFromServer() {
  sendAjax('GET', '/getSharedFeathers', null, function (data) {
    ReactDOM.render(React.createElement(GalleryList, { feathers: data.feathers }), document.querySelector("#galleryContainer"));
  });
};

var setupGallery = function setupGallery(csrf) {
  var galleryContainer = document.querySelector("#galleryContainer");

  if (galleryContainer) {
    getSharedFeathersFromServer();
  }
};

var getGalleryToken = function getGalleryToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setupGallery(result.csrfToken);
  });
};

$(document).ready(function () {
  getGalleryToken();
});
"use strict";

var csrf;

var handleFeather = function handleFeather(e) {
  e.preventDefault();

  $("#errorContainer").animate({ width: 'hide' }, 350);

  //check for empty fields
  if ($("#featherName").val() == '' || $("#featherImg").val() == '') {
    handleError("All fields are required!!");
    return false;
  }

  //check to see if url is a image file
  if ($("#featherImg").val().match(/\.(jpeg|jpg|png)$/) == null) {
    handleError("Not a .png or .jpg or jpeg image");
    return false;
  }

  //invoke the post request to create a new feather sending over name and imageUrl
  sendAjax('POST', $("#featherForm").attr("action"), $("#featherForm").serialize(), function () {
    //set order images based on filters
    handleFilter(e);

    //reset name and img url field
    $('#featherName').val('');
    $('#featherImg').val('');
  });

  return false;
};

//reorder images on page based on selection in filters
var handleFilter = function handleFilter(e) {
  e.preventDefault();

  //default filter
  if ($("#filterOptions").val() == 'added') {
    loadFeathersFromServer();
  } else {
    sendAjax('POST', $("#filterForm").attr("action"), $("#filterForm").serialize(), function (data) {
      ReactDOM.render(React.createElement(FeatherList, { feathers: data.feathers }), contentContainer);
    });
  };

  return false;
};

//makes appropriate calls to delete a father
var deleteFeather = function deleteFeather(e) {
  e.preventDefault();

  sendAjax('POST', $(e.target).attr("action"), $(e.target).serialize(), function () {
    handleFilter(e);
  });

  return false;
};

//makes appropriate calls to share a father or make feather private or not
var TogglePrivacy = function TogglePrivacy(e) {
  e.preventDefault();

  sendAjax('POST', $("#shareForm").attr("action"), $(e.target).serialize(), function () {
    handleFilter(e);
  });

  return false;
};

//makes appropriate calls for user to un/favorite their feather(s)
var ToggleFav = function ToggleFav(e) {
  e.preventDefault();

  sendAjax('POST', $("#favForm").attr("action"), $(e.target).serialize(), function () {
    handleFilter(e);
  });

  return false;
};

//create the html for the name and image url field forms
var FeatherForm = function FeatherForm(props) {
  return React.createElement(
    "form",
    { id: "featherForm", onSubmit: handleFeather, name: "featherForm", action: "/maker", method: "POST", className: "featherForm" },
    React.createElement(
      "label",
      { htmlFor: "name" },
      "Name: "
    ),
    React.createElement("input", { id: "featherName", type: "text", name: "name", placeholder: "name", maxLength: "20" }),
    React.createElement(
      "label",
      { htmlFor: "img" },
      "Image: "
    ),
    React.createElement("input", { id: "featherImg", type: "text", name: "imageUrl", placeholder: "url" }),
    React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
    React.createElement("input", { className: "makeFeatherSubmit", type: "submit", value: "Add" })
  );
};

//create the html for the filters drop down selection
var FilterForm = function FilterForm(props) {
  return React.createElement(
    "form",
    { id: "filterForm", onChange: handleFilter, name: "filterForm", action: "/filtered", method: "GET", className: "filterForm" },
    React.createElement(
      "label",
      { htmlFor: "filter" },
      "Filter: "
    ),
    React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
    React.createElement(
      "div",
      { "class": "filtersContainer" },
      React.createElement(
        "select",
        { id: "filterOptions", name: "selectFilter" },
        React.createElement(
          "option",
          { value: "added" },
          "Added"
        ),
        React.createElement(
          "option",
          { value: "favorites" },
          "Favorites"
        ),
        React.createElement(
          "option",
          { value: "name" },
          "Name"
        )
      )
    )
  );
};

//show feathers on page
var FeatherList = function FeatherList(props) {
  //if no feather's exist, create instructions for user
  if (props.feathers.length === 0) {
    return React.createElement(
      "form",
      null,
      React.createElement(
        "div",
        { className: "featherList" },
        React.createElement(
          "h3",
          { className: "emptyFeather" },
          "No Feathers yet"
        )
      ),
      React.createElement(
        "div",
        { id: "stepsContainer" },
        React.createElement(
          "section",
          { id: "steps" },
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              { id: "step1" },
              React.createElement(
                "strong",
                null,
                "1."
              ),
              "Find an image from websites like Imgur."
            ),
            React.createElement(
              "li",
              { id: "step2" },
              React.createElement(
                "strong",
                null,
                "2."
              ),
              " Right-click the image and click \"Copy image address\"."
            ),
            React.createElement(
              "li",
              { id: "step3" },
              React.createElement(
                "strong",
                null,
                "3."
              ),
              " Paste the url in the \"Image\" url field and click \"Add\"."
            )
          )
        )
      )
    );
  }

  //show all feathers web page with correct properties
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
          ParseName(feather.name)
        ),
        React.createElement(
          "form",
          { id: "favForm", onSubmit: ToggleFav, name: "favForm", action: "/favorite", method: "POST", className: "favoriteFrom" },
          React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
          React.createElement("input", { type: "hidden", name: "feather_id", value: feather._id }),
          React.createElement("input", { id: "favImg", className: LoadFavoriteImg(feather.favorite), type: "submit", value: "" })
        )
      ),
      React.createElement("img", { src: '/imageRoute?url=' + feather.imageUrl, alt: "feather face", className: "featherFace", onLoad: LoadColors }),
      React.createElement("div", { id: "colorsContainer_" + feather._id, className: "colors" }),
      React.createElement(
        "form",
        { id: "shareForm", onSubmit: TogglePrivacy, name: "shareForm", action: "/share", method: "POST", className: "shareFeather" },
        React.createElement("input", { type: "hidden", name: "_csrf", value: csrf }),
        React.createElement("input", { type: "hidden", name: "feather_id", value: feather._id }),
        React.createElement("input", { className: "shareFeatherSubmit", type: "submit", value: LoadPrivacy(feather.public) })
      ),
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

//use the vibrant library to extract colors from image source
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

    //render the array of colors by calling RenderColors
    ReactDOM.render(React.createElement(RenderColors, { colors: colorArray }), document.querySelector("#colorsContainer_" + index));
  });
};

//create the html for the array of colors
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
};

//return string to be used as a className to be styled for favoriting
var LoadFavoriteImg = function LoadFavoriteImg(props) {
  var name;
  //if true
  if (props) {
    name = "favorite";
  } else {
    name = "unfavorite";
  }
  return name;
};

//return string to be used as a className to be styled for privacy
var LoadPrivacy = function LoadPrivacy(props) {
  var string;
  //if true
  if (props) {
    string = "Public";
  } else {
    string = "Private";
  }
  return string;
};

var ParseName = function ParseName(props) {
  var parser = new DOMParser();
  var dom = parser.parseFromString(props, 'text/html');
  var name = dom.body.textContent;

  return name;
};

var setup = function setup() {
  var contentContainer = document.querySelector("#contentContainer");

  if (contentContainer) {
    //renders form
    ReactDOM.render(React.createElement(FeatherForm, null), document.querySelector("#makeFeather"));

    ReactDOM.render(React.createElement(FilterForm, null), document.querySelector("#filterFeather"));

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
