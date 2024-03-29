export default class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _parseResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    // Получение карточек с сервера
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Добавление новой карточки через попап
    addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          link: data.link,
          name: data.title
        })
      })
        .then(res => this._parseResponse(res));
    }
  
    // Удаление карточки
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Ставим лайк карточке
    setLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Удаляем лайк
    deleteLike(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Получение информации о пользователе с сервера
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Редактирование информации о пользователе через попап
    editUserInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.job
        })
      })
        .then(res => this._parseResponse(res));
    }
  
    // Редактирование аватара пользователя через попап
    editAvatar(userData) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData.avatar
        })
      })
        .then(res => this._parseResponse(res));
    }
}
  