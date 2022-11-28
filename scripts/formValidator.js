export default class FormValidator {
  constructor(config) {
    this._config = config;
    this._form = document.querySelector(this._config.formSelector);
    this._buttonElement = this._form.querySelector(this._config.validationConfig.submitButtonSelector);
    this._inputList = Array.from(document.querySelectorAll(this._config.inputSelector));
  }

    // проверяем, валидный ли инпут
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
    // переключаем состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
        
  };

    //функция отображения ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  
    //функция скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

    // проверяем инпут на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

    // вешаем слушатель на инпут и кнопку, вызываем функцию проверки на валидность
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

    //обновление ошибок и состояния кнопки
  resetValidation() {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

    // вешаем слушатели на submit, сбрасываем поведение браузера, вызываем функцию проверки валидации инпута
  enableValidation() {
    this._setEventListeners();
  }
}
