class Api{
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl
    this._headers = headers
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileFromServer(){
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }

  getCardsFromServer(){
    return fetch(`${this._baseUrl}/cards `, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }

  editProfile(userData){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }

  addCard(cardData){
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData)
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    .then(res => this._getResponseData(res))
    .catch(console.log)
  }
}

const api = new Api(
  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '1e197306-3c80-4dea-abe5-170206fcfc3b',
    'Content-Type': 'application/json'
  }
})

export default api;
