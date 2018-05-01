var csrf;

const handleFeather = (e) => {
  e.preventDefault();
  
  $("#errorContainer").animate({width:'hide'},350);
	
  if($("#featherName").val() == '' || $("#featherImg").val() == ''){
    handleError("All fields are required!!");
    return false;
  }
  
  if($("#featherImg").val().match(/\.(jpeg|jpg|png)$/) == null){
    handleError("Not a .png or .jpg or jpeg image");
    return false;
  }
  
  sendAjax('POST', $("#featherForm").attr("action"),$("#featherForm").serialize(),function() {
    handleFilter(e);
    $('#featherName').val('');
    $('#featherImg').val('');
  });
  
  return false;
}

const handleFilter = (e) => {
  e.preventDefault();
	
	if($("#filterOptions").val() == 'added'){
		loadFeathersFromServer();
	}
	else{
		sendAjax('POST',$("#filterForm").attr("action"), $("#filterForm").serialize(), function(data){
			ReactDOM.render(
				<FeatherList feathers={data.feathers}/>,contentContainer
			);
		});
	};
  
  return false;
}

const deleteFeather = (e) =>{
  e.preventDefault();
  
  sendAjax('POST', $(e.target).attr("action"),$(e.target).serialize(),function() {
    handleFilter(e);
  });
  
  return false;
}

const TogglePrivacy = (e) => {
  e.preventDefault();
  
  sendAjax('POST', $("#shareForm").attr("action"),$(e.target).serialize(),function() {
    handleFilter(e);
  });
  
  return false;
}

const ToggleFav = (e) => {
  e.preventDefault();
  
  sendAjax('POST', $("#favForm").attr("action"),$(e.target).serialize(),function() {
    handleFilter(e);
  });
  
  return false;
}

const FeatherForm = (props) => {
  return (
    <form id="featherForm" onSubmit={handleFeather} name="featherForm" action="/maker" method="POST" className="featherForm">
      <label htmlFor="name">Name: </label>
      <input id="featherName" type="text" name="name" placeholder="name" maxLength="20"/>
      <label htmlFor="img">Image: </label>
      <input id="featherImg" type="text" name="imageUrl" placeholder="url"/>
      <input type="hidden" name="_csrf" value={csrf} />
      <input className="makeFeatherSubmit" type="submit" value="Add"/>
    </form>
  );
}

const FilterForm = (props) => {
  return (
    <form id="filterForm" onChange={handleFilter} name="filterForm" action="/filtered" method="GET" className="filterForm">
			<label htmlFor="filter">Filter: </label>
      <input type="hidden" name="_csrf" value={csrf} />
			<div class= "filtersContainer"> 
				<select id= "filterOptions" name ="selectFilter">
					<option value = "added">Added</option>
					<option value = "favorites">Favorites</option>
					<option value = "name">Name</option>
				</select>
			</div>
    </form>
  );
}


const FeatherList = (props) =>{
  if(props.feathers.length === 0){
    return (
      <form>
        <div className="featherList">
          <h3 className="emptyFeather">No Feathers yet</h3>
        </div>
        
        <div id= "stepsContainer">
          <section id="steps">
            <ul>
              <li id= "step1"><strong>1.</strong>Find an image from any website or Google image search.</li>
              <li id= "step2"><strong>2.</strong> Right-click the image and click "Copy image address".</li>
              <li id= "step3"><strong>3.</strong> Paste the url in the "Image" url field and click "Add".</li>
            </ul>
          </section>
        </div>
      </form>
    );
  }
  
  const featherNodes = props.feathers.map(function(feather,index) {
    return (
      <div data-key={feather._id} className="feather">
        <div className= "imageHeader">
          <h3 className="featherName"> {ParseName(feather.name)}</h3>
          
          <form id="favForm" onSubmit= {ToggleFav} name="favForm" action="/favorite" method="POST" className="favoriteFrom">
            <input type="hidden" name="_csrf" value={csrf} />
            <input type="hidden" name="feather_id" value={feather._id} />
            <input id="favImg" className= {LoadFavoriteImg(feather.favorite)} type="submit" value= ""/>
          </form>
        </div>
        
        <img src={feather.imageUrl} alt="feather face" className="featherFace" onLoad = {LoadColors}/>
        
        <div id= {"colorsContainer_"+feather._id} className= "colors"></div>
        
        <form id="shareForm"  onSubmit= {TogglePrivacy} name="shareForm" action="/share" method="POST" className="shareFeather">
          <input type="hidden" name="_csrf" value={csrf} />
          <input type="hidden" name="feather_id" value={feather._id} />
          <input className="shareFeatherSubmit" type="submit" value={LoadPrivacy(feather.public)}/>
        </form>
        
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
};

const LoadFavoriteImg=(props)=>{
  var name;
  //if true
  if(props){
    name = "favorite";
  }
  else{
    name = "unfavorite"
  }
  return name;
};

const LoadPrivacy=(props)=>{
  var string;
  //if true
  if(props){
    string = "Public";
  }
  else{
    string = "Private";
  }
  return string;
};

const ParseName=(props)=>{
	var parser = new DOMParser;
	var dom = parser.parseFromString(props, 'text/html');
	var name = dom.body.textContent;

	return name;
}

const setup = function() {
  const contentContainer = document.querySelector("#contentContainer");
  
  if(contentContainer){
    //renders form
    ReactDOM.render(
      <FeatherForm/>,document.querySelector("#makeFeather")
    );
		
		ReactDOM.render(
      <FilterForm/>,document.querySelector("#filterFeather")
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