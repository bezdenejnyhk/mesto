const openPopupEditButton = document.querySelector('.profile__edit');
const closePopupEditButton = document.getElementById('closeButtonEdit');
const popupEdit = document.querySelector('.popup_edit');

const formEditElement = document.getElementById('formEditElement');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');

const popupAdd = document.querySelector('.popup_add');
const openPopupAddButton = document.querySelector('.profile__add');
const closePopupAddButton = document.getElementById('closeButtonAdd');
const cardItem = document.querySelector(".cards__item");
const cardsImage = document.querySelector('.cards__image');
const cardsText = document.querySelector('.cards__text');
const formAddElement = document.querySelector('.popup__content_add');

const itemTemplate = document.querySelector(".cards__item-template")
    .content.querySelector('.cards__item-element');

const buttonSaveAdd = document.querySelector(".popup__save_add");
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_image');
const closePopupImageButton = document.querySelector('.popup__close_image');
const caption = document.querySelector('.picture__caption');
const picture = document.querySelector('.picture__image');
const inputElement = document.querySelector('.popup__input_error');

const popupList = Array.from(document.querySelectorAll('.popup'));

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
  document.addEventListener('keydown', closeEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
}

openPopupEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});
closePopupEditButton.addEventListener('click', () => {
  closePopup(popupEdit);
});

openPopupAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});
closePopupAddButton.addEventListener('click', () => {
  closePopup(popupAdd);
});

closePopupImageButton.addEventListener('click', () => {
  closePopup(popupImage);
})

//функция закрытия попапов по оверлей
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', function(event) {
    if (event.target === event.currentTarget)  {
      closePopup(popup);
    };
  });
});

  //функция закрытия попапов по Esc
function closeEsc(event) {
  const popupOpened = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupOpened);
  };
};

//Редактирование профиля
function handlerSubmitFormEdit (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit);
}

formEditElement.addEventListener('submit', handlerSubmitFormEdit);

//Создание карточек
function createdCards(data) {
  const newHtmlElement = itemTemplate.cloneNode(true);
  const name = newHtmlElement.querySelector('.cards__text');
  const image = newHtmlElement.querySelector('.cards__image');
  name.textContent = data.title;
  image.src = data.link;
  image.alt = data.title;
  setListenersForItem(newHtmlElement, data);
  return(newHtmlElement);
}

function renderCard(data) {
  const newCard = createdCards(data);
  cardItem.prepend(newCard);
}

//Добавление новой карточки
function handleAddNewCard(event) {
  event.preventDefault();

  renderCard({ title: titleInput.value, link: linkInput.value });
  titleInput.value = "";
  linkInput.value = "";
  
  closePopup(popupAdd);
}

formAddElement.addEventListener('submit', handleAddNewCard);

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

initialCards.forEach(renderCard);