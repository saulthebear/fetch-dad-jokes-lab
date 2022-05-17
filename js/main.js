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
      return json.id // pass id on to next .then()
    })
    .then((jokeId) => {
      // use id to fetch image
      fetch(`${url}j/${jokeId}.png`) // format url to fetch from
        .then((response) => response.blob()) // transform response to blob
        .then((blob) => {
          const objectURL = URL.createObjectURL(blob) // transform blob to url
          imageElement.src = objectURL // use object url we created as img src
        })
    })
    .catch((error) => console.warn("something went wrong", error))
}

// Event Listeners
fetchJokeBtn.addEventListener("click", fetchJoke)
