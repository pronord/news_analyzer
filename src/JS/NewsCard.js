export class NewsCard {
  constructor(date, title, text, media, image, link, container) {
    this.date = date;
    this.title = title;
    this.image = image;
    this.text = text;
    this.media = media;
    this.link = link;
    this.newsCard = 0;
    this.container = container;
  }

  _getTeplate() {
    const markup = `
    <a href="" id="link" target="_blank" class="cards-wrapper__link">
      <div class="card">
        <div class="card__image">
          <img src="" alt="" class="card__im">
        </div>

        <div class="card__content">
          <div class="card__content-wrapper">
            <p class="card__date"></p>
            <h4 class="card__title"></h4>
            <p class="card__text"></p>
          </div>
          <p class="card__src"></p>
        </div>

      </div>
    </a>
    `
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup.trim());

    return element.firstChild;
  }

  dateToString(date) {
    const time = new Date(date)

    const year = time.getFullYear();
    const options = {
      month: 'long',
      day: 'numeric'
    };
    const resultDate = new Intl.DateTimeFormat('ru-Ru', options).format(time);

    return (`${resultDate}, ${year}`)
  }

  create() {
    this.newsCard = this._getTeplate();

    this.newsCard.querySelector('.card__date').textContent = this.dateToString(this.date);
    this.newsCard.querySelector('.card__title').textContent = this.title;
    this.newsCard.querySelector('.card__text').textContent = this.text.replace(/\<\/?.{2,}\>/g, '').replace(/\s{2}/g, ' ');
    this.newsCard.querySelector('.card__src').textContent = this.media;
    this.newsCard.querySelector('.card__im').src = this.image;
    this.newsCard.querySelector('.card__im').alt = this.title;
    this.newsCard.href = this.link;

    return this.newsCard;
  }

  remove() {
    this.container.removeChild(this.newsCard);
  }



}