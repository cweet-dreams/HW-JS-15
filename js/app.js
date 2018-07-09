// Init http
const http = new Http();
const httpNew = new HttpNew();
//const httpNew = new HttpNew();
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

// // Event handlers
// function onChangeCountry(e) {
//     ui.showLoader();
//
//     let request1;
//
//     request1 = !selectCategory.value
//         ? `https://newsapi.org/v2/top-headlines?country=${select.value}&apiKey=${apiKey}` :
//         `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`;
//
//     http.get(request1)
//
//         .then(res => {
//             const response = JSON.parse(res.response);
//             ui.clearContainer();
//             response.articles.forEach(news => ui.addNews(news));
//         })
//         .catch(err => ui.showError(err.error));
// }
//
//
// function onSearch(e) {
//     ui.showLoader();
//
//     http.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)
//
//         .then(res => {
//             const response = JSON.parse(res.response);
//             ui.clearContainer();
//             response.articles.forEach(news => ui.addNews(news));
//         })
//
//         .catch(err => {
//             ui.showInfo("По вашему запросу новостей не найдено!")
//         })
//
// }
//
//
//
//
// function onChangeResource(e) {
//     ui.showLoader();
//
//     http.get(`https://newsapi.org/v2/top-headlines?sources=${selectResource.value}&apiKey=${apiKey}`)
//
//         .then (res => {
//             const response = JSON.parse(res.response);
//             ui.clearContainer();
//             response.articles.forEach(news => ui.addNews(news));
//         })
//         .catch(function(err) {
//             ui.showError(err)
//         })
//
//
// }
//
// function onChangeCategory(e) {
//     ui.showLoader();
//     let request;
//
//     request = !select.value
//         ? `https://newsapi.org/v2/top-headlines?category=${selectCategory.value}&apiKey=${apiKey}` :
//         `https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`;
//
//     http.get(request)
//         .then (res => {
//             const response = JSON.parse(res.response);
//             ui.clearContainer();
//             response.articles.forEach(news => ui.addNews(news));
//         })
//         .catch (err => {
//             ui.showInfo(`"Новости по ${selectCategory.value} по ${select.value} не найдены`);
//             ui.showError(err.error);
//         })
//
// }

// fetch
// Event handlers
function onChangeCountry(e) {
    ui.showLoader();
    httpNew.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`)

        .then(res => {
            ui.clearContainer();
            res.articles.forEach(news => ui.addNews(news));
        })
        .catch(err => ui.showError(err.error));
}


function onSearch(e) {
    ui.showLoader();
    httpNew.get(`https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=${apiKey}`)

        .then(res => {
            ui.clearContainer();
            res.articles.forEach(news => ui.addNews(news));
        })
        .catch(err => {
            ui.showInfo("По вашему запросу новостей не найдено!")
        })

}
function onChangeResource(e) {
    ui.showLoader();

    httpNew.get(`https://newsapi.org/v2/top-headlines?sources=${selectResource.value}&apiKey=${apiKey}`)

        .then (res => {
            ui.clearContainer();
            res.articles.forEach(news => ui.addNews(news));
        })
        .catch(function(err) {
            ui.showError(err)
        })


}

function onChangeCategory(e) {
    ui.showLoader();

    httpNew.get(`https://newsapi.org/v2/top-headlines?country=${select.value}&category=${selectCategory.value}&apiKey=${apiKey}`)
        .then (res => {
            res.articles.forEach(news => ui.addNews(news));
        })
        .catch (err => {
            ui.showInfo(`"Новости по ${selectCategory.value} по ${select.value} не найдены`);
            ui.showError(err.error);
        })

}