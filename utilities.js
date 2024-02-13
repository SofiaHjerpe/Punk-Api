import { pageContent } from "./randomBeer.js";
import { fetchRandomBeer } from "./randomBeer.js";
import { fetchSingleBeer } from "./infoPage.js";
const infoPage = document.querySelector(".block");

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
           <h4 class="small-heading bear-name">${beerCard.name}</h4>
           <a class="seeMore" href="index.html#${beerCard.index}" id="${beerCard.index}"> See More 
           <span class="material-symbols-outlined">
                 keyboard_arrow_right
           </span>
           </a>
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
const ipageContent = document.querySelector(".infop");

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
        volume: `${beer.volume.value} ${beer.volume.unit}`,
        ingredients: `${beer.ingredients.yeast}${beer.ingredients.malt[0].name} ${beer.ingredients.malt[0].amount.value} ${beer.ingredients.malt[0].amount.unit}`,
        hops: `${beer.ingredients.hops[0].name} ${beer.ingredients.hops[0].amount.value} ${beer.ingredients.hops[0].amount.unit}, ${beer.ingredients.hops[1].name} ${beer.ingredients.hops[1].amount.value} ${beer.ingredients.hops[1].amount.unit}`,
        food_pairing: `${beer.food_pairing}`,
        brewersTips: `${beer.brewers_tips}`,
      };

      return `
     <section class="info-container"> 
     <img src="${beerInfo.imgSrc}" class="image" alt="infoImg" />
     <h2 class="heading">${beerInfo.name}</h2>
     <p class="info-text">${beerInfo.description}</p>
     <h4 class="small-heading"> Details</h4>
     <p class="info">- Abv(alcohol by volume), ${beerInfo.abv} %</p>
     <p class="info">- Volume, ${beerInfo.volume}</p>
     <h4 class="small-heading"> Ingredients (Yeast, malt and hops)</h4>
     <p class="info"> ${beerInfo.ingredients}</p>
     <p class="info"> ${beerInfo.hops}</p>
     <h4 class="small-heading"> Food pairing</h4>
     <p class="info-text"> ${beerInfo.food_pairing}</p>
     <h4 class="small-heading">Tips</h4>
     <p class="info-text"> ${beerInfo.brewersTips}</p>
     </section>`;
    })
    .join("");
  ipageContent.insertAdjacentHTML("beforeend", singleBeerToDom);
}
