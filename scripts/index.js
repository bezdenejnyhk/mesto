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
const cardsImage = document.querySelector('.cards__image');
const cardsText = document.querySelector('.cards__text');

const itemTemplate = document.querySelector(".cards__item-template")
    .content.querySelector('.cards__item-element');

const buttonSaveAdd = document.querySelector(".popup__save_add");
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup__image');
const closePopupImageButton = document.querySelector('.popup__close_image');
const caption = document.querySelector('.picture__caption');
const picture = document.querySelector('.picture__image');

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

closePopupImageButton.addEventListener('click', () => {
  closePopup(popupImage);
})

buttonSaveAdd.addEventListener('click', () => {
  closePopup(popupAdd);
})

//Редактирование профиля
function handlerSubmitForm (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

formElement.addEventListener('submit', handlerSubmitForm);

//Создание карточек

function createdCards(text) {
  const newHtmlElement = itemTemplate.cloneNode(true);
  const name = newHtmlElement.querySelector('.cards__text');
  const image = newHtmlElement.querySelector('.cards__image');
  name.textContent = text.title;
  image.src = text.link;
  image.alt = text.title;
  setListenersForItem(newHtmlElement, text);
  return(newHtmlElement);
}

function render(text) {
  const newCard = createdCards(text);
  cardItem.prepend(newCard);
}

//Добавление новой карточки
function handleAddNewCard(event) {
  event.preventDefault();

  render({ title: titleInput.value, link: linkInput.value });
  titleInput.value = " ";
  linkInput.value = " ";
  
  closePopup(popupAdd);
}

popupAdd.addEventListener('submit', handleAddNewCard);

//Удаление, Лайк, Попап картинка
function setListenersForItem(element, text) {
  const deleteButton = element.querySelector('.cards__delete');
  deleteButton.addEventListener('click', handleDelete);

  const likeButton = element.querySelector('.cards__like');
  likeButton.addEventListener('click', handleLike);

  const cardsImage = element.querySelector('.cards__image');
  cardsImage.addEventListener('click', () => {
    handlePreview(text);
  });
}

function handleDelete(event) {
  const deleteButtonActive = event.target.closest('.cards__item-element');
  deleteButtonActive.remove();
}

function handleLike(event) {
  event.target.classList.toggle('cards__like_active');
}

function handlePreview(text) {
  picture.src = text.link;
  picture.alt = text.title;
  caption.textContent = text.title;

  openPopup(popupImage);
}

initialCards.forEach(render);