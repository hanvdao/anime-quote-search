const url = "https://animechan.vercel.app/api/quotes";
const searchInput = document.querySelector(".search-input");
const randomButton = document.querySelector(".random-btn");

performSearch();

let timeout = null;

searchInput.addEventListener("input", (event) => {
  event.preventDefault();
  clearTimeout(timeout);
  timeout = setTimeout(performSearch, 100);
});

randomButton.addEventListener("click", performSearch);

function performSearch() {
  const inputValue = searchInput.value;

  const newUrl = inputValue ? url + "/anime?title=" + inputValue : url;

  fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
      const animeList = data;
      createResultGrid(animeList);
      console.log(animeList);
    })
    .catch((error) => console.log("Error: " + error));
}

function createAnimeContainer(anime) {
  const animeContainer = document.createElement("div");
  animeContainer.classList.add("anime-container");

  const animeTitle = document.createElement("h3");
  animeTitle.classList.add("anime-title");
  animeTitle.textContent = anime.anime;

  const animeCharacter = document.createElement("h3");
  animeCharacter.classList.add("anime-character");
  animeCharacter.textContent = `By: ${anime.character}`;

  const animeQuote = document.createElement("h3");
  animeQuote.classList.add("anime-quote");
  animeQuote.textContent = `"${anime.quote}"`;

  animeContainer.appendChild(animeTitle);
  animeContainer.appendChild(animeCharacter);
  animeContainer.appendChild(animeQuote);

  return animeContainer;
}

function createResultGrid(animeList) {
  let resultGrid = document.querySelector(".result-grid");
  resultGrid.innerHTML = null;
  animeList.forEach((anime) => {
    const animeContainer = createAnimeContainer(anime);
    resultGrid.appendChild(animeContainer);
  });
}
