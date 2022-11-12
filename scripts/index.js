import formValidator from './formValidator.js';
import Card from './Card.js';

const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const validationConfig = {
  formSelector: ".popup__content_add",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input-error_active",
  errorClass: "popup__input-error"
};

const popupEditButtonOpen = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const formEditElement = document.getElementById('formEditElement');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupAdd = document.querySelector('.popup_add');
const popupAddButtonOpen = document.querySelector('.profile__add');
const cardItem = document.querySelector(".cards__item");
const formAddElement = document.querySelector('.popup__content_add');   
const buttonSaveAdd = document.querySelector(".popup__save_add");
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');  
const profileEditForm = popupEdit.querySelector('.popup__input');
const cardAddForm = popupAdd.querySelector('.popup__input');
const popupList = Array.from(document.querySelectorAll('.popup'));

const profileEditValidation = new formValidator(validationConfig, profileEditForm);
const cardAddValidation = new formValidator(validationConfig, cardAddForm);

profileEditValidation.enableValidation();
cardAddValidation.enableValidation();

const renderCard = (data) => {
  const card = new Card(data, '.cards__item-template');
  const cardElement = card.generateCard();
  cardItem.prepend(cardElement);
}

const handleAddNewCard = (evt) => {
  evt.preventDefault();

  const data = {
    title: titleInput.value,
    link: linkInput.value,
  };
  renderCard(data);

  cardAddValidation.resetValidation();
  buttonSaveAdd.classList.add('popup__save_inactive');

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
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

popupAddButtonOpen.addEventListener('click', () => {
  openPopup(popupAdd);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

//функция закрытия попапов по оверлей и кнопке закрытия
popupList.forEach( (popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')){
      closePopup(popup);
    };
    if (event.target.classList.contains('popup__close')){
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