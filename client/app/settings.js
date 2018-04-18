const handlePassChange = (e) => {
	e.preventDefault();
	
    $("#errorContainer").animate({width:'hide'},350);
	
	if($("#oldPass").val() == '' || $("#newPass").val() == ''|| $("#newPass2").val() == ''){
		handleError("All fields are required!!");
		return false;
	}
	
	sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
		
	return false;
};

const handleDonate = (e) =>{
  e.preventDefault();
  return false;
}

const PasswordForm= (props) =>{
	//renders form
  return (
  	<form id="passwordForm" name="passwordForm" onSubmit={handlePassChange} action="/changePassword" method="POST" className="passwordForm">
      <h3>Change Password:</h3>
      <input id="oldPass" style= {{fontSize: 14 + "pt"}} type="password" name="oldPass" placeholder="Old Password"/>
      <input id="newPass" style= {{fontSize: 14 + "pt"}} type="password" name="newPass" placeholder="New Password"/>
      <input id="newPass2" style= {{fontSize: 14 + "pt"}} type="password" name="newPass2" placeholder="Re-type Password"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="passwordSubmit" type="submit" value="Update" />
    </form>
  );
};

const DonateForm= (props) =>{
	//renders form
  return (
  	<form id="donateForm" name="donateForm" onSubmit={handleDonate} action="/donate" method="POST" className="donateForm">
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="donateSubmit" type="submit" value="$1" />
      <input className="donateSubmit" type="submit" value="$5" />
      <input className="donateSubmit" type="submit" value="$10" />
      <input className="donateSubmit" type="submit" value="$25" />
			
		<img id = "creditCards" src="assets/img/cc.png" alt="Credit Cards" />
    </form>
  );
};

const setupSettings= function(csrf){
    
  const passwordContainer = document.querySelector("#passwordContainer");
  const donateContainer = document.querySelector("#donateContainer");

  if(passwordContainer){	
    //renders form
    ReactDOM.render(
      <PasswordForm csrf={csrf} />,document.querySelector("#updateForm")
    );
  } 
  
  if(donateContainer){	
    //renders form
    ReactDOM.render(
      <DonateForm csrf={csrf} />,document.querySelector("#moneyForm")
    );
  } 
};

const getSettingsToken = () =>{
  sendAjax('GET', '/getToken', null, (result)=>{
    setupSettings(result.csrfToken);
  });
};

$(document).ready(function(){
  getSettingsToken();
});
