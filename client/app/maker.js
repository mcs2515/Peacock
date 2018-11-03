var csrf;

const handleFeather = (e) => {
  e.preventDefault();
  
  $("#errorContainer").animate({width:'hide'},350);
	
	//check for empty fields
  if($("#featherName").val() == '' || $("#featherImg").val() == ''){
    handleError("All fields are required!!");
    return false;
  }
  
	//check to see if url is a image file
  if($("#featherImg").val().match(/\.(jpeg|jpg|png)$/) == null){
    handleError("Not a .png or .jpg or jpeg image");
    return false;
  }
  
	//invoke the post request to create a new feather sending over name and imageUrl
  sendAjax('POST', $("#featherForm").attr("action"),$("#featherForm").serialize(),function() {
		//set order images based on filters
    handleFilter(e);
		
		//reset name and img url field
    $('#featherName').val('');
    $('#featherImg').val('');
  });
  
  return false;
}

//reorder images on page based on selection in filters
const handleFilter = (e) => {
  e.preventDefault();
	
	//default filter
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

//makes appropriate calls to delete a father
const deleteFeather = (e) =>{
  e.preventDefault();
  
  sendAjax('POST', $(e.target).attr("action"),$(e.target).serialize(),function() {
    handleFilter(e);
  });
  
  return false;
}

//makes appropriate calls to share a father or make feather private or not
const TogglePrivacy = (e) => {
  e.preventDefault();
  
  sendAjax('POST', $("#shareForm").attr("action"),$(e.target).serialize(),function() {
    handleFilter(e);
  });
  
  return false;
}

//makes appropriate calls for user to un/favorite their feather(s)
const ToggleFav = (e) => {
  e.preventDefault();
  
  sendAjax('POST', $("#favForm").attr("action"),$(e.target).serialize(),function() {
    handleFilter(e);
  });
  
  return false;
}

//create the html for the name and image url field forms
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

//create the html for the filters drop down selection
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

//show feathers on page
const FeatherList = (props) =>{
	//if no feather's exist, create instructions for user
  if(props.feathers.length === 0){
    return (
      <form>
        <div className="featherList">
          <h3 className="emptyFeather">No Feathers yet</h3>
        </div>
        
        <div id= "stepsContainer">
          <section id="steps">
            <ul>
              <li id= "step1"><strong>1 .</strong> <p>Find an image of .png or .jpeg or .jpg format from the web <span>( websites like Imgur or Google Images )</span></p></li>
              <li id= "step2"><strong>2 .</strong> Right-click the image and click "Copy image address"</li>
              <li id= "step3"><strong>3 .</strong> Give the image a name, paste the image url in the url field, and click "Add" </li>
            </ul>
          </section>
        </div>
      </form>
    );
  }
  
	//show all feathers web page with correct properties
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
        
        <img src={'/imageRoute?url=' + feather.imageUrl} alt="feather face" className="featherFace" onLoad = {LoadColors}/>
        
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

//use the vibrant library to extract colors from image source
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
    
		//render the array of colors by calling RenderColors
    ReactDOM.render(<RenderColors colors={colorArray} />, document.querySelector("#colorsContainer_" + index));
  });
};

//create the html for the array of colors
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

//return string to be used as a className to be styled for favoriting
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

//return string to be used as a className to be styled for privacy
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