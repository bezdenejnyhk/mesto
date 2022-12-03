import './pages/index.css';

import arkhyz from './images/arkhyz.jpg';
import chelyabinskOblast from './images/chelyabinsk-oblast.jpg';
import ivanovo from './images/ivanovo.jpg';
import kamchatka from './images/kamchatka.jpg';
import kholmogorskyRayon from './images/kholmogorsky-rayon.jpg';
import baikal from './images/baikal.jpg';

const initialCards = [
    {
      title: 'Архыз',
      link: arkhyz
    },
    {
      title: 'Челябинская область',
      link: chelyabinskOblast
    },
    {
      title: 'Иваново',
      link: ivanovo
    },
    {
      title: 'Камчатка',
      link: kamchatka
    },
    {
      title: 'Холмогорский район',
      link: kholmogorskyRayon
    },
    {
      title: 'Байкал',
      link: baikal
    }
]; 

import FormValidator from './components/FormValidator.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input-error_active",
  errorClass: "popup__input-error"
};

const popupEditButtonOpen = document.querySelector('.profile__edit');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');
const popupAddButtonOpen = document.querySelector('.profile__add');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');  

const profileEditValidation = new FormValidator({
  config: validationConfig,
  formSelector: '#formEditElement'
});

const cardAddValidation = new FormValidator({
  config: validationConfig,
  formSelector: '#popupContentAdd'
});

profileEditValidation.enableValidation();
cardAddValidation.enableValidation();

// Создание новой карточки
const createCard = (data) => {
  const card = new Card({data}, handleCardClick, '.item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление карточек на страницу 
const cardsContainer = new Section ({
  items: initialCards,
  renderer: (data) => {
    cardsContainer.addItem(createCard(data));
  }
}, '.cards');

cardsContainer.renderAll();

//Открытие полноразмерной картинки
const popupOpenImage = new PopupWithImage({ popupSelector: '.popup_image' });
popupOpenImage.setEventListeners();

function handleCardClick(link, title) {
  popupOpenImage.open(link, title);
}   

// ПОПАП ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: () => {
    const data = {
          title: titleInput.value,
          link: linkInput.value,
        };
        cardsContainer.addItem(createCard(data));
    newCardPopup.close();
  }
});
newCardPopup.setEventListeners();

popupAddButtonOpen.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  cardAddValidation.resetValidation();
  newCardPopup.open();
});


// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: () => {
    userInfo.setUserInfo();
    profilePopup.close();
  }
});
profilePopup.setEventListeners();

const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__info-description'
})

popupEditButtonOpen.addEventListener('click', () => {
  // nameInput.value = userInfo.getUserInfo().profileName;
  // descriptionInput.value = userInfo.getUserInfo().profileDescription;
  profilePopup.open();
  
  cardAddValidation.resetValidation();
});