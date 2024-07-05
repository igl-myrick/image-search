import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ImageService from "./image-service";

function getImages(requestURL, searchTerm) {
  ImageService.getImages(requestURL, searchTerm)
    .then(function(response) {
      console.log(response);
      if (response[0]) {
        printElements(response[0], searchTerm);
      } else {
        printError(response, searchTerm);
      }
    });
}

function printError(error) {
  document.querySelector("#output").innerText = `There was an error with the search: ${error}.`;
}

function printElements(data) {
  if (document.querySelector("#output-wrapper")) {
    document.querySelector("#output-wrapper").remove();
  }
  const outputDiv = document.querySelector("#output");
  data.photos.forEach(function(element, index) {
    let outputWrapper = document.createElement("div");
    let image = document.createElement("img");
    let attribution = document.createElement("h4");
    let attributionLink = document.createElement("a");
    let hr = document.createElement("hr");

    image.setAttribute("src", data.photos[index].src.medium);
    attribution.innerText = `Photo by ${data.photos[index].photographer} on `;
    attributionLink.setAttribute("href", data.photos[index].url);
    attributionLink.innerText = "Pexels";
    outputWrapper.setAttribute("id", `image${index}-output-wrapper`);

    outputWrapper.append(image);
    attribution.insertAdjacentElement("beforeend", attributionLink);
    outputWrapper.append(attribution);
    outputWrapper.append(hr);
    outputDiv.append(outputWrapper);
  });
  console.log(data);
}

function handleSearch(e) {
  e.preventDefault();
  const searchTerm = document.querySelector("#search").value;
  document.querySelector("#search").innerText = null;
  getImages(`https://api.pexels.com/v1/search/?query=${searchTerm}&per_page=5`, searchTerm);
}

window.addEventListener("load", function() {
  document.querySelector("#search-form").addEventListener("submit", handleSearch);
});