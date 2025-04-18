const discoverCard = document.getElementById("discover-card");

async function fetchDiscovery() {
    try {
        const response = await fetch("data/discover.json");
        const data = await response.json();
        displayDiscovery(data);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayDiscovery(discovery) {
    discoverCard.innerHTML = "";

    discovery.forEach((place) => {
        const card = document.createElement("div");
        card.classList.add("place-card");

        card.innerHTML = `
            <h2>${place.name}</h2>
            <address>${place.location}</address>
            <p>${place.description}</p>
            <button id="discover-button">Learn More</button>`

        const image = document.createElement("img");
        image.src = place.imageUrl;
        image.alt = `Logo of ${place.name}`;
        image.loading = "lazy";
        card.appendChild(image);

        discoverCard.appendChild(card);
    })
}

function calculateDaysBetweenDates(date1, date2) {
    const timeDiff = date2 - date1;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(timeDiff / oneDay);
}

const lastVisitDate = localStorage.getItem("lastVisitDate");

const today = new Date();

if (lastVisitDate) {
    const lastVisit = new Date(lastVisitDate);
    const daySinceLastVisit = calculateDaysBetweenDates(lastVisit, today);

    let message = "";

    if (daySinceLastVisit < 1) {
        message = `<p>Back so soon! Awesone!</p>`;
    } else if (daySinceLastVisit === 1) {
        message = `<p>You last visited 1 day ago</p>`;
    } else {
        message = `<p>You last visited <strong>${daySinceLastVisit}</strong> days ago</p>`
    }

    document.getElementById("visitMessage").innerHTML = message;
} else {
    document.getElementById("visitMessage").innerHTML = `Welcome! Let us know if you have any questions. `;
}

localStorage.setItem("lastVisitDate", today.toISOString());

fetchDiscovery();