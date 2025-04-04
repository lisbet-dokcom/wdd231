const getString = window.location.search;
console.log(getString);

const myInfo = new URLSearchParams(getString);
console.log(myInfo);

const thankYou = document.querySelector("#thankYou");

console.log(myInfo.get("Firstname"));
console.log(myInfo.get("Lastname"));
console.log(myInfo.get("organizationalTitle"));
console.log(myInfo.get("emailAddress"));
console.log(myInfo.get("phoneNumber"));
console.log(myInfo.get("busName"));
console.log(myInfo.get("level"));

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

