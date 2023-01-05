import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {validationConfig, popupEditButtonOpen, nameInput, descriptionInput,
  profileName, profileDescription, popupAddButtonOpen, titleInput, linkInput, initialCards}
  from '../utils/constants.js';

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
  handleFormSubmit: (data) => {
    cardsContainer.addItem(createCard(data));
    newCardPopup.close();
  }
});
newCardPopup.setEventListeners();

popupAddButtonOpen.addEventListener('click', () => {
  cardAddValidation.resetValidation();
  newCardPopup.open();
});


// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    profilePopup.close();
  }
});
profilePopup.setEventListeners();

const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__info-description'
})

popupEditButtonOpen.addEventListener('click', () => {
  profileEditValidation.resetValidation();
  const {job, name} = userInfo.getUserInfo()
  nameInput.value = name;
  descriptionInput.value = job;
  profilePopup.open();
});