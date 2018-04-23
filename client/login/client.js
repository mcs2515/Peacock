const handleLogin = (e) => {
  e.preventDefault();
  
  $("#errorContainer").animate({width:'hide'},350);
  
  if($("#user").val() == '' || $("#pass").val() == ''){
    handleError("Username or password is empty!!");
    return false;
  }
  
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  
  return false;
};

const handleSignup = (e) => {
  
  e.preventDefault();
  
  $("#errorContainer").animate({width:'hide'},350);
  
  if($("#user").val() == '' || $("#pass").val() == ''|| $("#pass2").val() == ''){
    handleError("All fields are required!!");
    return false;
  }
  
  if($("#pass").val() !== $("#pass2").val()){
    handleError("Passwords do not match!!");
    return false;
  }
  
  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  
  return false;
};

const LoginWindow = (props) =>{
  return(
    <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">
      <h3>Login to your Account.</h3>
      <input id="user" style= {{fontSize: 14 + "pt"}} type="text" name="username" placeholder="Username"/>
      <input id="pass" style= {{fontSize: 14 + "pt"}} type="password" name="pass" placeholder="Password"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="formSubmit" type="submit" value="Sign In" />
    </form>
  );
};

const SignupWindow = (props) => {
  return (
    <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">
      <h3>Create a New Account.</h3>
      <input id="user" style= {{fontSize: 14 + "pt"}} type="text" name="username" placeholder="Username"/>
      <input id="pass" style= {{fontSize: 14 + "pt"}} type="password" name="pass" placeholder="Password"/>
      <input id="pass2" style= {{fontSize: 14 + "pt"}} type="password" name="pass2" placeholder="Re-type Password"/>
      <input type="hidden" name="_csrf" value={props.csrf}/>
      <input className="formSubmit" type="submit" value="Sign Up" />
    </form>
  );
};

const createLoginWindow = (csrf) => {
  ReactDOM.render(
    <LoginWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

const createSignupWindow = (csrf) => {
  ReactDOM.render(
    <SignupWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

const setup = (csrf) => {
  const signupButton = document.querySelector("#signupButton");
  const loginButton = document.querySelector("#loginButton");
  
  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    createSignupWindow(csrf);
    
    loginButton.classList.remove("selected");
    loginButton.classList.add("unselected");
    signupButton.classList.remove("unselected");
    signupButton.classList.add("selected");
    
    return false;
  });
  
  loginButton.addEventListener("click", (e) => {
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

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result) =>{
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});