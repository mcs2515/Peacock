const AboutForm = (props) =>{
  return(
    <form>
      <h1>About: </h1>
      <p>Peacock was specifically made for those who are inspired by the colors of an image and would like to save the images to a library. Peacock allows users to create a 'Feather' on their page that has the saved image url and image name. <a href="https://jariz.github.io/vibrant.js/" target="_blank">Vibrant.js</a> is then used to extract out prominent colors from the image to give the user the hex values of the vibrant and muted colors. Peacock was made with <a href="https://nodejs.org/en/" target="_blank">Node.js</a> and <a href="https://reactjs.org/" target="_blank">React.js</a>. </p>
      
      <section id="steps">
        <ul>
          <li id= "step1"><strong>1.</strong>Find an image from websites like Imgur.</li>
          <li id= "step2"><strong>2.</strong> Right-click the image and click "Copy image address".</li>
          <li id= "step3"><strong>3.</strong> Paste the url in the "Image" url field and click "Add".</li>
        </ul>
      </section>
    </form>
  );
}

const ActivityForm = (props) =>{
  return(
    <form>
      <h1>Website Updates:</h1>
      
      <div id="logs">
        <ul>
          <li><time>May 19, 2018</time> Added a Home button and fixed GitHub link.</li>
          <li><time>Apr 30, 2018</time> Limited name for feathers to 25 characters long. Added check for .png and .jpeg images.</li>
          <li><time>Apr 29, 2018</time> Users can now filter their images by favorites, name, and when they were added.</li>
          <li><time>Apr 22, 2018</time> Added gallery page for all public Feathers.</li>
          <li><time>Apr 21, 2018</time> Added Public & Private buttons to allow for Feather sharing.</li>
          <li><time>Apr 18, 2018</time> Moved web pages around and added redirect.</li>
          <li><time>Apr 16, 2018</time> Replaced password fields with dots and new password cannot equal current password.</li>
          <li><time>Apr 13, 2018</time> Created the About page with styling.</li>
          <li><time>Apr 11, 2018</time> Added favorite 'Feather' feature.</li>
          <li><time>Apr 9, 2018</time> Styled the Settings page and included buttons and images for the donate section of the page.</li>
          <li><time>Apr 8, 2018</time> Created a Settings page to allow users to change their current passwords.</li>
          <li><time>Apr 6, 2018</time> Styled 'Feather' containers and removed Light Muted Swatches.</li>
          <li><time>Apr 5, 2018</time> <a href="https://jariz.github.io/vibrant.js/" target="_blank">Vibrant.js</a> now extracts colors from all images saved.</li>
          <li><time>Apr 4, 2018</time> Implemented <a href="https://jariz.github.io/vibrant.js/" target="_blank">Vibrant.js</a> to work for only one image. </li>
          <li><time>Apr 2, 2018</time> Added new field to allow users to user image URls to create 'Feathers' with images.</li>
          <li><time>Mar 30, 2018</time> Added a delete feature for users to delete a 'Feather'.</li>
        </ul>			
      </div>
      
      <section id="logFooter">
        <p>For detailed list of changes: </p><a href="https://github.com/mcs2515/Peacock" target="_blank"> Github </a>
      </section>
    </form>
  );
}


const setupAbout= function(csrf){
    
  const aboutContainer = document.querySelector("#aboutContainer");
  
  if(aboutContainer){	
    //renders form
    ReactDOM.render(
      <AboutForm csrf={csrf} />,document.querySelector("#aboutInfo")
    );
    
    //renders form
    ReactDOM.render(
      <ActivityForm csrf={csrf} />,document.querySelector("#activityLog")
    );
  } 
};

const getAboutToken = () =>{
  sendAjax('GET', '/getToken', null, (result)=>{
    setupAbout(result.csrfToken);
  });
};

$(document).ready(function(){
  getAboutToken();
});