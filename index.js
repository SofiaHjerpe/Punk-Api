import { fetchRandomBeer } from "./randomBeer.js";
import { addRandomBeerToDom, changePage} from "./utilities.js";

fetchRandomBeer("https://api.punkapi.com/v2/beers/random").then((randomBeers) => {
  addRandomBeerToDom(randomBeers);
});

changePage();
