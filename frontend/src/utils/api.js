class Api {
    constructor({address, headers}) {
        this._address = address;
        this._headers= headers;
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json()
        } return Promise.reject(`Ошибка ${response.status}`)
    };
    
    getUser() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    ;}
    
    getCard() {
        return fetch(`${this._address}/cards`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    };
        
    editUser(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._handleResponse)
    };

    addCard(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._handleResponse)
    };

    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        }) 
        .then(response => response.ok
            ? Promise.resolve('success')
            : Promise.reject(`Ошибка ${response.status}`))
    };

    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/likes/${id}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            credentials: 'include',
            headers: this._headers,
        }) 
        .then(this._handleResponse)
    };

    setAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }) 
        .then(this._handleResponse)
    };
}

const api = new Api({
    address: 'https://mesto.dolgushina.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'
        }
});

export default api;
  