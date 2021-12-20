console.log("JS is loaded !");

const weatherForm = document.querySelector("form");
const val = document.querySelector("input");
const m1 = document.querySelector("#msg1");
const m2 = document.querySelector("#msg2");
const wimg = document.querySelector("#wimg");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = val.value;
  m1.textContent = "Loading...";
  m2.textContent = "";
  fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.err) {
        m1.textContent = data.err;
        return console.log(data.err);
      }
      m1.textContent = data.location;
      m2.textContent = data.weather;
      wimg.setAttribute("src", data.image);
    });
  });
});

const nav = document.querySelector(".nav");
nav.addEventListener("click", (e) => {
  e.target.classList.add("");
});
