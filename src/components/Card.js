export default class Card {
    constructor({data, userId, handleCardClick, handleSetLike, handleRemoveLike, handleDeleteIconClick}, templateSelector) {
        this._title = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleSetLike = handleSetLike;
        this._handleRemoveLike = handleRemoveLike;
        this._likes = data.likes;
        this._userId = userId;
        this._cardId = data._id;
        this._cardOwnerId = data.owner._id;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.item')
        .cloneNode(true);

        return cardElement;
    }


    // Удаление карточки
    deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    // Устанавливаем слушатели на карточку
    _setEventListeners() {
        // открытие попапа просмотра изображения кликом по изображению
        this._cardsImage.addEventListener('click', () => {
            this._handleCardClick(this._link, this._title);
        })
        // слушатель кнопки удаления карточки
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick(this._cardId);
        })
        // слушатель кнопки лайк
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('item__like_active')) {
                this._handleRemoveLike(this._cardId);
            } else {
                this._handleSetLike(this._cardId);
            }
        })
    }    

    // Генерируем готовую карточку
    generateCard() {
        this._cardElement = this._getTemplate();
        this._deleteButton = this._cardElement.querySelector('.item__delete');
        this._likeButton = this._cardElement.querySelector('.item__like');
        this._cardsImage = this._cardElement.querySelector('.item__image');
        this._likesNumber = this._cardElement.querySelector('.item__like-count');

        this._cardsImage.src = this._link;
        this._cardsImage.alt = this._title;

        this._cardElement.querySelector('.item__text').textContent = this._title;
        this._hasDeleteButton();
        this._isCardLiked();
        this._likesNumber.textContent = this._likes.length;
        this._setEventListeners();

        return this._cardElement;
    }

    // Проверка, стоит ли лайк на карточке
    _isCardLiked() {
        if (this._likes.some((user) => {
            return this._userId === user._id;
        })) {
            this._likeButton.classList.add('item__like_active');
        }
    }

    // поставить/удалить лайк, изменение количества лайков
    handleLikeCard(data) {
        this._likes = data.likes;
        this._likesNumber.textContent = this._likes.length;
        this._likeButton.classList.toggle('item__like_active');
    }

    //проверяем владельца карточки и убираем кнопку Delete
    _hasDeleteButton() {
        if (this._userId !== this._cardOwnerId) {
            this._deleteButton.remove();
        }
    }
}
