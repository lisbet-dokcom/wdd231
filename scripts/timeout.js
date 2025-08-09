const countDown = document.getElementById("countdown");
const startButton = document.getElementById("startButton");

let startTime = 10;
startButton.addEventListener("click", () => {
    setInterval(() => {
        if (startTime >= 0) {
            countDown.textContent = startTime;
            startTime--;
        }
        else {
            setTimeout(() => {
                console.log("Time is up!");
            })
        }
    }, 1000);
});