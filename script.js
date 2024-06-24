const news = document.getElementById('news');
const loader = document.getElementById('loader');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumber = document.getElementById('page-number');

function fetchNews(page) {
  const query = `?page=${page}`;
  fetch('https://sibers/api/news.php' + query)
    .then(response => response.json())
    .then(data => {
      news.innerHTML = '';
      data.forEach(newsItem => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${newsItem.urlToImage}" alt="">
          <div class="card-content">
            <span class="card-author">${newsItem.author ? newsItem.author : ''}</span>
            <h1 class="card-title">${newsItem.title}</h1>
            <div class="card-footer">
              <p>Дата публикации: ${newsItem.publishedAt}</p>
              <a href="${newsItem.url}">Подробнее</a>
            </div>
          </div>
        `;
        news.appendChild(card);
      });
      news.removeChild(loader);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
function fetchStarWars(page) {
  const query = `?page=${page}`;
  fetch('https://sibers/api/starwars.php' + query)
  
  .then(response => response.json())
  .then(characters => {
    const container = document.getElementById('characters');
    container.innerHTML = '';
      characters.forEach(character => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('starwar');
        card.innerHTML = `
      <h2>${character.name}</h2>
      <p><strong>Рост:</strong> ${character.height} cm</p>
      <p><strong>Вес:</strong> ${character.mass} kg</p>
      <p><strong>Цвет волос:</strong> ${character.hair_color}</p>
      <p><strong>Цвет кожи:</strong> ${character.skin_color}</p>
      <p><strong>Цвет глаз:</strong> ${character.eye_color}</p>
      <p><strong>Год рождения:</strong> ${character.birth_year}</p>
      <p><strong>Пол:</strong> ${character.gender}</p>
    `;
        container.appendChild(card);
      });
      container.removeChild(loader);
    })
}
let currentPage = 1
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    pageNumber.textContent = currentPage;
    fetchNews(currentPage);
    fetchStarWars(currentPage);
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  pageNumber.textContent = currentPage;
  fetchNews(currentPage);
  fetchStarWars(currentPage);
});
fetchNews(currentPage);
fetchStarWars(currentPage);
