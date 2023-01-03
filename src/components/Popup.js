export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close');
        this._escapeClose = this._handleEscClose.bind(this);
    }

    //Открытие popup
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._escapeClose);
    }
  
    //Закрытие popup
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escapeClose);
    }

    //функция закрытия попапов по кнопке ESC
    _handleEscClose(event) {
        if (event.key === 'Escape') {
          this.close();
        }
    }

    //функция закрытия попапов по оверлей
    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
          this.close();
        });
        this._popup.addEventListener('mousedown', (event) => {
          if (event.target.classList.contains('popup')) {
            this.close();
          }
        });
    }
}