import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import { initialCards } from './initialCards.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const validationConfig = {
  formSelector: ".popup__content_add",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input-error_active",
  errorClass: "popup__input-error"
};

const popupImage = document.querySelector('.popup_image');
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


const profileEditValidation = new FormValidator({
  validationConfig: validationConfig,
  formSelector: '#formEditElement'
});

const cardAddValidation = new FormValidator({
  validationConfig: validationConfig,
  formSelector: '.popup__content_add'
});

profileEditValidation.enableValidation();
cardAddValidation.enableValidation();

// Создание новой карточки
const createCard = (data) => {
  const card = new Card(data, handleCardClick, '.item-template');
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавление карточек на страницу 
const cardsContainer = new Section ({
  items: initialCards,
  renderer: (card) => {
    cardsContainer.addItem(createCard(card));
  }
}, '.cards');

cardsContainer.renderAll();


// const renderCard = (data) => {
//   const card = createCard(data, '.item-template');;
//   cardItem.prepend(card);
// }

// const handleAddNewCard = (evt) => {
//   evt.preventDefault();

//   const data = {
//     title: titleInput.value,
//     link: linkInput.value,
//   };
//   renderCard(data);

//   cardAddValidation.resetValidation();

//   titleInput.value = '';
//   linkInput.value = '';

//   closePopup(popupAdd);
// }

// formAddElement.addEventListener('submit', handleAddNewCard);


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
    cardItem.addItem(createCard(data));
    console.log(data);
    // evt.preventDefault();
    // const data = {
    //   title: titleInput.value,
    //   link: linkInput.value,
    // };
    // renderCard(data);
    // titleInput.value = '';
    // linkInput.value = '';
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
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    console.log(data);
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

// popupEditButtonOpen.addEventListener('click', () => {
//   nameInput.value = profileName.textContent;
//   descriptionInput.value = profileDescription.textContent;
//   openPopup(popupEdit);
// });

// popupAddButtonOpen.addEventListener('click', () => {
//   // openPopup(popupAdd);
//   nameInput.value = profileName.textContent;
//   descriptionInput.value = profileDescription.textContent;
// });


// //Редактирование профиля
// function handleSubmitFormEdit (event) {
//   event.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = descriptionInput.value;
//   closePopup(popupEdit);
// }

// formEditElement.addEventListener('submit', handleSubmitFormEdit);

// initialCards.forEach(renderCard);