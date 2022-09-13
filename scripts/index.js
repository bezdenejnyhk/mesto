const openPopupButton = document.querySelector('.profile__edit');
const closePopupButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

let formElement = document.querySelector('.popup__content')
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let buttonSave = document.querySelector('.popup__save');
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-description');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popup);
}

formElement.addEventListener('submit', formSubmitHandler);