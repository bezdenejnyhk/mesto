export default class Section {
    constructor({items, renderer}, template) {
        this._items = items
        this._renderer = renderer
        this._template = document.querySelector(template);
    }

    renderAll() {
        this._items.forEach((item) => {
          this._renderer(item);
        });
    }
    
    addItem(data) {
        this._template.prepend(data);
    }
}