var csrf;

const handleDomo = (e) => {
  e.preventDefault();
  
  $("#domoMessage").animate({width:'hide'},350);
  
  if($("#domoName").val() == '' || $("#domoAge").val() == ''){
    handleError("RAWR! All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#domoForm").attr("action"),$("#domoForm").serialize(),function() {
    loadDomosFromServer();
  });
  
  return false;
}

const deleteDomo = (e) =>{
  
  console.dir(e.target);
  e.preventDefault();
  
  sendAjax('POST', $(e.target).attr("action"),$(e.target).serialize(),function() {
      loadDomosFromServer();
  });
  
  return false;
}

const DomoForm = (props) => {
  return (
    <form id="domoForm" onSubmit={handleDomo} name="domoForm" action="/maker" method="POST" className="domoForm">
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
      <label htmlFor="rarity">Rarity: </label>
      <input id="domoRarity" type="text" name="rarity" placeholder="Domo Rarity"/>
      <input type="hidden" name="_csrf" value={csrf} />
      <input className="makeDomoSubmit" type="submit" value="Make Domo"/>
    </form>
  );
}

const DomoList = function(props) {
  if(props.domos.length === 0){
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos yet</h3>
      </div>
    );
  }
  
  const domoNodes = props.domos.map(function(domo) {
    return (
      <div data-key={domo._id} className="domo">
        <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
        <h3 className="domoName"> Name: {domo.name}</h3>
        <h3 className="domoRarity"> rarity: {domo.rarity}</h3>
        <h3 className="domoAge"> age: {domo.age}</h3>
        
        <form id="deleteForm" onSubmit={deleteDomo} name="deleteForm" action="/delete" method="POST" className="deleteDomo">
          <input type="hidden" name="_csrf" value={csrf} />
          <input type="hidden" name="domo_id" value={domo._id} />
          <input className="deleteDomoSubmit" type="submit" value="Delete Domo"/>
        </form>
      </div>
    );
  });
  
  return (
    <div id="domoList">
      {domoNodes}
    </div>
  );
};

const loadDomosFromServer = () => {
  sendAjax('GET','/getDomos', null, (data) => {
    ReactDOM.render(
      <DomoList domos={data.domos} />, document.querySelector("#domos")
    );
  });
};

const setup = function() {
  //renders form
  ReactDOM.render(
    <DomoForm/>,document.querySelector("#makeDomo")
  );
  
  //renders default domo list display
  ReactDOM.render(
    <DomoList domos={[]}/>,document.querySelector("#domos")
  );
  
  loadDomosFromServer();
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