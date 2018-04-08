const handlePassChange = (e) => {
	e.preventDefault();
	
  $("#errorContainer").animate({width:'hide'},350);
	
	if($("#oldPass").val() == '' || $("#newPass").val() == ''|| $("#newPass2").val() == ''){
		handleError("All fields are required");
		return false;
	}
	
	sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
		
	return false;
};

const SettingsForm= (props) =>{
	//renders form
  return (
  	<form id="passwordForm" name="passwordForm" onSubmit={handlePassChange} action="/changePassword" method="POST" className="passwordForm">
			<h3>Change Password</h3>
      <input id="oldPass" type="text" name="oldPass" placeholder="Old Password"/>
      <input id="newPass" type="text" name="newPass" placeholder="New Password"/>
      <input id="newPass2" type="text" name="newPass2" placeholder="Re-type Password"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="passwordSubmit" type="submit" value="Update" />
    </form>
  );
};

const setupSettings= function(csrf){
    
	const settingsContainer = document.querySelector("#settingsContainer");
	
	console.log("settingsContainer: " + settingsContainer);
	
	if(settingsContainer){	
      //renders form
      ReactDOM.render(
        <SettingsForm csrf={csrf} />,settingsContainer
      );
  }
};

const getSettingsToken = () =>{
  sendAjax('GET', '/getToken', null, (result)=>{
    //console.log(result.csrfToken);
    setupSettings(result.csrfToken);
  });
};

$(document).ready(function(){
  getSettingsToken();
});
