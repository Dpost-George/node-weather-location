const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const place = search.value;
  if (place)
    fetch("weather?place=" + place).then((res) => {
      messageTwo.textContent = "";
      messageThree.textContent = "";
      messageOne.textContent = "Loading";
      res.json().then((data) => {
        if (data.geoError) {
          messageTwo.textContent = `${data.geoError}`;
          return;
        }
        messageOne.textContent = `
          ${data.location} `;

        messageTwo.textContent = `
          ${data.forecast}`;
        //console.log(data);
        messageThree.textContent = `Temperature: ${data.temperature}°C. Ressenti: ${data.feelslike}°C  Humidité:${data.humidity}`;
      });
      messageTwo.textContent = "";
      messageOne.textContent = "";
      messageThree.textContent = "";
    });
  if (!place) {
    messageOne.textContent = "";
    messageThree.textContent = "";
    messageTwo.textContent = "Entrez un lieu svp";
  }
});
