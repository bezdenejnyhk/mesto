export default class Section {
    constructor({renderer}, template) { 
        this._renderer = renderer
        this._container = document.querySelector(template);
    }

    renderAll(data) {
        data.forEach((item) => {
          this._renderer(item);
        });
    }
    
    addItem(data) {
        this._container.prepend(data);
    }
}