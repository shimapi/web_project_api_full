export class Api {
	constructor() {
		this.originURL = "http://localhost:3005";
	}

	async _useFetch(token, url, method, body) {
		const res = await fetch(url, {
			headers: {
				authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			method,
			body: JSON.stringify(body),
		});

		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error: ${res.status}`);
	}

	async getProfileInitialInfo(token) {
		const profileInitialInfo = await this._useFetch(
			token,
			`${this.originURL}/users/me`,
			"GET"
		);
		return profileInitialInfo;
	}

	async getCards(token) {
		const cards = await this._useFetch(token,`${this.originURL}/cards`, "GET");
		return cards;
	}

	async editProfileInfo(token, name, about) {
		const profileInfo = await this._useFetch(
			token,
			`${this.originURL}/users/me`,
			"PATCH",
			{ name, about }
		);
		return profileInfo;
	}

	async editProfileAvatar(token, avatar) {
		const profileAvatar = await this._useFetch(
			token,
			`${this.originURL}/users/me/avatar`,
			"PATCH",
			{ avatar }
		);
		return profileAvatar;
	}

	async addNewCard(token, name, link) {
		const newCard = await this._useFetch(token,`${this.originURL}/cards`, "POST", {
			name,
			link,
		});
		return newCard;
	}

	async deleteCard(token, cardId) {
		const deletedCard = await this._useFetch(
			token,
			`${this.originURL}/cards/${cardId}`,
			"DELETE"
		);
		return deletedCard;
	}

	async likeCard(token, cardId) {
		console.log('token', token)
		console.log('cardId', cardId)
		const likesCard = await this._useFetch(
			token,
			`${this.originURL}/cards/likes/${cardId}`,
			"PUT"
		);
		return likesCard;
	}

	async dislikeCard(token, cardId) {
		const dislikesCard = await this._useFetch(
			token,
			`${this.originURL}/cards/likes/${cardId}`,
			"DELETE"
		);
		return dislikesCard;
	}

	async changeLikeCardStatus(token, cardId, isLiked) {
		const changingLikeCardStatus = isLiked
			? await this.dislikeCard(token, cardId)
			: await this.likeCard(token, cardId);
		return changingLikeCardStatus;
	}

/* 	async registerUser(email, password) {
		const newUser = await this._useFetch(
			`${this.originURL}/signup`,
			"POST",
			{
				email,
				password,
			}
		);
		return newUser;
	}
 */


	async checkUserToken(token) {
		return fetch(`${this.originURL}/users/me`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${token}`,
			},
		});
	}
}

const api = new Api();

export default api;
