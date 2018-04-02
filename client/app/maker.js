var csrf;

const handleFeather = (e) => {
  e.preventDefault();
  
  $("#featherMessage").animate({width:'hide'},350);
	
  if($("#featherName").val() == '' || $("#featherImg").val() == ''){
    handleError("RAWR! All fields are required");
		console.log('trigger1');
    return false;
  }
  
  sendAjax('POST', $("#featherForm").attr("action"),$("#featherForm").serialize(),function() {
    loadFeathersFromServer();
  });
  
  return false;
}

const deleteFeather = (e) =>{
  
  console.dir(e.target);
  e.preventDefault();
  
  sendAjax('POST', $(e.target).attr("action"),$(e.target).serialize(),function() {
      loadFeathersFromServer();
  });
  
  return false;
}

const FeatherForm = (props) => {
  return (
    <form id="featherForm" onSubmit={handleFeather} name="featherForm" action="/maker" method="POST" className="featherForm">
      <label htmlFor="name">Name: </label>
      <input id="featherName" type="text" name="name" placeholder="Feather Name"/>
      <label htmlFor="img">Image: </label>
      <input id="featherImg" type="text" name="imageUrl" placeholder="url"/>
      <input type="hidden" name="_csrf" value={csrf} />
      <input className="makeFeatherSubmit" type="submit" value="Make Feather"/>
    </form>
  );
}

const FeatherList = function(props) {
  if(props.feathers.length === 0){
    return (
      <div className="featherList">
        <h3 className="emptyFeather">No Feathers yet</h3>
      </div>
    );
  }
  
  const featherNodes = props.feathers.map(function(feather) {
    return (
      <div data-key={feather._id} className="feather">
        <img src={feather.imageUrl} alt="feather face" className="featherFace" />
        <h3 className="featherName"> Name: {feather.name}</h3>
        <h3 className="featherRarity"> Favorite: {feather.favorite}</h3>
        
        <form id="deleteForm" onSubmit={deleteFeather} name="deleteForm" action="/delete" method="POST" className="deleteFeather">
          <input type="hidden" name="_csrf" value={csrf} />
          <input type="hidden" name="feather_id" value={feather._id} />
          <input className="deleteFeatherSubmit" type="submit" value="Delete Feather"/>
        </form>
      </div>
    );
  });
  
  return (
    <div id="featherList">
      {featherNodes}
    </div>
  );
};

const loadFeathersFromServer = () => {
  sendAjax('GET','/getFeathers', null, (data) => {
    ReactDOM.render(
      <FeatherList feathers={data.feathers} />, document.querySelector("#feathers")
    );
  });
};

const setup = function() {
  //renders form
  ReactDOM.render(
    <FeatherForm/>,document.querySelector("#makeFeather")
  );
  
  //renders default feather list display
  ReactDOM.render(
    <FeatherList feathers={[]}/>,document.querySelector("#feathers")
  );
  
  loadFeathersFromServer();
};

const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) =>{
        csrf = result.csrfToken;
		setup();
	});
};

$(document).ready(function() {
  getToken();
});