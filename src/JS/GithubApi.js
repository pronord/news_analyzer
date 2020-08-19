export class GithubApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCommits() {
    return fetch(`${this.baseUrl}/commits`, {
        method: 'GET'
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }

}