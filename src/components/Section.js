export default class Section {
    constructor({items, renderer}, templateSelector) {
        this._items = items
        this._renderer = renderer
        this._templateSelector = document.querySelector(templateSelector);
    }

    renderAll() {
        this._items.forEach((item) => {
          this._renderer(item);
        });
    }
    
    addItem(data) {
        this._templateSelector.prepend(data);
    }
}