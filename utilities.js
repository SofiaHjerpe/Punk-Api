import { pageContent } from "./randomBeer.js";
import { fetchRandomBeer } from "./randomBeer.js";
import { fetchSingleBeer } from "./infoPage.js";
const infoPage = document.querySelector(".block");
const ipageContent = document.getElementById("infoPage");
export async function addRandomBeerToDom(randomBeer) {
  let getRandomBeerToDom = randomBeer
    .map((randomBeer) => {
      const beerCard = {
        name: `${randomBeer.name}`,
        imgSrc: `${randomBeer.image_url}`,
        index: `${randomBeer.id}`,
      };
      getSingleBeerWithId(beerCard.index);
      return `
           <nav><a>search</a></nav>
           <section class="cardAndButton">
           <div class="card">
           <img class="image" src="${beerCard.imgSrc}"/>
           <h6>${beerCard.name}</h6>
           <a class="seeMore" href="index.html#${beerCard.index}" id="${beerCard.index}"> See more </a>
          </div>
          <div class="buttonWrapper">
             <button class="button">Click me</button>
          </div>
           </section>
           `;
    })
    .join("");
  pageContent.innerHTML = getRandomBeerToDom;
  const button = document.querySelector(".button");
  const seeMore = document.querySelector(".seeMore");

  seeMore.addEventListener("click", () => updatePage());
  button.addEventListener("click", () => fetchOnButtonClick());
}

function fetchOnButtonClick() {
  fetchRandomBeer("https://api.punkapi.com/v2/beers/random").then((randomBeer) => {
    addRandomBeerToDom(randomBeer);
  });
}
function updatePage() {
  pageContent.classList.add("block");
  infoPage.classList.remove("block");
  infoPage.classList.add("infoPage");
}

export function getSingleBeerWithId(beerId) {
  console.log(beerId);
  fetchSingleBeer(`https://api.punkapi.com/v2/beers/${beerId}`).then((singleBeer) => {
    addSingleBeerToDom(singleBeer);
  });
}

function addSingleBeerToDom(singleBeer) {
  console.log(singleBeer);
  let singleBeerToDom = singleBeer
    .map((beer) => {
      const beerInfo = {
        name: `${beer.name}`,
        imgSrc: `${beer.image_url}`,
        index: `${beer.id}`,
        description: `${beer.description}`,
        abv: `${beer.abv}`,
        volume: `${beer.volume}`,
        ingredients: `${beer.ingredients}`,
        hops: `${beer.hops}`,
        food_pairing: `${beer.food_pairing}`,
        brewersTips: `${beer.brewers_tips}`,
      };
      return `
     <section class="info-container"> 
     <img src="${beerInfo.imgSrc}" class="infoImg" alt="infoImg" />
     <h1>${beerInfo.name}, information </h1>
     <p>${beerInfo.description}</p>
     <h2> Details</h2>
     <h6>- Abv(alcohol by volume), ${beerInfo.abv}</h6>
     <h6>- Volume, ${beerInfo.volume}</h6>
     <h2> Ingredients</h2>
     <h6> ${beerInfo.ingredients}</h6>
     <h2> Hops</h2>
     <h6> ${beerInfo.hops}</h6>
     <h2> Food pairing</h2>
     <h6> ${beerInfo.food_pairing}</h6>
      <h2> Tips</h2>
     <h6> ${beerInfo.brewersTips}</h6>
     </section>`;
    })
    .join("");
  ipageContent.innerHtml = singleBeerToDom;
}
