import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {validationConfig, popupEditButtonOpen, nameInput, descriptionInput,
  popupAddButtonOpen, buttonEditAvatar}
  from '../utils/constants.js';

import Api from '../components/Api.js';  
import PopupWithConfirmation from '../components/PopupWithConfirmation';

  //Валидация
const profileEditValidation = new FormValidator({
  config: validationConfig,
  formSelector: '#formEditElement'
});

const cardAddValidation = new FormValidator({
  config: validationConfig,
  formSelector: '#popupContentAdd'
});

const formEditAvatarValidator = new FormValidator({
  config: validationConfig,
  formSelector: '#popupContentAvatar'
});

profileEditValidation.enableValidation();
cardAddValidation.enableValidation();
formEditAvatarValidator.enableValidation();

const userInfo = new UserInfo({
  userName: '.profile__info-name',
  userJob: '.profile__info-description',
  userAvatar: '.profile__avatar'
})

//Открытие полноразмерной картинки
const popupOpenImage = new PopupWithImage({ popupSelector: '.popup_image' });
popupOpenImage.setEventListeners();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'f05e4160-c2c1-4ea1-b5bc-d6763b6bef6d',
    'Content-Type': 'application/json'
  }
}); 

let userId;

// Инициализация профиля и начальных карточек
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then((result) => {
    const [userData, initialCards] = result;
    userInfo.setUserInfo(userData)
    userId = userData._id;
    cardsContainer.renderAll(initialCards);
})
.catch((err) => {
  console.log(err);
});



// // Создание новой карточки
// const createCard = (data) => {
//   const card = new Card({data}, handleCardClick, '.item-template');
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// Создание новой карточки
const createCard = (data) => {
  const card = new Card({
    data, 
    userId,
    handleCardClick: (link, name) => {
      popupOpenImage.open(link, name);
    }, 
    handleSetLike: (cardId) => {
      api.setLike(cardId)
      .then((data) => {
        card.handleLikeCard(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    },
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
      .then((data) => {
        card.handleLikeCard(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }, 
    handleDeleteIconClick: (cardId) => {
      deleteCardPopup.open();
      deleteCardPopup.submitCallback(() => {
        api.deleteCard(cardId)
        .then(() => {
          deleteCardPopup.close();
          card.deleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      });
    },
  }, '.item-template');
  
  return card.generateCard();
}

//Попап с подтверждением удаления карточки
const deleteCardPopup = new PopupWithConfirmation({
  popupSelector: '.popup_delete-card'
});
deleteCardPopup.setEventListeners();

// Добавление карточек на страницу 
const cardsContainer = new Section ({
  renderer: (card) => {
    cardsContainer.addItem(createCard(card));
  }
}, '.cards');
  

// // ПОПАП ДОБАВЛЕНИЯ НОВЫХ КАРТОЧЕК
// const newCardPopup = new PopupWithForm({
//   popupSelector: '.popup_add',
//   handleFormSubmit: (data) => {
//     cardsContainer.addItem(createCard(data));
//     newCardPopup.close();
//   }
// });
// newCardPopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (data) => {
    newCardPopup.loading(true);
    api.addCard(data)
    .then((data) => {
      cardsContainer.addItem(createCard(data));
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      newCardPopup.loading(false);
    });
  }
});
newCardPopup.setEventListeners();

popupAddButtonOpen.addEventListener('click', () => {
  cardAddValidation.resetValidation();
  newCardPopup.open();
});


// // ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// const profilePopup = new PopupWithForm({
//   popupSelector: '.popup_edit',
//   handleFormSubmit: (data) => {
//     userInfo.setUserInfo(data);
//     profilePopup.close();
//   }
// });
// profilePopup.setEventListeners();

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_edit',
  handleFormSubmit: (data) => {
    profilePopup.loading(true);
    api.editUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      profilePopup.loading(false);
    })
  }
});
profilePopup.setEventListeners();

popupEditButtonOpen.addEventListener('click', () => {
  profileEditValidation.resetValidation();
  const {job, name} = userInfo.getUserInfo()
  nameInput.value = name;
  descriptionInput.value = job;
  profilePopup.open();
});

// ПОПАП РЕДАКТИРОВАНИЯ АВАТАРА
const newAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_avatar',
  handleFormSubmit: (data) => {
    newAvatarPopup.loading(true);
    api.editAvatar(data)
    .then((data) => {
      avatar.src = data.avatar;
      newAvatarPopup.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      newAvatarPopup.loading(false);
    });
  }
});
newAvatarPopup.setEventListeners();

//Обработчик кнопки Edit аватара пользователя
buttonEditAvatar.addEventListener('click', () => {
  formEditAvatarValidator.resetValidation();
  newAvatarPopup.open();
});