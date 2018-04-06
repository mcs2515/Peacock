var csrf;
var render_colors;

const handleFeather = (e) => {
  e.preventDefault();
  
  $("#featherMessage").animate({width:'hide'},350);
	
  if($("#featherName").val() == '' || $("#featherImg").val() == ''){
    handleError("RAWR! All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#featherForm").attr("action"),$("#featherForm").serialize(),function() {
    loadFeathersFromServer();
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
      <input className="makeFeatherSubmit" type="submit" value="Make Feather"/>
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
  
  const featherNodes = props.feathers.map(function(feather) {
		
    return (
      <div data-key={feather._id} className="feather">
        <img src={feather.imageUrl} alt="feather face" className="featherFace" onLoad = {LoadColors}/>
        <h3 className="featherName"> Name: {feather.name}</h3>
        <h3 className="featherRarity"> Favorite: {feather.favorite}</h3>

				<div id= "colorsContainer">

				</div>
				
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
	
	//console.log(palette);
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

const LoadColors = (e) =>{
	Vibrant.from(e.target.src).getPalette(function(err, palette) {

//    https://embed.plnkr.co/plunk/DGLrkj 
		let colorArray= [];
		
		for ( var swatch in palette ) {
			if (palette.hasOwnProperty(swatch) && palette[swatch]) { 
				
				let bg_color = palette[swatch].getHex();
				let title_text_color =  palette[swatch].getTitleTextColor();			
				let body_text_color = palette[swatch].getBodyTextColor();
				let swatch_name = swatch;
				
				const code = {
					backgroundColor: bg_color,
					bodyTColor: body_text_color,
					titleTColor: body_text_color,
					swatchName: swatch,
				}
				
				colorArray.push(code);
			}
    }
		
		ReactDOM.render(<RenderColors colors={colorArray} />, document.querySelector('#colorsContainer'));
		//console.log(colorArray);
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
  
	console.log("reached");
  return (
		<ul class="colors">
      {colorNodes}
		</ul>
  );
	console.log("done");
}

const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) =>{
		csrf = result.csrfToken;
		setup();
	});
};

$(document).ready(function() {
  getToken();
});