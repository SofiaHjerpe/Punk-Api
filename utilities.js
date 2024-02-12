import { pageContent } from "./randomBeer.js";
const infoPageContent = document.querySelector(".blockTillUsed");
export async function addRandomBeerToDom(randomBeer) {
  let getRandomBeerToDom = randomBeer
    .map((randomBeer) => {
      const beerCard = {
        name: `${randomBeer.name}`,
        imgSrc: `${randomBeer.image_url}`,
        index: `${randomBeer.id}`,
      };

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
}
export function changePage() {
  if (window.location.hash !== null) {
    infoPageContent.classList.remove("blockTillUsed");
  }
}
// export function getIdFromUrl(id) {
//   let idWithHash = document.location.hash;
//   console.log(idWithHash);
//    id = idWithHash.replace("#","");
// }
