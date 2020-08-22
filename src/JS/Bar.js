export class Bar {
  constructor(percent, matches) {
    this.percent = percent;
    this.matches = matches;
    this.bar = 0;
  }

  _getTemplate() {
    const markup = `
    <div class="bar">
      <p class="bar__number">15</p>
    </div>
    `

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup.trim());

    return element.firstChild;
  }

  create() {
    this.bar = this._getTemplate();

    this.bar.style.width = this.percent;
    this.bar.querySelector('.bar__number').textContent = this.matches;

    return this.bar;
  }
}