import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(params) {
    super(params.popupSelector)
    this._handleFormSubmit = params.handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__content');
    this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._saveButton = this._popupForm.querySelector('.popup__save');
    this._saveButtonTxt = this._saveButton.textContent;
  }

  // Получаем данные из формы
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    })

    return formValues;
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

  // Изменяем состояние кнопки во время загрузки
  loading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...'
    } else {
      this._saveButton.textContent = this._saveButtonTxt;
    }
  }
  
}
