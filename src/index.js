import '../src/pages/index.css';
import { NewsCard } from './JS/NewsCard.js';
import { NewsCardList } from './JS/NewsCardList.js';
import { NewsApi } from './JS/NewsApi';
import { DataStorage } from './JS/DataStorage.js';
import { Section } from './JS/Section.js';
import { FormValidator } from './JS/FormValidator.js';


(function() {
  /** КОНСТАНТЫ */

  //нода для новсотей
  const newsCardsContainer = document.querySelector('.cards-wrapper');
  const searchResult = document.querySelector('.news');
  const load = document.querySelector('.load');
  const notFound = document.querySelector('.not-found');
  const moreBtn = document.querySelector('.news__button');
  const formSearch = document.forms.search;
  const searchInput = formSearch.elements.keyword;
  const step = 6;
  //конфиг для API
  const NEWS_API_URL = NODE_ENV === 'production' ? 'https://nomoreparties.co/news/v2/everything?q=' : 'http://newsapi.org/v2/everything?q=';
  const config = {
    baseUrl: NEWS_API_URL,
    newsApiKey: '9df9ea2b45194ed396d9a98f09585f5a'
  }

  /** ИНСТАНСЫ */
  //контейнер для новостей
  const newsCardList = new NewsCardList(newsCardsContainer, createNewsCard);
  const formValidationSearch = new FormValidator(formSearch);
  //Апи новостей

  //local storage
  const dataStorage = new DataStorage();
  const section = new Section();

  /** МЕТОДЫ КЛАССОВ */




  /** КОЛБЭКИ */
  // создаю колбэк, возвращающий разметку новости
  function createNewsCard(date, title, text, media, image, link, container) {
    return new NewsCard(date, title, text, media, image, link, newsCardsContainer).create();
  }


  function onload() {
    const arrStorage = dataStorage.getData('articles');

    if (!arrStorage) {
      section.hide(searchResult);
    } else {
      section.hide(searchResult);
      dataStorage.saveData('step', step);
      section.hide(load);

      searchInput.value = dataStorage.getData('searchInput');
      newsCardList.render(arrStorage.slice(0, 3));
      section.show(searchResult);

      if (arrStorage.length > 3) {
        section.show(moreBtn);
      } else {
        section.hide(moreBtn);
      }
    }

  }

  function showNews() {


    section.hide(notFound);
    section.hide(searchResult);
    section.show(load);

    dataStorage.clearData();
    const newsApi = new NewsApi(searchInput.value, config.baseUrl, config.newsApiKey);

    newsApi.getNews()
      .then(res => {
        const { totalResults, articles } = res;
        if (!articles.length) {
          section.hide(load);
          section.show(notFound);
        } else {
          dataStorage.saveData('totalResults', totalResults);
          dataStorage.saveData('articles', articles);
          dataStorage.saveData('searchInput', searchInput.value);

          onload();
        }

      })
      .catch(err => {
        section.hide(load);
        section.show(notFound);
        console.log('Ошибка. Запрос не выполнен: ', err);
        document.querySelector('.not-found__title').textContent = 'Ошибка!';
        document.querySelector('.not-found__subtitle').textContent = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
      })

  }

  function clearNews() {
    while (newsCardsContainer.firstChild) {
      newsCardsContainer.removeChild(newsCardsContainer.firstChild);
    }
  }



  /** СЛУШАТЕЛИ */

  formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    clearNews();
    showNews();
  });

  formSearch.addEventListener('input', (e) => {
    formValidationSearch.setEventListeners(e);
  }, true);



  moreBtn.addEventListener('click', (event) => {
    const arrAtStorage = dataStorage.getData('articles');
    let i = dataStorage.getData('step');


    newsCardList.render(arrAtStorage.slice((i - 3), i));

    if (i >= arrAtStorage.length) {
      section.hide(moreBtn);
    } else {
      section.show(moreBtn);
    }

    dataStorage.saveData('step', (i + 3));
  });

  onload();



})()