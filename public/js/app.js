const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const place = search.value;
  if (place)
    fetch("http://localhost:3000/weather?place=" + place).then((res) => {
      messageTwo.textContent = "";
      messageOne.textContent = "Loading";
      res.json().then((data) => {
        if (data.geoError) {
          messageTwo.textContent = `${data.geoError}`;
          return;
        }
        messageOne.textContent = `
          ${data.location} `;

        messageTwo.textContent = `
          ${data.forecast}:
          ${data.temperature}°C 
          feelslike: ${data.feelslike}°C`;
      });
      messageTwo.textContent = "";
      messageOne.textContent = "";
    });
  if (!place) {
    messageOne.textContent = "";
    messageTwo.textContent = "Please provide location";
  }
});
