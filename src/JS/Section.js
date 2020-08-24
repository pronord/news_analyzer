export class Section {
  show(node) {
    node.classList.remove('invisible');
  }

  hide(node) {
    node.classList.add('invisible');
  }
}