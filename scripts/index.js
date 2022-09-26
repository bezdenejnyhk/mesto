const openPopupButton = document.querySelector('.profile__edit');
const closePopupButton = document.querySelector('.popup__close');
const popupEdit = document.querySelector('.popup__edit');

let formElement = document.querySelector('.popup__content')
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
let buttonSave = document.querySelector('.popup__save');
let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-description');

const popupAdd = document.querySelector('.popup__add');
const openPopupAddButton = document.querySelector('.profile__add');
const closePopupAddButton = document.getElementById('closeButton');
const cardItem = document.querySelector(".cards__item");
const itemTemplate = document.querySelector(".cards__item-template").content;
const buttonSaveAdd = document.querySelector(".popup__save_add");
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

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


//Открытие,закрытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
closePopupButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});
closePopupAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

//Редактирование профиля
function handlerSubmitForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

formElement.addEventListener('submit', handlerSubmitForm);

//Создание карточек
function render() {
  initialCards.forEach(createdCards);
}

function createdCards(text) {
  const newHtmlElement = itemTemplate.cloneNode(true);
  const header = newHtmlElement.querySelector('.cards__text');
  const image = newHtmlElement.querySelector('.cards__image');
  header.textContent = text.title;
  image.src = text.link;
  image.alt = text.title;
  //setListenersForItem(newHtmlElement);
  cardItem.appendChild(newHtmlElement);
}

//Добавление новой карточки
function handlerAddCardsForm(evt) {
  evt.preventDefault();
  const newCards = {
    title: '',
    link: '',
  };
  newCards.title = titleInput.value;
  newCards.link = linkInput.value;
  cardItem.prepend(createdCards(newCards));
  titleInput.reset();
  linkInput.reset();
  closePopup(popupAdd);
} 

cardItem.addEventListener('submit', handlerAddCardsForm);
render();

//  //Удаление, Лайк, Попап картинка
// function setListenersForItem(element) {
//   const deleteButton = element.querySelector('.cards__delete');
//   deleteButton.addEventListener('click', handleDelete);

//   const likeButton = element.querySelector('.cards__like');
//   likeButton.addEventListener('click', handleLike);

//   const cardsImage = element.querySelector('.popup__image');
//   cardsImage.addEventListener('click', openPopupImage);
// }

// function handleDelete(event) {
//   const currentListItem = event.target.closest('.cards__item-element');
//   currentListItem.remove();
// }

// function handleLike(evt) {
//   const currentListItem = evt.target.classList.toggle('.cards__like:active');
//   currentListItem.remove();
// }

// function openPopupImage() {
//   const popupImage = document.querySelector('.popup__image');
//   popupImage.classList.add('popup_opened');
// }