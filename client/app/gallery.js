const GalleryList = (props) =>{
  if(props.feathers.length === 0){
    return (
      
      <form>
        <div className="featherList">
          <h3 className="emptyFeather">No public Feathers yet.</h3>
        </div>
      </form>
    );
  }
  
  const featherNodes = props.feathers.map(function(feather,index) {
		
    return (
      <div data-key={feather._id} className="feather">
        <div className= "imageHeader">
          <h3 className="featherName"> {feather.name}</h3>
					
          <form id="favForm" onSubmit= {ToggleFav} name="favForm" action="/favorite" method="POST" className="favoriteFrom">
            <input type="hidden" name="_csrf" value={csrf} />
            <input type="hidden" name="feather_id" value={feather._id} />
          </form>
        </div>
				
        <img src={feather.imageUrl} alt="feather face" className="featherFace" onLoad = {LoadColors}/>
        
        <div id= {"colorsContainer_"+feather._id} className= "colors"></div>
      </div>
    );
  });
  
  return (
    <div id="featherList">
      {featherNodes}
    </div>
  );
};

const setupGallery= function(csrf){
    
  const galleryContainer = document.querySelector("#galleryContainer");
	console.log(galleryContainer);

  if(galleryContainer){	
    //renders form
    ReactDOM.render(
      <GalleryList csrf={csrf} />,galleryContainer
    );
  } 
};

const getGalleryToken = () =>{
  sendAjax('GET', '/getToken', null, (result)=>{
    setupGallery(result.csrfToken);
  });
};

$(document).ready(function(){
  getGalleryToken();
});