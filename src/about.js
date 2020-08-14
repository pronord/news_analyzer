import '../src/pages/about.css'

// базовая версия с добавление модулей Навигации и Пагинации:
import Swiper, { Navigation, Pagination } from 'swiper';

// Свайпер использует Навигацию и Пагинацию
Swiper.use([Navigation, Pagination]);

// Инициализируем свайпер:
const slider = document.querySelector('.swiper-container');

// Задаем параметры свайперу:
const mySwiper = new Swiper(slider, {

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },

  loop: true, // зацикленная лента свайпера
  centeredSlides: true, //активный слайдер по центру
  grabCursor: true, //можно двигать мышкой
  slideToClickedSlide: true, // при клике на слайд он становится активным

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