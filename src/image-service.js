export default class ImageService {
  static getImages(requestURL, searchTerm) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.open("GET", requestURL, true);
      request.setRequestHeader("Authorization", process.env.API_KEY);
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, searchTerm]);
        } else {
          reject([this, response]);
        }
      });
      request.send();
    });
  }
}