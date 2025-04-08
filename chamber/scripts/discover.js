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
            <p>${place.description}</p>`

        const image = document.createElement("img");
        image.src = place.imageUrl;
        image.alt = `Logo of ${place.name}`;
        image.loading = "lazy";
        card.appendChild(image);

        discoverCard.appendChild(card);
    })
}

fetchDiscovery();