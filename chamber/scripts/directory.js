

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

