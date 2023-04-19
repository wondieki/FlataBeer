
//Declaring all the variables
const beerList = document.getElementById("beer-list");
const beerImage = document.getElementById("beer-image");
const beerName = document.getElementById("beer-name");
const beerDescription = document.getElementById("beer-description");
const reviewsList = document.getElementById("review-list");
const descriptionForm = document.getElementById("description-form");
//const reviewForm = document.getElementById("review-form");

const url="http://localhost:3000/beers"


//This function retrives the first beer and all beers and reviews in the list
function retrieveAllBeers(){
fetch("http://localhost:3000/beers")
.then ((response)=>response.json())
.then((data) => {
    const myJSON = JSON.stringify(data)
    const obj = JSON.parse(myJSON)


    for (let i=0; i<3; i++ )
    {
        const myJSON1 = JSON.stringify(obj[i])
        const obj1 = JSON.parse(myJSON1)
        if (i == 0)
        {
            let item = beerList.firstElementChild;
            item.textContent = obj1.name;
            
        } 
        else if (i == 2)  
        {
            let item = beerList.lastElementChild;
            item.textContent = obj1.name;
        }
        else
        {
            let element = document.createElement("li");
            let testN = document.createTextNode(obj1.name);
            element.appendChild(testN);
            beerList.replaceChild(element,beerList.childNodes[i+2]);
        }
        
        
    }

    for(i = 3; i<10; i++)
    {
        const myJSON1 = JSON.stringify(obj[i])
        const obj1 = JSON.parse(myJSON1)
        let entry = document.createElement("li");
        let textN = document.createTextNode(obj1.name);
        entry.appendChild(textN)
        beerList.appendChild(entry)

    }
    const myJSON2 = JSON.stringify(obj[0])
    const obj1 = JSON.parse(myJSON2)
    beerName.innerHTML = obj1.name;
    beerImage.src = obj1.image_url;
    beerDescription.innerHTML = obj1.description;
    
    let li = reviewsList.getElementsByTagName('li');

let review1 = reviewsList.firstElementChild;
let review2 =  reviewsList.lastElementChild
   review1.textContent = obj1.reviews[0]
   review2.textContent = obj1.reviews[1]
   
});
}
//Call the All beer function that also includes the first beer.
retrieveAllBeers();


//Add Eventlistener

reviewForm.addEventListener("submit", addReview);

fetch(url, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ description: updatedDescription })
})
.then(response => response.json())
.then(data => {
    // Update the beer's description on the page
    beerDescription.innerHTML = updatedDescription;
})
.catch(error => {
    console.error("Error updating description:", error);
});
