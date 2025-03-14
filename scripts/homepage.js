const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

const hamButton = document.querySelector("#menu");
const nav = document.querySelector(".nav1");
hamButton.addEventListener("click", () => {
    nav.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.querySelectorAll(".nav1").forEach(n => n.addEventListener("click", () => {
    nav.classList.remove('open');
    hamButton.classList.remove('open');
}))

const titles = [
    { title: "CSE 110", completed: true },
    { title: "WDD 130", completed: true },
    { title: "CSE 111", completed: true },
    { title: "CSE 210", completed: true },
    { title: "WDD 131", completed: true },
    { title: "WDD 231", completed: false }
]

function DisplayTitles(titles) {
    const course = document.getElementById("course");
    course.innerHTML = "";
    titles.forEach(function (title) {
        const card = document.createElement("div");
        card.className = "title-card";

        if (title.completed) {
            card.classList.add("Done");
            card.innerHTML += "✅";
        } else {
            card.classList.add("Not");
            card.innerHTML += "❌";
        }

        card.textContent = title.title;

        course.appendChild(card);
    })
};

const number = 2;
const allTitlesLink = document.querySelector("#all");
const cseLink = document.querySelector("#cse");
const wddLink = document.querySelector("#wdd");
const selection = document.querySelector("#selection");

allTitlesLink.addEventListener("click", () => {
    DisplayTitles(titles);
    const totalCourses = titles.length;
    selection.innerText = `The total number of course listed below is ${number * totalCourses}`;
});

cseLink.addEventListener("click", () => {
    const filteredTitle = titles.filter(title => title.title.startsWith("C"));
    DisplayTitles(filteredTitle);
    const totalCourses = filteredTitle.length;
    selection.innerText = `The total number of course listed below is ${number * totalCourses}`;
});

wddLink.addEventListener("click", () => {
    const filteredTitle = titles.filter(title => title.title.startsWith("W"));
    DisplayTitles(filteredTitle);
    selection.innerText = `The total number of course listed below is ${number * totalCourses}`;
});

DisplayTitles(titles);