const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

const hamButton = document.querySelector("#menu");
const nav = document.querySelector("nav");
hamButton.addEventListener("click", () => {
    nav.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.querySelectorAll("nav").forEach(n => n.addEventListener("click", () => {
    nav.classList.remove('open');
    hamButton.classList.remove('open');
}))


fetch("data/members.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        DisplayMembers(data);
    })
    .catch(error => console.error(error));

function DisplayMembers(members) {
    const member = document.querySelector("#members");
    member.innerHTML = "";
    members.forEach(function (mem) {
        const card = document.createElement("div");
        card.className = "mem-card";

        card.innerHTML = `
        <h3>${mem.name}</h3>
        <p>${mem.adderss}</p>
        <p>${mem.phoneNumber}</p>
        <p>${mem.membershipLevel}</p>
        <p>${mem.websiteUrl}</p>
        <p>${mem.others}</p>`

        const image = document.createElement("img");
        image.src = mem.image;
        image.alt = mem.name;
        image.loading = "lazy";
        card.appendChild(image);

        member.appendChild(card);
    })
}

const gridbutton = document.getElementById("grid");
const listbutton = document.getElementById("list");
const memberContainer = document.querySelector("#members");

gridbutton.addEventListener("click", () => {
    memberContainer.classList.add("grid");
    memberContainer.classList.remove("list");
})

listbutton.addEventListener("click", () => {
    memberContainer.classList.add("list");
    memberContainer.classList.remove("grid");
})