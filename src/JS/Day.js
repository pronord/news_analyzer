export class Day {
  constructor(date) {
    this.date = date;
    this.day = 0;
  }

  _getTemplate() {
    const markup = `<p class="days__item">19, пн</p>`

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup.trim());

    return element.firstChild;
  }

  create() {
    this.day = this._getTemplate();
    this.day.textContent = this.date;

    return this.day;
  }
}