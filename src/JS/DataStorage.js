export class DataStorage {

  saveData(item, value) {
    localStorage.setItem(item, JSON.stringify(value))
  }

  getData(item) {
    return JSON.parse(localStorage.getItem(item))
  }

  clearData() {
    localStorage.clear();
  }


}