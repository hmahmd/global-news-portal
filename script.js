const searchBox = document.querySelector("#search-box");
const searchBtn = document.querySelector("#search-btn");
const newsList = document.querySelector("#news-list");
const infoMsg = document.querySelector("#info-text");

const startApp = () => {
  let topic = searchBox.value.trim();

  if (topic === "") {
    infoMsg.innerHTML = '<p class="error">Please type something!</p>';
    setTimeout(() => {
      infoMsg.innerHTML = "";
    }, 3000);
    return;
  }

  infoMsg.innerHTML = '<p class="loading">Finding news...</p>';
  newsList.innerHTML = "";

  // Sirf yeh line change hui - API ki jagah JSON file
  let apiURL = "./news.json";

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.articles || data.articles.length === 0) {
        infoMsg.innerHTML = "<p>No news found for this topic.</p>";
        return;
      }

      infoMsg.innerHTML = "";

      data.articles.forEach((item) => {
        let photo = item.urlToImage
          ? item.urlToImage
          : "https://via.placeholder.com/300";

        newsList.innerHTML += `
          <div class="card">
            <img src="${photo}" class="card-img">
            <div class="card-info">
              <h2 class="card-title">${item.title}</h2>
              <p>${item.description || "No description."}</p>
              <a href="${item.url}" target="_blank" class="open-link">Read More →</a>
            </div>
          </div>
        `;
      });
    })
    .catch((err) => {
      infoMsg.innerHTML =
        '<p class="error">Something went wrong. Please try again.</p>';
      console.error(err);
    });
};

searchBtn.addEventListener("click", startApp);
searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") startApp();
});
