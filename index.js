import { numberWithCommas } from "./utils.js";

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

async function fetchFunc() {
  const blob = await fetch(endpoint);
  const json = await blob.json();
  cities.push(...json);
}
fetchFunc();

function findMatches(wordToMatch, citiesM) {
  const regex = new RegExp(wordToMatch, 'gi');
  return citiesM.filter(place => place.city.match(regex) || place.state.match(regex));
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, "gi");
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
    <li>
      <span class="name">${cityName}, ${stateName}</span>
      <span class="population">${numberWithCommas(place.population)}</span>
    </li>`;
  }).join("");
  suggestions.innerHTML = html;
}

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
