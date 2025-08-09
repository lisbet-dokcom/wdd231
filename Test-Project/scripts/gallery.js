const galleryIcon = document.querySelector("#gallery-icons");

async function fetchGallery() {
    try {
        const response = await fetch("data/gallery.json");
        const data = await response.json();
        displayGallery(data);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

function displayGallery(gallery) {
    galleryIcon.innerHTML = "";

    gallery.forEach((recipes) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h2>${recipes.title}</h2>`
        // <p>${recipes.ingredients}/<p>
        // <p>${recipes.steps}/<p>

        const image = document.createElement("img");
        image.src = recipes.image;
        image.alt = `Image of ${recipes.title}`;
        image.loading = "lazy";
        card.appendChild(image);

        galleryIcon.appendChild(card);
    })
}

fetchGallery();
