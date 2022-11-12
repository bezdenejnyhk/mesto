import openPopup from "./index.js";

export default class Card {
    constructor(data, templateSelector) {
        this._title = data.title;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.cards__item-element')
        .cloneNode(true);

        return cardElement;
    }

    _handleLike() {
        this._likeButton.classList.toggle('cards__like_active');
    }

    _handleDelete() {
        this._cardElement.remove();
    }

    _handlePreview() {
        const picture = document.querySelector('.picture__image');
        const caption = document.querySelector('.picture__caption'); 
        const popupImage = document.querySelector('.popup_image');

        picture.src = this._link;
        picture.alt = this._title;
        caption.textContent = this._title;

        openPopup(popupImage);
    }

    _setListenersForItem() {
        this._deleteButton = this._cardElement.querySelector('.cards__delete');
        this._deleteButton.addEventListener('click', () => { this._handleDelete() });
    
        this._likeButton = this._cardElement.querySelector('.cards__like');
        this._likeButton.addEventListener('click', () => { this._handleLike() });

        this._cardsImage = this._cardElement.querySelector('.cards__image');
        this._cardsImage.addEventListener('click', () => { this._handlePreview() });
    }   
    
    generateCard() {
        this._cardElement = this._getTemplate();
        this._cardElement.querySelector('.cards__text').textContent = this._title;
        this._cardElement.querySelector('.cards__image').src = this._link;
        this._cardElement.querySelector('.cards__image').alt = this._link;

        this._setListenersForItem();

        return this._cardElement;
    }
}
