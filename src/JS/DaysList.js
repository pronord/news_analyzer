export class DaysList {
  constructor(container, createDay) {
    this.container = container;
    this.createDay = createDay;
  }

  _addDay(date) {
    const newDay = this.createDay(date);
    this.container.append(newDay);
  }

  render(arr) {
    arr.forEach(item => {
      this._addDay(item);
    });
  }

}