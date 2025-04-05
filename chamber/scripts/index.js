const myKey = "b9e57991ee32f427da062838f21d3623";
const myLat = "49.74930";
const myLong = "6.63641";
const fig = document.querySelector("#fig");
const weatherIcon = document.querySelector("#weather-icon");
const today = document.querySelector("#today");
const wednesday = document.querySelector("#wednesday");
const thursday = document.querySelector("#thursday");
const spotlightContainer = document.querySelector("#business");


const Weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`
const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`

async function apiFetch() {
    try {
        const response = await fetch(Weatherurl);
        if (response.ok) {
            const info = await response.json();
            console.log(info);
            displayResult(info);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function forFetch() {
    try {
        const respond = await fetch(forcastUrl);
        if (respond.ok) {
            const fore = await respond.json();
            console.log(fore);
            console.log("hello");
            displayForecast(fore);
        } else {
            throw Error(await respond.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function loadSpotlights() {
    try {
        const spots = await fetch("data/members.json");
        const spot = await spots.json();

        const qualifiedMembers = spot.filter(member =>
            member.membershipLevel.includes("Gold") ||
            member.membershipLevel.includes("Silver")
        );

        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        // spotlightContainer.innerHTML = "";
        selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
            <div class="main">
                <div class="memberName"><h3>${member.name}</h3></div>
                <section>
                <div><img src="${member.image}" alt="${member.name} logo"></div>
                <div class="details">
                <p><strong>Phone:</strong> ${member.phoneNumber}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><a href="${member.websiteUrl}" target="_blank">Visit Website</a></p>
                <p><strong>Membership:</strong> ${member.membershipLevel}</p>
                </div>
                </section>
            </div>`;

            spotlightContainer.appendChild(card);
        })

    } catch (error) {
        console.log(error);
    }
}

function displayForecast(fore) {
    today.innerHTML = `<p>Today: <strong>${fore.list[4].main.temp}</strong></p>`
    wednesday.innerHTML = `<p>Wednesday: <strong>${fore.list[24].main.temp}</strong></p>`
    thursday.innerHTML = `<p>Thursday: <strong>${fore.list[39].main.temp}</strong></p>`
}

function formatTime(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour24: false });
}

function displayResult(info) {
    const con = document.createElement("div");
    con.innerHTML = `
    <p><strong>${info.main.temp}&deg;F</strong></p>
    <p>${info.weather[0].main}</p>
    <p>High: ${info.main.temp_max}&deg</p>
    <p>Low: ${info.main.temp_min}&deg</p>
    <p>Humidity: ${info.main.humidity}%</p>
    <p>Sunrise: ${formatTime(info.sys.sunrise)}</p>
    <p>Sunset: ${formatTime(info.sys.sunset)}</p>
    `
    fig.appendChild(con);

    const iconsrc = `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', info.name);
}

apiFetch();
forFetch();
loadSpotlights();
