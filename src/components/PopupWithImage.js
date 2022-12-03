import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(params){
        super(params.popupSelector)
        this._picture = this._popup.querySelector('.picture__image');
        this._caption = this._popup.querySelector('.picture__caption');
    }

    open(link, title) {
        this._picture.src = link;
        this._picture.alt = title;
        this._caption.textContent = title;

        super.open();
    }

}