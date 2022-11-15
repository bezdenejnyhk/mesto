import FormValidator from './FormValidator.js';
import Card from './Card.js';
import { initialCards } from './initialCards.js';

const validationConfig = {
  formSelector: ".popup__content_add",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input-error_active",
  errorClass: "popup__input-error"
};

export const popupImage = document.querySelector('.popup_image');
export const picture = popupImage.querySelector('.picture__image');
export const caption = popupImage.querySelector('.picture__caption');

const popupEditButtonOpen = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const formEditElement = document.getElementById('formEditElement');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupAdd = document.querySelector('.popup_add');
const popupAddButtonOpen = document.querySelector('.profile__add');
const cardItem = document.querySelector(".cards");
const formAddElement = document.querySelector('.popup__content_add');   
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');  
const profileEditForm = popupEdit.querySelector('.popup__input');
const cardAddForm = popupAdd.querySelector('.popup__input');
const popupList = Array.from(document.querySelectorAll('.popup'));

const profileEditValidation = new FormValidator(validationConfig, profileEditForm);
const cardAddValidation = new FormValidator(validationConfig, cardAddForm);

profileEditValidation.enableValidation();
cardAddValidation.enableValidation();

const createCard = (data) => {
  const card = new Card(data, '.item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (data) => {
  const card = createCard(data, '.item-template');;
  cardItem.prepend(card);
}

const handleAddNewCard = (evt) => {
  evt.preventDefault();

  const data = {
    title: titleInput.value,
    link: linkInput.value,
  };
  renderCard(data);

  cardAddValidation.resetValidation();

  titleInput.value = '';
  linkInput.value = '';

  closePopup(popupAdd);
}

formAddElement.addEventListener('submit', handleAddNewCard);

//Открытие,закрытие popup
export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

popupEditButtonOpen.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEdit);
});

popupAddButtonOpen.addEventListener('click', () => {
  openPopup(popupAdd);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

//функция закрытия попапов по оверлей и кнопке закрытия
popupList.forEach( (popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened') | event.target.classList.contains('popup__close')){
      closePopup(popup);
    };
  });
});

//функция закрытия попапов по Esc
function closeEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

//Редактирование профиля
function handleSubmitFormEdit (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit);
}

formEditElement.addEventListener('submit', handleSubmitFormEdit);

initialCards.forEach(renderCard);