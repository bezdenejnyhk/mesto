import arkhyz from '../images/arkhyz.jpg';
import chelyabinskOblast from '../images/chelyabinsk-oblast.jpg';
import ivanovo from '../images/ivanovo.jpg';
import kamchatka from '../images/kamchatka.jpg';
import kholmogorskyRayon from '../images/kholmogorsky-rayon.jpg';
import baikal from '../images/baikal.jpg';

export const initialCards = [
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

export const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_inactive",
    inputErrorClass: "popup__input-error_active",
    errorClass: "popup__input-error"
};
  
export const popupEditButtonOpen = document.querySelector('.profile__edit');
export const nameInput = document.querySelector('.popup__input_type_name');
export const descriptionInput = document.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__info-name');
export const profileDescription = document.querySelector('.profile__info-description');
export const popupAddButtonOpen = document.querySelector('.profile__add');
export const titleInput = document.querySelector('.popup__input_type_title');
export const linkInput = document.querySelector('.popup__input_type_link');

