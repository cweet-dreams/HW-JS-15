// Init http
const http = new Http();
// Init UI
const ui = new UI();
// Api key
const apiKey = "7a8ffd330f4a4f29b53c032a7e21f4af";


// Init elements
const select = document.getElementById("country");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const selectResource = document.getElementById("resource");
const selectCategory = document.getElementById("category");

// All events
select.addEventListener("change", onChangeCountry);
searchBtn.addEventListener("click", onSearch);
selectResource.addEventListener("change", onChangeResource);
selectCategory.addEventListener("change", onChangeCategory);

// Event handlers
function onChangeCountry(e) {
  // Показываю прелодер
  ui.showLoader();
  // Делаем запрос на получение новостей по выбранной стране
    let request1;

    request1 = !selectCategory.value
        ? `https://newsapi.org/v2/top-headlines?country=${select.value}&apiKey=${apiKey}`:
        `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`;

  http.get(request1, function (err, res) {
    if (!err) {
      // Пробразовываем из JSON в обычный объект
      const response = JSON.parse(res);
      // Удаляем разметку из контейнера
      ui.clearContainer();
      // перебираем новости из поля articles в объекте response
      response.articles.forEach(news => ui.addNews(news));
    } else {
      // Выводим ошибку
      ui.showError(err);
    }
  });
}


function onSearch(e) {
  // Делаем запрос на получение новостей по тому что введено в инпут
  http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`, function (err, res) {
    if (err) return ui.showError(err);

    const response = JSON.parse(res);

    if (response.totalResults) {
      // Удаляем разметку из контейнера
      ui.clearContainer();
      // перебираем новости из поля articles в объекте response
      response.articles.forEach(news => ui.addNews(news));
    } else {
      ui.showInfo("По вашему запросу новостей не найдено!");
    }
  });


}
function onChangeResource(e) {
    ui.showLoader();

    http.get(`https://newsapi.org/v2/top-headlines?sources=${selectResource.value}&apiKey=${apiKey}`, function (err, res) {
        if (!err) {
            // Пробразовываем из JSON в обычный объект
            const response = JSON.parse(res);
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
        } else {
            // Выводим ошибку
            ui.showError(err);
        }
    });

}
function onChangeCategory (e) {
  ui.showLoader();
  let request;

  request = !select.value
      ? `https://newsapi.org/v2/top-headlines?category=${selectCategory.value}&apiKey=${apiKey}`:
      `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`;

    http.get(request, function (err, res) {
        if (!err) {
            // Пробразовываем из JSON в обычный объект
            const response = JSON.parse(res);
            // Удаляем разметку из контейнера
            ui.clearContainer();
            // перебираем новости из поля articles в объекте response
            response.articles.forEach(news => ui.addNews(news));
        } else {
            // Выводим ошибку
            ui.showError(err);
        }
    });
    !selectCategory ? ui.showError("Новости по категории такой то по стране такойто не найдены")

}

// Отдельный запрос на получение ресурсов
// генерируем селект с ресурсами
// <option value="abc-news">Abc News</option>
// при выборе ресурса подгружаете новости с этим ресурсом
// возможность выбора новостей по категории и стране
// Если новостей нет по выбранной категоррии нужно вывести что "Новости по категории такой то по стране такойто не найдены"