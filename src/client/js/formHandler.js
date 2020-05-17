import { checkUrl } from "./checkUrl";

//making a global variable even if it's bad practice
const resultsDiv = document.getElementById("results");

function handleSubmit(event) {
  event.preventDefault();
  let formUrl = document.getElementById("url").value;
  const urlValid = checkUrl(formUrl);
  //remove any kind of text we had before
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }

  if (urlValid) {
    console.log('---URL IS VALID, FETCHING---');
    fetch(`http://localhost:${app_port}/analyzeSentiment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: formUrl })
    })
      .then(res => res.json())
      .then(res => parseData(res, resultsDiv))
      .catch(error => {
        console.log("error from fetch-catch:"+error);
        console.log(res.error);
        
        
      });
  } else {
    parseError();
  }
}

//send data to the page
function parseData(res, resultsDiv){
    const responseProps = Object.keys(res);
    for (let index = 0; index < responseProps.length; index++) {
      if (responseProps[index] !== "text") {
        const label = document.createElement("div");
        const value = document.createElement("div");
        label.className = "label";
        let fieldLabel = responseProps[index]
          .split("_")
          .map(item => item.charAt(0).toUpperCase() + item.slice(1))
          .join(" ");
        label.textContent = fieldLabel;

        value.classList.add("dataCell");
        value.setAttribute("id", responseProps[index]);
        //add colors to different polarities
        if (responseProps[index] === "polarity") {
          if (res["polarity"] === "positive")
              value.classList.add("colorPositive");
          else value.classList.add("colorNegative");
        }
        value.textContent = res[responseProps[index]];

        resultsDiv.appendChild(label);
        resultsDiv.appendChild(value);
      }
    }
    const resultsParagraph = document.createElement("p");
    resultsParagraph.textContent = res["text"];
    //not sure why not working, maybe add div?
    resultsParagraph.className = "paraText";
    
    resultsDiv.appendChild(resultsParagraph);
 
  
}

function parseError(){
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.textContent = "Your URL isn't valid, enter a new one!";
  resultsDiv.appendChild(errorDiv);
}


export { handleSubmit };