// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

/* Global Variables */

// my API key for OpenWeatherMap
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=9587dd825880b491bf30f95eab2d333b';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

//performAction Function called by event listener
function performAction(e){
    // Get the User Inputs
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
/* getWeather Function */
getWeather(baseURL,newZip, apiKey)

    .then(function(data){
        //add the data to POST Request
        postData('/addData', {date:newDate , temp:data.list[0].main.temp , content:feelings})
        updateUI();
    })
};

/* Function to Get Web API Data */

const getWeather = async(baseURL , zip , key)=>{
    //the result of fetch function
    const res = await fetch(baseURL + zip + key);
    try {
        const data = await res.json();
        return data;
    }catch(error){
        console.log ("error",error);
    }
}

/* Functiom to POST Data */

const postData = async ( url= '' , data = {})=>{
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error",error);
    }
};

/* The updateUI Function*/

const updateUI = async () => {
    const request = await fetch('/allData');
    try{
        const allData = await request.json();
        // update new entry values
        document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
        document.getElementById('temp').innerHTML = `Temperatuer: ${allData[0].temp}`;
        document.getElementById('content').innerHTML = `I Feel: ${allData[0].content}`;
    }catch(error){
        console.log("error",error)
    }
}




/* Hide the " Most Recent Entry " title function using visibility */
function myFunction() {
    document.getElementById("myDiv").style.visibility = "hidden";
  }