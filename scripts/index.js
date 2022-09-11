const OpenPopup = document.querySelector('.profile__edit');
const ClosePopup = document.querySelector('.popup__close');
const Popup = document.querySelector('.popup');

let FormElement = document.querySelector('.profile__edit')
let NameInput = document.querySelector('.popup__input_name');
let JobInput = document.querySelector('.popup__input_description');
let ButtonSave = document.querySelector('.popup__save');
let Name = document.querySelector('.profile__info-name');
let Job = document.querySelector('.profile__info-description');

let EditName = NameInput.value;
let EditJob = JobInput.value;

OpenPopup.addEventListener('click', function () {
    Popup.classList.add('popup_opened');
    EditName.textContent = NameInput.value;
    EditJob.textContent = JobInput.value;
})

ClosePopup.addEventListener('click', function() {
    Popup.classList.remove('popup_opened');
})

ButtonSave.addEventListener ('click', function formSubmitHandler (evt) {
    evt.preventDefault(); 
    Name.textContent = NameInput.value;
    Job.textContent = JobInput.value;
    Popup.classList.remove('popup_opened');
})

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
FormElement.addEventListener('submit', formSubmitHandler); 
