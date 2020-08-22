import '../src/pages/paper.css';
import { DataStorage } from './JS/DataStorage.js';
import { Day } from './JS/Day.js';
import { DaysList } from './JS/DaysList.js';
import { Bar } from './JS/Bar.js';
import { BarList } from './JS/BarList.js';

(function() {
  const dataStorage = new DataStorage();
  const title = document.querySelector('.search-result__title');
  const newsPerWeek = document.querySelector('.search-result__text_bold');
  const keywordInTitles = document.querySelector('#keyword');
  const daysContainer = document.querySelector('.days');
  const barContainer = document.querySelector('#bars');
  const searchInput = dataStorage.getData('searchInput');
  const totalResults = dataStorage.getData('totalResults');
  const arrStorage = dataStorage.getData('articles');
  const totalKeywordMatches = countTotalKeywordMatches(arrStorage);
  const sortedSearchResults = sortSearchResultsByDays();
  const barsArr = calculateStatistic();


  /** ИНСТАНСЫ */
  const daysList = new DaysList(daysContainer, createDay);
  const barList = new BarList(barContainer, createBar);


  /** КОЛБЭКИ */

  function createDay(date) {
    return new Day(date).create();
  }

  function createBar(percent, matches) {
    return new Bar(percent, matches).create();
  }



  /** ФУНКЦИИ */

  // при загрузке страницы
  function onload() {
    title.textContent = `Вы спросили: «${searchInput}»`;
    newsPerWeek.textContent = totalResults;
    keywordInTitles.textContent = countMatch(searchInput, getAllTexts(arrStorage).allTitles);

    analyze();
  }

  //проанализировать результаты
  function analyze() {
    const daysArr = getLastWeek();
    daysList.render(daysArr);
    barList.render(barsArr);
  }

  // найти количество вхождений запроса в текст
  function countMatch(text, article) {
    const re = new RegExp(`${text}`, 'gi');
    const arr = article.match(re);
    if (arr) {
      return arr.length
    }
    return 0;
  }

  // все заголовки и описания в строчки
  function getAllTexts(array) {
    let allTitles = '';
    let allDescriptions = '';

    array.forEach(item => {
      allTitles += item.title + ' ';
      allDescriptions += item.description + ' ';
    })

    return { allTitles, allDescriptions };
  }

  // получаю кол-во совпадений запроса во всех заголовках и всех новостях
  function countTotalKeywordMatches(array) {
    const allTitlesMatch = countMatch(searchInput, getAllTexts(array).allTitles);
    const allDescriptionMatch = countMatch(searchInput, getAllTexts(array).allDescriptions);

    return allTitlesMatch + allDescriptionMatch;
  }

  // Массив последней недели в формате "Число, день недели"
  function getLastWeek() {
    const today = new Date();
    const dayAgo = new Date();
    const daysArr = [];
    for (let i = 0; i <= 6; i++) {
      daysArr[i] = dateToDay(dayAgo.setDate(today.getDate() - i))
    }

    return daysArr.reverse();
  }

  // Преобразование даты к формату "Число, день недели"
  function dateToDay(date) {
    const time = new Date(date);
    const optionsDay = { day: 'numeric' };
    const optionsWeekday = { weekday: 'short' };
    const resultDay = new Intl.DateTimeFormat('ru-Ru', optionsDay).format(time);
    const resultWeekday = new Intl.DateTimeFormat('ru-Ru', optionsWeekday).format(time);

    return (`${resultDay}, ${resultWeekday}`)
  }

  //сортирую массив по дням
  function sortSearchResultsByDays() {
    const byDaysArr = [];
    const days = getLastWeek();

    for (let i = 0; i < days.length; i++) {
      const dayArr = [];
      arrStorage.forEach(item => {
        if (dateToDay(item.publishedAt) == days[i]) {
          dayArr.push(item);
        }
      });
      byDaysArr.push(dayArr);
    }

    return byDaysArr;
  }

  // подсчитываю статистику и присваиваю значения полоскам
  function calculateStatistic() {
    const barsArr = [];

    sortedSearchResults.forEach(item => {
      const bar = {};
      if (item.length) {
        const matches = countTotalKeywordMatches(item);
        const percent = (countTotalKeywordMatches(item) / totalKeywordMatches) * 100;
        bar.percent = `${percent}%`;
        bar.matches = matches;
      } else {
        bar.percent = '1px';
        bar.matches = '';
      }
      barsArr.push(bar);
    });

    return barsArr;
  }

  onload();

})()