const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

function getCelsius(fahrenheit) {
	return (fahrenheit - 32) * (5/9);
}

document.querySelector("#temp").value = getCelsius(33).toFixed(1);

