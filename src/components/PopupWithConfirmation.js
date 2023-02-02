import Popup from "./Popup.js";


export default class PopupWithConfirmation extends Popup {
  constructor(params) {
    super(params.popupSelector);
    this._form = this._popup.querySelector('.popup__content');
  }

  // принимает коллбэк на удаление карточки
  submitHandler(removing) {
    this._handleSubmit = removing;
  }

  // удаление карточки по нажатию на submit
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
}