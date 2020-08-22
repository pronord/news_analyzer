export class BarList {
  constructor(container, createBar) {
    this.container = container;
    this.createBar = createBar;
  }

  _addBar(percent, matches) {
    const newBar = this.createBar(percent, matches);
    this.container.append(newBar);
  }

  render(arr) {
    arr.forEach(item => {
      this._addBar(item.percent, item.matches);
    });
  }

}