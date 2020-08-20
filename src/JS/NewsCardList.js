export class NewsCardList {
  constructor(container, createNewsCard) {
    this.container = container;
    this.createNewsCard = createNewsCard;
  }

  _addNewsCard(date, title, text, media, image, link) {
    const newNewsCard = this.createNewsCard(date, title, text, media, image, link);
    this.container.append(newNewsCard);
  }

  render(arr) {
    arr.forEach(item => {
      this._addNewsCard(item.publishedAt, item.title, item.description, item.source.name, item.urlToImage, item.url);
    });
  }
}