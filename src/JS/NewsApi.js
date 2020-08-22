export class NewsApi {
  constructor(keyword, baseUrl, apiKey) {
    this.keyword = keyword;
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getDates() {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);

    return {
      to: today.toISOString(),
      from: sevenDaysAgo.toISOString()
    }
  }

  getNews() {
    return fetch(`${this.baseUrl}${this.keyword}&pageSize=100&sortBy=publishedAt&from=${this._getDates().from}&to=${this._getDates().to}&apiKey=${this.apiKey}`, {
        method: 'GET'
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}