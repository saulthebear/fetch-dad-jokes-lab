// HTML Elements
const fetchJokeBtn = document.querySelector("#fetch-joke")
const displayElement = document.querySelector("#joke-display")
const imageContainer = document.querySelector("#img-container")

// Set headers for request
const headers = new Headers()
headers.append("Accept", "application/json")

// base url to fetch from
const url = "https://icanhazdadjoke.com/"
// Create a request object, containing our headers
const request = new Request(url, {
  headers: headers,
})

// Fetch joke and image
const fetchJoke = () => {
  fetch(request)
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
          const imageElement = document.createElement("img") // create an HTML img element
          imageElement.src = objectURL // use object url we created as img src
          imageContainer.appendChild(imageElement) // add the HTML img element to the DOM
        })
    })
    .catch((error) => console.warn("something went wrong", error))
}

// Event Listeners
fetchJokeBtn.addEventListener("click", fetchJoke)
