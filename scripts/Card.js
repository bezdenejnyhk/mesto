export default class Card {
    constructor(data, handleCardClick, templateSelector) {
        this._title = data.title;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.item')
        .cloneNode(true);

        return cardElement;
    }

    _handleLike() {
        this._likeButton.classList.toggle('item__like_active');
    }

    _handleDelete() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    // _handlePreview() {
    //     this._handleCardClick(this._link, this._title);
    // }

    _setListenersForItem() {
        this._deleteButton.addEventListener('click', () => { this._handleDelete() });
        this._likeButton.addEventListener('click', () => { this._handleLike() });
        this._cardsImage.addEventListener('click', () => { 
            this._handleCardClick(this._link, this._title);
        });
    }   
    
    generateCard() {
        this._cardElement = this._getTemplate();

        this._deleteButton = this._cardElement.querySelector('.item__delete');
        this._likeButton = this._cardElement.querySelector('.item__like');
        this._cardsImage = this._cardElement.querySelector('.item__image');

        this._cardElement.querySelector('.item__text').textContent = this._title;
        this._cardsImage.src = this._link;
        this._cardsImage.alt = this._link;

        this._setListenersForItem();

        return this._cardElement;
    }
}
