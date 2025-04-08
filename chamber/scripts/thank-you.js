const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);
const thankYou = document.querySelector("#thankYou");

thankYou.innerHTML =
    `<p><strong>First Name:</strong> ${myInfo.get("Firstname")}</p>
    <p><strong>Last Name:</strong> ${myInfo.get("Lastname")}</p>
    <p><strong>Organization Title:</strong> ${myInfo.get("organizationalTitle")}</p>
    <p><strong>Email Address:</strong> ${myInfo.get("emailAddress")}</p>
    <p><strong>Mobile Phone Number:</strong> ${myInfo.get("phoneNumber")}</p>
    <p><strong>Business Name:</strong> ${myInfo.get("busName")}</p>
    <p><strong>Membership Plan:</strong> ${myInfo.get("level")}</p>
    <p><strong>Business Description:</strong> ${myInfo.get("description")}</p>
    <p><strong>Join Date:</strong> ${myInfo.get("currentdate")}</p>
`

