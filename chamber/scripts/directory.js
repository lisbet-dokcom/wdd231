

const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const memberContainer = document.getElementById("members");

async function fetchMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayMembers(members) {
    memberContainer.innerHTML = "";
    memberContainer.classList.add("grid");

    members.forEach((mem) => {
        const card = document.createElement("div");
        card.classList.add("mem-card");

        card.innerHTML = `
            <h2>${mem.name}</h2>
            <p>${mem.address}</p>
            <p>${mem.phoneNumber}</p>
            <p><strong>Membership:</strong> ${mem.membershipLevel}</p>
            <p><a href="${mem.websiteUrl}" target="_blank">${mem.websiteUrl}</a></p>
            <p>${mem.others}</p>`;

        const image = document.createElement("img");
        image.src = mem.image;
        image.alt = `Logo of ${mem.name}`;
        image.loading = "lazy";
        card.appendChild(image);

        memberContainer.appendChild(card);
    });
}


gridButton.addEventListener("click", () => {
    memberContainer.classList.add("grid");
    memberContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    memberContainer.classList.add("list");
    memberContainer.classList.remove("grid");
});

document.addEventListener("DOMContentLoaded", () => {
    fetchMembers();
});

// // select HTML elements in the document
// const weatherIcon = document.querySelector("#weathericon");
// const weatherDesc = document.querySelector("#weatherdesc");
// const weatherTemp = document.querySelector("#temperature");
// const weatherWind = document.querySelector("#windspeed");

// function displayResults(weatherData) {
//   // You can use @2x or @4x to make the icon bigger, or omit it for the standard size
//   const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`
//   const desc = weatherData.weather[0].description;
//   const main = weatherData.weather[0].main;
  
//   weatherIcon.setAttribute('src', iconsrc);
//   weatherIcon.setAttribute('alt', desc);
//   weatherDesc.textContent = main; 
//   weatherTemp.textContent = weatherData.main.temp.toFixed(0);
//   weatherWind.textContent = weatherData.wind.speed.toFixed(0);  
// }

// async function getTheWeather() {
//   try {
//     const response = await fetch(apiURL);
//     if (response.ok) {
//       const data = await response.json();
//       displayResults(data);
//     } else {
//       throw Error(await response.text());
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// getTheWeather();

// function displaySpotlights(businessList){
//   spotlights = []
//   for (let i=0; i < 3; i++){
//     spotlights.push(businessList[i]);
//   }

//   // Now display stuff  
//   var mainspotlight = document.querySelector('.main-spotlight');
//   spotlightcount = 1;
//   spotlights.forEach((spotlight) => {
//     var newdiv = document.createElement('div');
//     newdiv.classList.add('spotlight'+spotlightcount);
//     spotlightcount++;
//     newdiv.innerHTML = `<h4>${spotlight.name}</h4>
//                         <p class="centered-image"><a href="${spotlight.websiteURL}"><img src="${spotlight.imageURL}"></a></p>
//                         <p>${spotlight.streetAddress}, ${spotlight.cityStateZip}</p>
//                         <p>${spotlight.adcopy}</p>`
//     mainspotlight.append(newdiv);    
//   })

// }

// async function getBusinessData() {
//   const response = await fetch(businessDataUrl);
//   if (response.ok) {
//     const data = await response.json();
//     displaySpotlights(data.businesses);
//   } else {
//     console.error("There was an error loading the data.");
//   }
// }

// getBusinessData();

// function doJoinFlag(){
//   let join_flag = localStorage.getItem("join_flag")
//   if (join_flag == null){
//     return;
//   }
//   document.querySelector(".join-original").style.display = 'none';    
//   document.querySelector(".join-new").style.display = 'none';
//   if (join_flag == 'enabled'){
//     document.querySelector(".join-new").style.display = 'block';    
//   }
//   if (join_flag == 'disabled'){
//     document.querySelector(".join-original").style.display = 'block';
//   }
// }

// doJoinFlag();