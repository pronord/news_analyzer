import '../src/pages/about.css';
import Swiper, { Navigation, Pagination } from 'swiper';
import Commit from './JS/Commit.js';
import { CommitList } from './JS/CommitList.js';
import GithubApi from './JS/GithubApi.js';

(function() {

  /** КОНСТАНТЫ */

  //конфиг для API
  const GITHUB_API_URL = NODE_ENV === 'production' ? 'https://api.github.com/repos/pronord' : 'http://api.github.com/repos/pronord';
  const config = {
      baseUrl: `${GITHUB_API_URL}/news_analyzer`
    }
    //контейнер для коммитов
  const commitContainer = document.querySelector('.swiper-wrapper');
  // Свайпер использует Навигацию и Пагинацию
  Swiper.use([Navigation, Pagination]);

  /** ИНСТАНСЫ */

  // инстанс запросов к серверу
  const githubApi = new GithubApi(config.baseUrl);

  //контейнер для коммитов
  const commitList = new CommitList(commitContainer, createCommit);

  // свайпер
  const mySwiper = new Swiper('.swiper-container', {
    init: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 5,
    },

    loop: true, // зацикленная лента свайпера
    centeredSlides: true, //активный слайдер по центру
    grabCursor: true, //можно двигать мышкой
    slideToClickedSlide: true, // при клике на слайд он становится активным
    slideToClickedSlide: true,


    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      // ширина окна >= 320px
      320: {
        slidesPerView: 'auto',
        spaceBetween: 8
      },
      // ширина окна >= 640px
      768: {
        slidesPerView: 'auto',
        spaceBetween: 16
      }
    }
  });


  /** МЕТОДЫ КЛАССОВ */

  // создание списка коммитов
  githubApi.getCommits()
    .then(res => {
      commitList.render(res);
      mySwiper.init();
    })
    .catch(err => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    })


  /** КОЛБЭКИ */

  // создаю колбэк, возвращающий разметку коммита
  function createCommit(date, photo, name, email, text) {
    return new Commit(date, photo, name, email, text).create();
  }


})()