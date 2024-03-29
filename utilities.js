import { pageContent } from "./randomBeer.js";
import { fetchBeer } from "./randomBeer.js";

const infoPage = document.querySelector(".block");
const searchPage = document.querySelector(".searchPage");
const form = document.querySelector(".form");
const searchInput = document.querySelector(".search");
const listOfBeerNames = document.querySelector(".list-of-names");
const baseURL = "https://api.punkapi.com/v2";
const pagesNav = document.querySelector(".pages-nav");
const pagesNavigationContainer = document.querySelector(".pages-navigation");
export const leftArrow = document.querySelector(".material-symbols-outlined:nth-of-type(1)");
export const rightArrow = document.querySelector(".material-symbols-outlined:nth-of-type(2)");

let pageIndex = 1;
let pageNumber = 1;
let totalPages = 1;
let searchUserInput;

export async function addRandomBeerToDom(randomBeer) {
  let getRandomBeerToDom = randomBeer
    .map((randomBeer) => {
      const beerCard = {
        name: `${randomBeer.name}`,
        imgSrc: `${randomBeer.image_url}`,
        index: `${randomBeer.id}`,
      };

      return `
           <nav><a href="#search" class="search">Go To Search</a></nav>
           <section class="cardAndButton">
           <div class="card">
           <img class="image" src="${beerCard.imgSrc}"/>
           <h4 class="small-heading bear-name">${beerCard.name}</h4>
           <a class="seeMore" href="index.html#${beerCard.index}" id="${beerCard.index}"> See More 
           <span class="material-symbols-outlined seeMorearrow">
                 keyboard_arrow_right
           </span>
           </a>
          </div>
          <div class="buttonWrapper">
             <button class="button">Random Beer</button>
          </div>
           </section>
           `;
    })
    .join("");
  pageContent.innerHTML = getRandomBeerToDom;

  const seeMore = document.querySelector(".seeMore");
  const button = document.querySelector(".button");
  const searchPageLink = document.querySelector(".search");
  handleClickOnItems(seeMore, button, searchPageLink);
}

// Event listeners
function handleClickOnItems(seeMore, button, searchPageLink) {
  seeMore.addEventListener("click", (e) => getIdandAddInfoContent(e));
  button.addEventListener("click", () => fetchOnChange(`${baseURL}/beers/random`));
  searchPageLink.addEventListener("click", () => relocateToSearch());
}
export function fetchOnChange(url) {
  fetchBeer(url).then((randomBeers) => {
    addRandomBeerToDom(randomBeers);
  });
}

function getIdandAddInfoContent(e) {
  let beerId = e.target.id;
  pageContent.classList.add("block");
  infoPage.classList.remove("block");
  infoPage.classList.add("infoPage");
  console.log(beerId);
  fetchBeer(`${baseURL}/beers/${beerId}`).then((singleBeer) => {
    addSingleBeerToDom(singleBeer);
  });
}
function relocateToSearch() {
  pageContent.classList.add("block");
  infoPage.classList.add("block");
  searchPage.style.display = "flex";
  if (pageNumber === 1) {
    leftArrow.style.color = "#e2cbec";
  }
  if (pageNumber === totalPages) {
    rightArrow.style.color = "#e2cbec";
  }
}
const ipageContent = document.querySelector(".infop");

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
        ingredients: `${beer.ingredients.yeast}, ${beer.ingredients.malt[0].name} ${beer.ingredients.malt[0].amount.value} ${beer.ingredients.malt[0].amount.unit},`,
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

// search on a beer
function fetchSearchedBeers(searchUrl) {
  fetchBeer(searchUrl).then((searchedBeers) => {
    searchedBeers.length < 9 ? (totalPages = pageIndex) : (totalPages = searchedBeers.length);

    addSearchedBeersToDom(searchedBeers);
    pagesNav.innerHTML = `${pageNumber}  `;
  });
}
form.addEventListener("submit", () => {
  pagesNavigationContainer.style.display = "flex";
  searchUserInput = searchInput.value;
  console.log(searchUserInput);

  let searchUrl = `${baseURL}/beers?beer_name=${searchUserInput}&page=1&per_page=10`;
  fetchSearchedBeers(searchUrl);
});

function addSearchedBeersToDom(searchedBeers) {
  let getSearchBeerToDom = searchedBeers
    .map((searchedBeer) => {
      const beerName = {
        name: `${searchedBeer.name}`,
      };

      return `
    <h4 class="beerName"> ${beerName.name}
    `;
    })
    .join("");
  listOfBeerNames.innerHTML = getSearchBeerToDom;
}

function goToTheRight(e) {
  if (e.target === rightArrow && pageIndex < totalPages) {
    if (pageIndex === totalPages) {
      return;
    }
    pageIndex++;
    fetchSearchedBeers(
      `${baseURL}/beers?beer_name=${searchUserInput}&page=${pageIndex}&per_page=10`
    );

    pageNumber = parseInt(pageIndex);
    pagesNav.innerHTML = `${pageNumber}`;
  }
}
function goToTheLeft(e) {
  if (e.target === leftArrow) {
    if (pageIndex === 1) {
      return;
    } else {
      pageIndex--;
      fetchSearchedBeers(
        `${baseURL}/beers?beer_name=${searchUserInput}&page=${pageIndex}&per_page=10`
      );

      pageNumber = parseInt(pageIndex);
      pagesNav.innerHTML = `${pageNumber}  `;
    }
  }
}

export function newPage(e) {
  if (pageIndex >= totalPages) {
    goToTheLeft(e);
  }

  goToTheRight(e);
  goToTheLeft(e);
}
