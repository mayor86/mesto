export class Section {
  constructor({
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  setItems(items) {
    this._items = items;
  }
  rendererItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}