const url = "https://api.punkapi.com/v2/beers/random";
const pageContent = document.querySelector(".pageContent");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let randomBears = data;
    let getRandomBearToDom = randomBears
      .map((randomBear) => {
        const bearCard = {
          name: `${randomBear.name}`,
          imgSrc: `${randomBear.image_url}`,
        };
        return `<div class="landingContainer.css">
        <nav><a>search</a></nav>
        <section class="cardAndButton">
        <div class="card">
        <img src="${bearCard.imgSrc}"/>
        <h6>${bearCard.name}</h6>
         <a> Read more </a>
        </div>
        </section>
        </div>`;
      })
      .join("");
    pageContent.innerHTML = getRandomBearToDom;
  })
  .catch((error) => console.error("Error:", error));
