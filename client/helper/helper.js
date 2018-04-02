const handleError = (message) => {
  $("#errorMessage").text(message);
  $("#featherMessage").animate({width:'toggle'},350);
}

const redirect = (response) =>{
	$("#featherMessage").animate({width:'hide'},350);
	window.location = response.redirect;
}

const sendAjax = (type, action, data, success) => {
	$.ajax({
		cashe: false,
		type:type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: function(xhr, status, error) {
			var messageObj = JSON.parse(xhr.responseText);
			handleError(messageObj.error);
		}
	})
}