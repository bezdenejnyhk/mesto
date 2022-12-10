import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(params) {
    super(params.popupSelector)
    this._handleFormSubmit = params.handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__content');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._saveButton = this._popupForm.querySelector('.popup__save');
  }

  // Получаем данные из формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })

    return this._formValues;
  }

  // Устанавливаем слушатели формы
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  // Закрытие попапа + сброс инпутов
  close() {
    super.close();
    this._popupForm.reset();
  }
}