import { fetchOnChange } from "./utilities.js";
import { leftArrow, rightArrow, newPage } from "./utilities.js";

fetchOnChange("https://api.punkapi.com/v2/beers/random");

rightArrow.addEventListener("click", (e) => newPage(e));
leftArrow.addEventListener("click", (e) => newPage(e));
