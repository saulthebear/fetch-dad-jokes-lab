// HTML Elements
const fetchJokeBtn = document.querySelector("#fetch-joke")
const displayElement = document.querySelector("#joke-display")
const imageContainer = document.querySelector("#img-container")
const imageElement = document.querySelector("#joke-img")

// base url to fetch from
const url = "https://icanhazdadjoke.com/"

// Fetch joke and image
const fetchJoke = () => {
  fetch(url, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json()) // transform to json
    .then((json) => {
      displayElement.innerText = json.joke // get joke text and set DOM
      imageElement.src = `${url}j/${json.id}.png` // Set src on image element
    })
    .catch((error) => console.warn("something went wrong", error))
}

// Event Listeners
fetchJokeBtn.addEventListener("click", fetchJoke)
