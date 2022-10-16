const popupEditButtonOpen = document.querySelector('.profile__edit');
const popupEditButtonClose = document.getElementById('closeButtonEdit');
const popupEdit = document.querySelector('.popup_edit');

const formEditElement = document.getElementById('formEditElement');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__info-name');
const profileDescription = document.querySelector('.profile__info-description');

const popupAdd = document.querySelector('.popup_add');
const popupAddButtonOpen = document.querySelector('.profile__add');
const popupAddButtonClose = document.getElementById('closeButtonAdd');
const cardItem = document.querySelector(".cards__item");
const cardsImage = document.querySelector('.cards__image');
const cardsText = document.querySelector('.cards__text');
const formAddElement = document.querySelector('.popup__content_add');

const itemTemplate = document.querySelector(".cards__item-template")
    .content.querySelector('.cards__item-element');

const buttonElement = document.querySelector(".popup__save");    
const buttonSaveAdd = document.querySelector(".popup__save_add");
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup_image');
const popupImageButtonClose = document.querySelector('.popup__close_image');
const caption = document.querySelector('.picture__caption');
const picture = document.querySelector('.picture__image');
const inputElement = document.querySelector('.popup__input_error');

const popupList = Array.from(document.querySelectorAll('.popup'));

//Открытие,закрытие popup
function openPopup(popup) {
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
  buttonSaveAdd.disabled = !this.value;
  buttonSaveAdd.classList.add('popup__save_inactive');
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