var csrf;

const handleFeather = (e) => {
  e.preventDefault();
  
  $("#errorContainer").animate({width:'hide'},350);
	
  if($("#featherName").val() == '' || $("#featherImg").val() == ''){
    handleError("All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#featherForm").attr("action"),$("#featherForm").serialize(),function() {
    loadFeathersFromServer();
    $('#featherName').val('');
    $('#featherImg').val('');
  });
  
  return false;
}

const deleteFeather = (e) =>{

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
      <input id="featherName" type="text" name="name" placeholder="name"/>
      <label htmlFor="img">Image: </label>
      <input id="featherImg" type="text" name="imageUrl" placeholder="url"/>
      <input type="hidden" name="_csrf" value={csrf} />
      <input className="makeFeatherSubmit" type="submit" value="Add"/>
    </form>
  );
}

const FeatherList = (props) =>{
  if(props.feathers.length === 0){
    return (
      <div className="featherList">
        <h3 className="emptyFeather">No Feathers yet</h3>
      </div>
    );
  }
  
  const featherNodes = props.feathers.map(function(feather,index) {
		
    return (
      <div data-key={feather._id} className="feather">
        <div className= "imageHeader">
          <h3 className="featherName"> {feather.name}</h3>
          <h3 className="featherRarity"> Favorite: {feather.favorite}</h3>
        </div>
        <img src={feather.imageUrl} alt="feather face" className="featherFace" onLoad = {LoadColors}/>
        
        <div id= {"colorsContainer_"+feather._id} className= "colors">

        </div>
				
        <form id="deleteForm" onSubmit={deleteFeather} name="deleteForm" action="/delete" method="POST" className="deleteFeather">
          <input type="hidden" name="_csrf" value={csrf} />
          <input type="hidden" name="feather_id" value={feather._id} />
          <input className="deleteFeatherSubmit" type="submit" value="Remove"/>
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
      <FeatherList feathers={data.feathers} />, document.querySelector("#contentContainer")
    );
  });
};

const LoadColors = (e) =>{
	let index = e.target.parentElement.getAttribute("data-key");
	
	Vibrant.from(e.target.src).getPalette(function(err, palette) {

		let colorArray= [];
		
		for ( var swatch in palette ) {
			if (palette.hasOwnProperty(swatch) && palette[swatch]) { 

				let bg_color = palette[swatch].getHex();
				let title_text_color =  palette[swatch].getTitleTextColor();			
				let body_text_color = palette[swatch].getBodyTextColor();
				let swatch_name = swatch;
				if (swatch !='LightMuted') {
            const code = {
              backgroundColor: bg_color,
              bodyTColor: body_text_color,
              titleTColor: body_text_color,
              swatchName: swatch,
            }

            colorArray.push(code);
        }
			}
    }

		ReactDOM.render(<RenderColors colors={colorArray} />, document.querySelector("#colorsContainer_" + index));
    
	});
};

const RenderColors = (props) => {
	
	const colorNodes = props.colors.map(function(color) {

    return (
      <li style={{backgroundColor: color.backgroundColor}}>
          <p style = {{color: color.titleTColor}}> {color.backgroundColor}</p>
          <small style ={{color: color.bodyTColor}}> {color.swatchName} </small>
      </li>
    );
  });
	
  return (
		<ul class="colors">
      {colorNodes}
		</ul>
  );
	console.log("done");
};

const setup = function() {
	const contentContainer = document.querySelector("#contentContainer");
	
	console.log("contentContainer: " + contentContainer);
	
	if(contentContainer){
		//renders form
		ReactDOM.render(
			<FeatherForm/>,document.querySelector("#makeFeather")
		);

		//renders default feather list display
		ReactDOM.render(
			<FeatherList feathers={[]}/>,contentContainer
		);

		loadFeathersFromServer();
	}
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