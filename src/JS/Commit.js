export default class Commit {
  constructor(date, photo, name, email, text) {
    this.date = date;
    this.photo = photo;
    this.name = name;
    this.email = email;
    this.text = text;
    this.commit = 0;
  }

  _getTeplate() {
    const markup = `
    <div class="swiper-slide commit">
          <p class="commit__date"></p>
          <div class="commit__package">
            <div class="commit__photo"></div>
            <div>
              <p class="commit__user"></p>
              <p class="commit__email"></p>
            </div>
          </div>
          <p class="commit__text"></p>
        </div>
    `
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup.trim());

    return element.firstChild;
  }

  dateToString(x) {
    const time = new Date(x)

    const year = time.getFullYear();
    const options = {
      month: 'long',
      day: 'numeric'
    };
    const resultDate = new Intl.DateTimeFormat('ru-Ru', options).format(time);

    return (`${resultDate}, ${year}`)
  }

  create() {
    this.commit = this._getTeplate();

    this.commit.querySelector('.commit__date').textContent = this.dateToString(this.date);
    this.commit.querySelector('.commit__user').textContent = this.name;
    this.commit.querySelector('.commit__email').textContent = this.email;
    this.commit.querySelector('.commit__text').textContent = this.text;
    this.commit.querySelector('.commit__photo').style.backgroundImage = `url(${this.photo})`;

    return this.commit;
  }



}